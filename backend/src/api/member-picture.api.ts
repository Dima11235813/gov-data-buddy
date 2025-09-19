import axios from 'axios';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { MemberPicture, PictureSource, PictureStatus } from '../entity/MemberPictureEntity';
import { Member } from '../entity/MemberEntity';
import * as dotenv from 'dotenv';

dotenv.config();

export const downloadAndStoreMemberPicture = async (
    bioguideId: string,
    imageUrl: string,
    attribution: string,
    memberRepository: Repository<Member>,
    pictureRepository: Repository<MemberPicture>
): Promise<MemberPicture | null> => {
    try {
        console.log(`Downloading picture for member ${bioguideId} from ${imageUrl}`);

        // Download the image
        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
            timeout: 10000,
            headers: {
                'User-Agent': 'GovDataBuddy/1.0'
            }
        });

        if (response.status !== 200) {
            console.warn(`Failed to download image for ${bioguideId}: HTTP ${response.status}`);
            return null;
        }

        const imageBuffer = Buffer.from(response.data);
        const contentType = response.headers['content-type'] || 'image/jpeg';

        // Generate checksum for versioning
        const checksum = crypto.createHash('sha256').update(imageBuffer).digest('hex');

        // Check if we already have this exact image
        const existingPicture = await pictureRepository.findOne({
            where: { bioguideId, checksum, status: PictureStatus.ACTIVE as any }
        });

        if (existingPicture) {
            console.log(`Image for ${bioguideId} already exists with same checksum`);
            return existingPicture;
        }

        // Deactivate previous versions
        await pictureRepository.update(
            { bioguideId, status: 'active' as any },
            { status: 'inactive' as any, isCurrentVersion: false }
        );

        // Get the next version number
        const lastVersion = await pictureRepository.findOne({
            where: { bioguideId },
            order: { version: 'DESC' }
        });

        const version = lastVersion ? lastVersion.version + 1 : 1;

        // Convert image to base64
        const base64Data = `data:${contentType};base64,${imageBuffer.toString('base64')}`;

        // Create database record
        const member = await memberRepository.findOneBy({ bioguideId });

        // Create picture with string values for SQLite compatibility
        const picture = pictureRepository.create({
            bioguideId,
            member: member || undefined,
            memberId: member?.id,
            originalUrl: imageUrl,
            base64Data,
            contentType,
            fileSize: imageBuffer.length,
            source: 'congress_gov',
            status: 'active',
            attribution,
            checksum,
            version,
            isCurrentVersion: true,
            sourceLastModified: new Date().toISOString(),
            metadata: {
                sourceUpdatedAt: new Date().toISOString(),
                width: 120, // Default dimensions for Congress.gov images
                height: 150
            }
        } as any);

        const savedPicture = await pictureRepository.save(picture as any);
        console.log(`Successfully stored picture for ${bioguideId} as base64 (version ${version})`);

        return savedPicture;

    } catch (error) {
        console.error(`Error downloading/storing picture for ${bioguideId}:`, error);
        return null;
    }
};

export const getCurrentMemberPicture = async (
    bioguideId: string,
    pictureRepository: Repository<MemberPicture>
): Promise<MemberPicture | null> => {
    // For now, find the most recent picture for this member
    // TODO: Fix enum handling for proper status and version filtering
    return await pictureRepository.findOne({
        where: { bioguideId },
        order: { createdAt: 'DESC' }
    });
};

export const getMemberPictureById = async (
    pictureId: number,
    pictureRepository: Repository<MemberPicture>
): Promise<MemberPicture | null> => {
    // For now, just find by ID without status filter
    // TODO: Fix enum handling for proper status filtering
    return await pictureRepository.findOne({
        where: { id: pictureId }
    });
};

export const getMemberPictureHistory = async (
    bioguideId: string,
    pictureRepository: Repository<MemberPicture>
): Promise<MemberPicture[]> => {
    return await pictureRepository.find({
        where: { bioguideId },
        order: { version: 'DESC', createdAt: 'DESC' }
    });
};

export const getMemberPictureData = (
    picture: MemberPicture
): { base64Data: string; contentType: string } | null => {
    try {
        if (!picture.base64Data) {
            console.warn(`No base64 data found for picture ${picture.id}`);
            return null;
        }

        return {
            base64Data: picture.base64Data,
            contentType: picture.contentType || 'image/jpeg'
        };
    } catch (error) {
        console.error(`Error getting picture data for ${picture.id}:`, error);
        return null;
    }
};

export const cleanupOldPictures = async (
    bioguideId: string,
    keepVersions: number = 3,
    pictureRepository: Repository<MemberPicture>
): Promise<number> => {
    try {
        // Get all pictures for this member
        const allPictures = await pictureRepository.find({
            where: { bioguideId },
            order: { version: 'DESC' }
        });

        if (allPictures.length <= keepVersions) {
            return 0; // Nothing to clean up
        }

        // Keep the most recent versions, mark older ones as deleted
        const picturesToDelete = allPictures.slice(keepVersions);
        let deletedCount = 0;

        for (const picture of picturesToDelete) {
            // Mark as deleted in database (base64 data remains for history)
            await pictureRepository.update(
                { id: picture.id },
                { status: 'deleted' as any }
            );

            deletedCount++;
        }

        console.log(`Cleaned up ${deletedCount} old pictures for ${bioguideId}`);
        return deletedCount;

    } catch (error) {
        console.error(`Error cleaning up pictures for ${bioguideId}:`, error);
        return 0;
    }
};

// Helper function to get data URL from base64
export const getPictureDataUrl = (picture: MemberPicture): string => {
    if (picture.base64Data) {
        return picture.base64Data;
    }
    return '';
};

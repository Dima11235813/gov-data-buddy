import * as moment from 'moment';

export namespace TimeUtils {
    export const friendlyTimeAgoString = (s: string): string => {

        const now = moment(); // Current time
        const diff = moment.duration(now.diff(s)); // The difference in time

        // Now we'll check from largest unit (years) to smallest (seconds)
        if (diff.years() > 0) {
            return diff.years() + (diff.years() === 1 ? ' year ago' : ' years ago');
        } else if (diff.months() > 0) {
            return diff.months() + (diff.months() === 1 ? ' month ago' : ' months ago');
        } else if (diff.days() > 0) {
            return diff.days() + (diff.days() === 1 ? ' day ago' : ' days ago');
        } else if (diff.hours() > 0) {
            return diff.hours() + (diff.hours() === 1 ? ' hour ago' : ' hours ago');
        } else if (diff.minutes() > 0) {
            return diff.minutes() + (diff.minutes() === 1 ? ' minute ago' : ' minutes ago');
        } else {
            return diff.seconds() + (diff.seconds() === 1 ? ' second ago' : ' seconds ago');
        }
    }
    /** Takes a query string */
    export const friendlyDateString = (s: string) => {
        const date = moment(decodeURIComponent(s));

        // Format the date in a friendly format
        return date.format("MMMM Do, YYYY");
    }
}
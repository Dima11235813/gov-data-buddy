export class StringHelper {
    static typeIsString = (value: unknown): value is String => {
        return typeof value === "string" && value !== ''
    }
}
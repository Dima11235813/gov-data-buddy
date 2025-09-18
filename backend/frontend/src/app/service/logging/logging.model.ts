export enum FailedLoginReason {
}

export enum LoggedEventType {
    //AUTH
}

export interface EventData {
    userId: string,
    email: string
}

//Verbose wraps console log by area 
//while minimal only leaves console logs used directly in js
export enum LogLevels {
    VERBOSE,
    MINIMAL
}
export enum LoggingArea {
    AUTH,
    ROUTING
}
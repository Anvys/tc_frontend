export type TResponseWithDetails = {
    detail: string
}
/**
 * API TYPES
 */
export type TWithSessionId = {
    session_id: string
}
export type TAuthRequest = {
    user: string
    password: string
}
export type TAuthResponse = TWithSessionId & TResponseWithDetails

export type TPingResponse = string

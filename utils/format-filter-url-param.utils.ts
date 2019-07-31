
export function formatFilterUrlParam(payload: IPayload) {

    return `filter=${payload.filters ? JSON.stringify(payload.filters) : ""}`
}

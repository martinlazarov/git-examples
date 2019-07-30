import { IPayload } from '../interfaces/benefit-class/filter';

export function formatFilterUrlParam(payload: IPayload) {

    return `filter=${payload.filters ? JSON.stringify(payload.filters) : ""}`
}

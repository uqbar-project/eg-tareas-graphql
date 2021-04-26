import { Response } from "supertest"

export function responseAsJSON(result: Response){
    return JSON.parse(result.text)
}

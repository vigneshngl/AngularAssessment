export class Course {
    id: number
    name: string
    description: string
    duration: number
    fees: number

    constructor(values : Object = {}) {
        Object.assign(this, values)
    }
}
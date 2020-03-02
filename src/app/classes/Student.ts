export class Student {
    id: number
    name: string
    education: string
    gender: string
    email: string
    password: string
    passyear: number
    experience: number
    course: string
    

    constructor(values : Object = {}) {
        Object.assign(this, values)
    }
}
import { User } from "@/@types/prisma/index.js"

type HTTPUser = {
    id: string
    name: string
    username: string
    email: string
    createdAt: Date
    updatedAt: Date
}

export class UserPresenter {
    static toHTTP(user: User): HTTPUser
    static toHTTP(users: User[]): HTTPUser[]
    static toHTTP(input: User | User[]): HTTPUser | HTTPUser[] {
        if(Array.isArray(input)) {
            return input.map((user) => this.toHTTP(user))
        }
        return {
            id: input.publicId,
            name: input.name,
            username: input.username,
            email: input.email,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt
        }
    }
}
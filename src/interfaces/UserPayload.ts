import { Role } from "@prisma/client";

export interface UserPayload {
    id: string | number;
    username: string;
    role: Role
}
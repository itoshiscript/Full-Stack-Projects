import {prisma} from "../lib/prisma";

interface CreateUser {
    email: string;
    password: string;
}

export const register = async (newUser: CreateUser) => {
    const user = await prisma.user.create({
        data: newUser,
    })

    return user;
}

export const findUserEmail = async (email: string) => {
    const userEmail = await prisma.user.findUnique({
        where: {
            email,
        }
    })

    return userEmail;
}


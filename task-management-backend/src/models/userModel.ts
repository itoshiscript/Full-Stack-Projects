import {prisma} from "../lib/prisma";

export const getAllUsers = async () => {
    return prisma.user.findMany();
}

export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    });

    return user;
}


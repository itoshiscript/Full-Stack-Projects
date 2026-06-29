import {prisma} from "../lib/prisma";

interface CreateTask {
    title: string;
    description?: string;
    categoryId?: number;
    userId: number;
}

export const createTask = async (newTask: CreateTask) => {
    return prisma.task.create({data: newTask})
}

export const getAllTasks = async (userId : number) => {
    return prisma.task.findMany({
        where: {
            userId
        }, include: {
            category: true
        }, orderBy: {
            createdAt: 'desc'
        }
    });
}

export const getTaskById = async (id: number, userId: number) => {
    return prisma.task.findFirst({
        where: {
            id,
            userId
        }
    })
}

export const updateTask = async (id: number, data: Partial<CreateTask>) => {
    return prisma.task.update({
        where: {
            id,
        },
        data,
    })
}

export const deleteTask = async (id: number) => {
    return prisma.task.delete({
        where: {
            id,
        }
    })
}
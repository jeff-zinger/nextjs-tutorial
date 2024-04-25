'use server'

import prisma from "@/utils/db";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {z} from 'zod'

export const createTask = async (prevState, formData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const content = formData.get('content')
    const Task = z.object({
        content: z.string().min(5)
    })
    
    try {
        Task.parse({content})
        await prisma.task.create({
            data: {
                content,
            }
        })
        revalidatePath('/tasks')
        return {message: "success!"}
    } catch (e) {
        return {message: "error..."}
    }
}

export const getAllTasks = async () => {
    return prisma.task.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
}

export const deleteTask = async (formData) => {
    const id = formData.get('id')
    await prisma.task.delete({
        where: {id}
    })
    revalidatePath('/tasks')
}

export const getTask = async (id)  => {
  return prisma.task.findUnique({
      where: {
          id
      }
  })
}

export const editTask = async (prevState, formData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const id = formData.get('id')
    const content = formData.get('content')
    const completed = formData.get('completed')

    const Task = z.object({
        content: z.string().min(5)
    })

    let success = false

    try {
        Task.parse({content})
        await prisma.task.update({
            where: {
                id
            },
            data: {
                content,
                completed: completed === "on"
            }
        })
        success = true
        return {message: "yas"}
    } catch (e) {
        return {message: "error..."}
    } finally {
        if (success) {
            redirect("/tasks")
        }
    }
}
'use client'

import { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'
import { getTasks } from '@/app/api/tasks.api'

export interface ITask {
	id: number
	title: string
	completed: boolean
	date: string
}

export interface ITasksContext {
	tasks: ITask[]
	setTasks: (tasks: ITask[]) => void
}

export const TasksContext = createContext<ITasksContext>({
	tasks: [],
	setTasks: () => {},
})

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
	const [tasks, setTasks] = useState<ITask[]>([])

	useEffect(() => {
		const fetchTasks = async () => {
			const data = await getTasks()
			setTasks(data)
		}
		fetchTasks()
	}, [])

	return <TasksContext value={{ tasks, setTasks }}>{children}</TasksContext>
}

export const useTasks = () => {
	const context = useContext(TasksContext)
	if (!context) {
		throw new Error('useTasks must be used within a TasksProvider')
	}
	return context
}

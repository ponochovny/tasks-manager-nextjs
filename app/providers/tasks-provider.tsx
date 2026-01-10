'use client'

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	useTransition,
} from 'react'
import { getTasks } from '@/app/api/tasks.api'
import { useSearchParams } from 'next/navigation'

export enum Priority {
	low = 'low',
	medium = 'medium',
	high = 'high',
}

export interface ITask {
	id: number
	title: string
	completed: boolean
	priority: Priority
	description: string
	date_created: string
	date_completed: string | null
}

export interface ITasksContext {
	tasks: ITask[] | null
	setTasks: (tasks: ITask[]) => void
	refetchTasks: () => void
	page?: number | null
	pagination: {
		total: number
		limit: number
		page: number
		pages: number
	}
	isPending: boolean
}

export const TasksContext = createContext<ITasksContext>({
	tasks: null,
	setTasks: () => {},
	refetchTasks: () => {},
	page: null,
	pagination: { total: 0, limit: 0, page: 0, pages: 0 },
	isPending: true,
})

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
	const params = useSearchParams()
	const currentPage = params.get('page') ? parseInt(params.get('page')!, 10) : 1

	const [tasks, setTasks] = useState<ITask[] | null>(null)
	const [page, setPage] = useState<number | null>(null)
	const [pagination, setPagination] = useState<{
		total: number
		limit: number
		page: number
		pages: number
	}>({ total: 0, limit: 0, page: 0, pages: 0 })
	const [isPending, startTransition] = useTransition()

	const fetchTasks = useCallback(async () => {
		const page = currentPage
		setPage(page)

		try {
			await getTasks(page)

			const res = await getTasks(page)
			setPagination(res.pagination)
			setTasks(res.data)
		} catch {}
	}, [setPage, setPagination, setTasks, currentPage])

	const refetchTasks = useCallback(() => {
		startTransition(async () => {
			await fetchTasks()
		})
	}, [fetchTasks])

	return (
		<TasksContext
			value={{ tasks, setTasks, page, pagination, isPending, refetchTasks }}
		>
			{children}
		</TasksContext>
	)
}

export const useTasks = () => {
	const context = useContext(TasksContext)
	if (!context) {
		throw new Error('useTasks must be used within a TasksProvider')
	}
	return context
}

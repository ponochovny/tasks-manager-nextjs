'use client'

import {
	createContext,
	Dispatch,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useState,
	useTransition,
} from 'react'
import { getTasks, TasksQuery } from '@/app/api/tasks.api'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export enum Priority {
	low = 1,
	medium = 2,
	high = 3,
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
	query: TasksQuery
	setQuery: Dispatch<SetStateAction<TasksQuery>>
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
	query: {},
	setQuery: () => {},
	page: null,
	pagination: { total: 0, limit: 0, page: 0, pages: 0 },
	isPending: true,
})

function buildSearchParams(query: TasksQuery) {
	const params = new URLSearchParams()

	if (query.completed !== undefined)
		params.set('completed', String(query.completed))

	if (query.page) params.set('page', String(query.page))

	if (query.sort) params.set('sort', query.sort)

	if (query.order) params.set('order', query.order)

	if (query.priority) params.set('priority', query.priority)

	// ⚠️ limit is NOT included

	return params
}

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
	const [tasks, setTasks] = useState<ITask[] | null>(null)
	const [isPending, startTransition] = useTransition()

	const [pagination, setPagination] = useState<{
		total: number
		limit: number
		page: number
		pages: number
	}>({ total: 0, limit: 5, page: 0, pages: 0 })

	const params = useSearchParams()
	const currentPage = params.get('page') ? parseInt(params.get('page')!, 10) : 1
	const completedFilter = params.get('completed')
	const priorityFilter = params.get('priority')
	const sortQuery = params.get('sort')
	const orderQuery = params.get('order')
	const [query, setQuery] = useState<TasksQuery>({
		page: currentPage,
		limit: pagination.limit,
		completed:
			completedFilter === 'true'
				? true
				: completedFilter === 'false'
				? false
				: undefined,
		priority:
			priorityFilter === 'low' ||
			priorityFilter === 'medium' ||
			priorityFilter === 'high'
				? priorityFilter
				: undefined,
		sort:
			sortQuery === 'priority' ||
			sortQuery === 'date_created' ||
			sortQuery === 'date_completed'
				? sortQuery
				: undefined,
		order:
			orderQuery === 'asc' || orderQuery === 'desc' ? orderQuery : undefined,
	})

	const fetchTasks = useCallback(async () => {
		try {
			const res = await getTasks({ ...query, page: currentPage })
			setPagination(res.pagination)
			setTasks(res.data)
		} catch {}
	}, [query, currentPage])

	const router = useRouter()
	const pathname = usePathname()

	const refetchTasks = useCallback(() => {
		startTransition(async () => {
			await fetchTasks()
		})
	}, [fetchTasks])

	useEffect(() => {
		const params = buildSearchParams({ ...query, page: currentPage })
		router.replace(`${pathname}?${params.toString()}`)

		refetchTasks()
	}, [query, router, pathname, refetchTasks, currentPage])

	return (
		<TasksContext
			value={{
				tasks,
				setTasks,
				page: query.page || null,
				pagination,
				isPending,
				refetchTasks,
				query,
				setQuery,
			}}
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

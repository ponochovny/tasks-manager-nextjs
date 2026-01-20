'use client'

import {
	createContext,
	Dispatch,
	SetStateAction,
	useCallback,
	useContext,
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
	order?: number
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

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
	// const router = useRouter()
	// const pathname = usePathname()

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
	const modeQuery = params.get('mode')
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
			sortQuery === 'date_completed' ||
			sortQuery === 'order'
				? sortQuery
				: undefined,
		order:
			orderQuery === 'asc' || orderQuery === 'desc' ? orderQuery : undefined,
		mode: modeQuery === 'manual' ? 'manual' : 'auto',
	})

	const fetchTasks = useCallback(async () => {
		try {
			const { pagination, data } = await getTasks({ ...query })

			/** Correct the page */
			// const maxPage = Math.ceil(Number(pagination.total) / pagination.limit)
			// const isMaxPageLessThanCurrentPage = maxPage < pagination.page
			// console.log('isMaxPageLessThanCurrentPage', isMaxPageLessThanCurrentPage)
			// console.log('maxPage', maxPage, 'currentPage', pagination.page)

			// if (isMaxPageLessThanCurrentPage) {
			// 	router.push(
			// 		`${pathname}${query.mode !== 'manual' ? `?page=${maxPage}` : ''}`,
			// 	)
			// 	return
			// }
			//** / Correct the page */

			setPagination(pagination)
			setTasks(data)
		} catch {}
	}, [
		query,
		// router,
		// pathname
	])

	const refetchTasks = useCallback(() => {
		startTransition(async () => {
			await fetchTasks()
		})
	}, [fetchTasks])

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

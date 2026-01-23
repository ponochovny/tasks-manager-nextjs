'use client'

import {
	createContext,
	Dispatch,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useMemo,
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

function getQueryFromParams(params: URLSearchParams): TasksQuery {
	const currentPage = params.get('page') ? parseInt(params.get('page')!, 10) : 1
	const completedFilter = params.get('completed')
	const priorityFilter = params.get('priority')
	const sortQuery = params.get('sort')
	const orderQuery = params.get('order')
	const modeQuery = params.get('mode')

	return {
		page: currentPage,
		limit: 5,
		completed:
			completedFilter === 'true'
				? true
				: completedFilter === 'false'
					? false
					: undefined,
		priority:
			priorityFilter === '1' || priorityFilter === '2' || priorityFilter === '3'
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
	}
}

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
	const params = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()
	const [tasks, setTasks] = useState<ITask[] | null>(null)
	const [isPending, startTransition] = useTransition()
	const [pagination, setPagination] = useState<{
		total: number
		limit: number
		page: number
		pages: number
	}>({ total: 0, limit: 5, page: 0, pages: 0 })

	const query = useMemo(() => getQueryFromParams(params), [params])

	const setQuery = useCallback(
		(newQueryOrFn: TasksQuery | ((prev: TasksQuery) => TasksQuery)) => {
			let newQuery: TasksQuery

			if (typeof newQueryOrFn === 'function') {
				newQuery = newQueryOrFn(query)
			} else {
				newQuery = newQueryOrFn
			}

			// Обновляем URL, что автоматически обновит query через params
			const searchParams = new URLSearchParams()

			if (newQuery.completed !== undefined)
				searchParams.set('completed', String(newQuery.completed))

			if (newQuery.page) searchParams.set('page', String(newQuery.page))

			if (newQuery.sort) searchParams.set('sort', newQuery.sort)

			if (newQuery.order) searchParams.set('order', newQuery.order)

			if (newQuery.priority) searchParams.set('priority', newQuery.priority)

			if (newQuery.mode && newQuery.mode !== 'auto') {
				searchParams.set('mode', newQuery.mode)
			}

			router.replace(`${pathname}?${searchParams.toString()}`, {
				scroll: false,
			})
		},
		[query, router, pathname],
	)

	useEffect(() => {
		startTransition(async () => {
			try {
				const { pagination, data } = await getTasks({ ...query })
				setPagination(pagination)
				setTasks(data)
			} catch {}
		})
	}, [query])

	const refetchTasks = useCallback(() => {
		startTransition(async () => {
			try {
				const { pagination, data } = await getTasks({ ...query })
				setPagination(pagination)
				setTasks(data)
			} catch {}
		})
	}, [query])

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

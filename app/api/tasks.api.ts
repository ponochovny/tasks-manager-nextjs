import { ITask } from '../providers/tasks-provider'

const BASE_URL = 'http://localhost:3001'

export type TasksQuery = {
	completed?: boolean
	priority?: string
	page?: number
	limit?: number
	sort?: 'priority' | 'date_created' | 'date_completed' | 'order'
	order?: 'asc' | 'desc'
	mode?: 'manual' | 'auto'
}

function buildTasksAPIUrl(query: TasksQuery) {
	const params = new URLSearchParams()

	// FILTERS
	if (query.completed !== undefined)
		params.set('completed', String(query.completed))
	if (query.priority) params.set('priority', query.priority)

	// PAGINATION
	if (query.page && query.mode !== 'manual')
		params.set('_page', String(query.page))
	if (query.limit && query.mode !== 'manual')
		params.set('_limit', String(query.limit))

	// SORTING
	if (query.sort) params.set('_sort', query.sort)
	if (query.order) params.set('_order', query.order)

	return `${BASE_URL}/tasks?${params.toString()}`
}

export const getTasks = async (query: TasksQuery) => {
	const url = buildTasksAPIUrl(query)

	try {
		const res = await fetch(url)
		const data = await res.json()
		const totalItems = res.headers.get('x-total-count')
		const pages = Math.ceil(Number(totalItems) / 5)

		return {
			data,
			pagination: {
				total: totalItems ? Number(totalItems) : 0,
				limit: 5,
				page: query.page || 1,
				pages: pages || 1,
			},
		}
	} catch {
		throw new Error('Failed to fetch tasks')
	}
}

export const getTaskById = async (taskId: number) => {
	try {
		const res = await fetch(`${BASE_URL}/tasks/${taskId}`)
		if (!res.ok) {
			throw new Error('Task not found')
		}
		const data = await res.json()
		return {
			data,
		}
	} catch {
		throw new Error('Failed to fetch task ' + taskId)
	}
}

export const deleteTaskById = async (taskId: number) => {
	const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
		method: 'DELETE',
	})
	return res.json()
}

export const taskCompletedToggle = async (id: number, completed: boolean) => {
	const res = await fetch(`${BASE_URL}/tasks/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			completed: !completed,
			date_completed: !completed ? new Date().toISOString() : null,
		}),
	})
	return res.json()
}

export const taskPriorityChange = async (id: number, priority: number) => {
	const res = await fetch(`${BASE_URL}/tasks/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			priority,
		}),
	})
	return res.json()
}

export const updateTaskOrder = async (id: number, order: number) => {
	const res = await fetch(`${BASE_URL}/tasks/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			order,
		}),
	})
	return res.json()
}

export const editTask = async (id: number, updatedData: Omit<ITask, 'id'>) => {
	const res = await fetch(`${BASE_URL}/tasks/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...updatedData,
		}),
	})
	return res.json()
}

export const createTask = async (data: Omit<ITask, 'id'>) => {
	const res = await fetch(`${BASE_URL}/tasks`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...data,
		}),
	})
	return res.json()
}

import { ITask } from '../providers/tasks-provider'

const BASE_URL = 'http://localhost:3001'

export const getTasks = async (page = 1) => {
	try {
		const res = await fetch(`${BASE_URL}/tasks?_page=${page}&_limit=5`)
		const data = await res.json()
		return {
			data,
			pagination: {
				total: 12,
				limit: 5,
				page,
				pages: 3,
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

export const taskPriorityChange = async (id: number, priority: string) => {
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

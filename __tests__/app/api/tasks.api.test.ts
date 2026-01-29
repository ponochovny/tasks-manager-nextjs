import {
	getTasks,
	getTaskById,
	deleteTaskById,
	taskCompletedToggle,
	taskPriorityChange,
	updateTaskOrder,
	editTask,
	createTask,
} from '@/app/api/tasks.api'

// Mock fetch
global.fetch = jest.fn()

const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>

describe('Tasks API', () => {
	beforeEach(() => {
		mockFetch.mockClear()
	})

	describe('getTasks', () => {
		it('should fetch tasks with default query', async () => {
			const mockData = [
				{
					id: 1,
					title: 'Test Task',
					completed: false,
					priority: 1,
					date_created: '2024-01-15T10:00:00Z',
					date_completed: null,
					order: 1,
				},
			]

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockData,
				headers: new Headers({ 'x-total-count': '1' }),
			} as Response)

			const result = await getTasks({ page: 1 })

			expect(result.data).toEqual(mockData)
			expect(result.pagination.total).toBe(1)
			expect(result.pagination.pages).toBe(1)
			expect(result.pagination.page).toBe(1)
		})

		it('should include pagination params when not in manual mode', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => [],
				headers: new Headers({ 'x-total-count': '0' }),
			} as Response)

			await getTasks({ page: 2, limit: 5, mode: 'auto' })

			const url = mockFetch.mock.calls[0][0] as string
			expect(url).toContain('_page=2')
			expect(url).toContain('_limit=5')
		})

		it('should exclude pagination params in manual mode', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => [],
				headers: new Headers({ 'x-total-count': '0' }),
			} as Response)

			await getTasks({ page: 2, limit: 5, mode: 'manual' })

			const url = mockFetch.mock.calls[0][0] as string
			expect(url).not.toContain('_page')
			expect(url).not.toContain('_limit')
		})

		it('should include filter params', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => [],
				headers: new Headers({ 'x-total-count': '0' }),
			} as Response)

			await getTasks({ completed: true, priority: '3' })

			const url = mockFetch.mock.calls[0][0] as string
			expect(url).toContain('completed=true')
			expect(url).toContain('priority=3')
		})

		it('should include sorting params', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => [],
				headers: new Headers({ 'x-total-count': '0' }),
			} as Response)

			await getTasks({ sort: 'priority', order: 'desc' })

			const url = mockFetch.mock.calls[0][0] as string
			expect(url).toContain('_sort=priority')
			expect(url).toContain('_order=desc')
		})

		it('should throw error on fetch failure', async () => {
			mockFetch.mockRejectedValueOnce(new Error('Network error'))

			await expect(getTasks({})).rejects.toThrow('Failed to fetch tasks')
		})

		it('should calculate pages correctly', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => [],
				headers: new Headers({ 'x-total-count': '27' }),
			} as Response)

			const result = await getTasks({})

			expect(result.pagination.pages).toBe(6) // 27 / 5 = 5.4 -> ceil = 6
		})
	})

	describe('getTaskById', () => {
		it('should fetch task by id', async () => {
			const mockTask = {
				id: 1,
				title: 'Test Task',
				completed: false,
				priority: 1,
				date_created: '2024-01-15T10:00:00Z',
				date_completed: null,
				order: 1,
			}

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockTask,
			} as Response)

			const result = await getTaskById(1)

			expect(result.data).toEqual(mockTask)
			expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/tasks/1')
		})

		it('should throw error when task not found', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				json: async () => ({}),
			} as Response)

			await expect(getTaskById(999)).rejects.toThrow('Failed to fetch task 999')
		})

		it('should throw error on fetch failure', async () => {
			mockFetch.mockRejectedValueOnce(new Error('Network error'))

			await expect(getTaskById(1)).rejects.toThrow('Failed to fetch task 1')
		})
	})

	describe('deleteTaskById', () => {
		it('should delete task by id', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({}),
			} as Response)

			await deleteTaskById(1)

			expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/tasks/1', {
				method: 'DELETE',
			})
		})
	})

	describe('taskCompletedToggle', () => {
		it('should toggle completed to true and set date_completed', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ completed: true }),
			} as Response)

			await taskCompletedToggle(1, false)

			const calls = mockFetch.mock.calls[0]
			expect(calls[0]).toBe('http://localhost:3001/tasks/1')
			expect(calls[1]?.method).toBe('PATCH')

			const body = JSON.parse(calls[1]?.body as string)
			expect(body.completed).toBe(true)
			expect(body.date_completed).toBeTruthy()
		})

		it('should toggle completed to false and clear date_completed', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ completed: false }),
			} as Response)

			await taskCompletedToggle(1, true)

			const calls = mockFetch.mock.calls[0]
			const body = JSON.parse(calls[1]?.body as string)
			expect(body.completed).toBe(false)
			expect(body.date_completed).toBeNull()
		})
	})

	describe('taskPriorityChange', () => {
		it('should update task priority', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ priority: 3 }),
			} as Response)

			await taskPriorityChange(1, 3)

			const calls = mockFetch.mock.calls[0]
			expect(calls[0]).toBe('http://localhost:3001/tasks/1')
			expect(calls[1]?.method).toBe('PATCH')

			const body = JSON.parse(calls[1]?.body as string)
			expect(body.priority).toBe(3)
		})
	})

	describe('updateTaskOrder', () => {
		it('should update task order', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ order: 5 }),
			} as Response)

			await updateTaskOrder(1, 5)

			const calls = mockFetch.mock.calls[0]
			const body = JSON.parse(calls[1]?.body as string)
			expect(body.order).toBe(5)
		})
	})

	describe('editTask', () => {
		it('should update task with provided data', async () => {
			const updateData = {
				title: 'Updated Title',
				description: 'New description',
				completed: true,
				priority: 2,
				date_created: '2024-01-15T10:00:00Z',
				date_completed: '2024-01-15T15:00:00Z',
				order: 1,
			}

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ id: 1, ...updateData }),
			} as Response)

			await editTask(1, updateData)

			const calls = mockFetch.mock.calls[0]
			expect(calls[0]).toBe('http://localhost:3001/tasks/1')
			expect(calls[1]?.method).toBe('PATCH')

			const body = JSON.parse(calls[1]?.body as string)
			expect(body.title).toBe('Updated Title')
			expect(body.description).toBe('New description')
		})
	})

	describe('createTask', () => {
		it('should create new task', async () => {
			const newTaskData = {
				title: 'New Task',
				description: 'Task description',
				completed: false,
				priority: 1,
				date_created: '2024-01-15T10:00:00Z',
				date_completed: null,
				order: 1,
			}

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ id: 1, ...newTaskData }),
			} as Response)

			await createTask(newTaskData)

			const calls = mockFetch.mock.calls[0]
			expect(calls[0]).toBe('http://localhost:3001/tasks')
			expect(calls[1]?.method).toBe('POST')

			const body = JSON.parse(calls[1]?.body as string)
			expect(body.title).toBe('New Task')
		})
	})
})

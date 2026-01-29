import { renderHook } from '@testing-library/react'
import { useRouter, usePathname } from 'next/navigation'
import { useUrlSync } from '@/shared/hooks/use-url-sync'
import type { TasksQuery } from '@/app/api/tasks.api'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
	usePathname: jest.fn(),
}))

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

describe('useUrlSync Hook', () => {
	let mockReplace: jest.Mock

	beforeEach(() => {
		jest.clearAllMocks()
		mockReplace = jest.fn()
		mockUseRouter.mockReturnValue({
			replace: mockReplace,
		} as any)
		mockUsePathname.mockReturnValue('/tasks')
	})

	it('should sync URL when query changes', () => {
		const { rerender } = renderHook(
			({ query }: { query: TasksQuery }) => useUrlSync(query),
			{
				initialProps: { query: {} },
			},
		)

		rerender({ query: { page: 1 } })

		expect(mockReplace).toHaveBeenCalledWith('/tasks?page=1', { scroll: false })
	})

	it('should include multiple query params', () => {
		const { rerender } = renderHook(
			({ query }: { query: TasksQuery }) => useUrlSync(query),
			{
				initialProps: { query: {} },
			},
		)

		const newQuery: TasksQuery = {
			page: 2,
			sort: 'priority',
			order: 'desc',
			completed: true,
		}

		rerender({ query: newQuery })

		const callArgs = mockReplace.mock.calls[0][0] as string
		expect(callArgs).toContain('page=2')
		expect(callArgs).toContain('sort=priority')
		expect(callArgs).toContain('order=desc')
		expect(callArgs).toContain('completed=true')
	})

	it('should not include limit in URL params', () => {
		const { rerender } = renderHook(
			({ query }: { query: TasksQuery }) => useUrlSync(query),
			{
				initialProps: { query: {} },
			},
		)

		const newQuery: TasksQuery = {
			page: 1,
			limit: 5,
		}

		rerender({ query: newQuery })

		const callArgs = mockReplace.mock.calls[0][0] as string
		expect(callArgs).not.toContain('limit')
	})

	it('should not call replace when query is same', () => {
		const query = { page: 1 }

		const { rerender } = renderHook(
			({ query }: { query: TasksQuery }) => useUrlSync(query),
			{
				initialProps: { query },
			},
		)

		// Reset after initial render
		mockReplace.mockClear()

		// Rerender with same query
		rerender({ query })

		expect(mockReplace).not.toHaveBeenCalled()
	})

	it('should handle mode param correctly', () => {
		const { rerender } = renderHook(
			({ query }: { query: TasksQuery }) => useUrlSync(query),
			{
				initialProps: { query: {} },
			},
		)

		const newQuery: TasksQuery = {
			page: 1,
			mode: 'manual',
		}

		rerender({ query: newQuery })

		const callArgs = mockReplace.mock.calls[0][0] as string
		expect(callArgs).toContain('mode=manual')
	})

	it('should include priority filter', () => {
		const { rerender } = renderHook(
			({ query }: { query: TasksQuery }) => useUrlSync(query),
			{
				initialProps: { query: {} },
			},
		)

		const newQuery: TasksQuery = {
			priority: '3',
		}

		rerender({ query: newQuery })

		const callArgs = mockReplace.mock.calls[0][0] as string
		expect(callArgs).toContain('priority=3')
	})

	it('should preserve pathname when syncing URL', () => {
		mockUsePathname.mockReturnValue('/tasks/edit/1')

		const { rerender } = renderHook(
			({ query }: { query: TasksQuery }) => useUrlSync(query),
			{
				initialProps: { query: {} },
			},
		)

		rerender({ query: { page: 2 } })

		const callArgs = mockReplace.mock.calls[0][0] as string
		expect(callArgs).toMatch(/^\/tasks\/edit\/1\?/)
	})
})

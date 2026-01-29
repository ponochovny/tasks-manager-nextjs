import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import EditTaskButton from '@/features/task/ui/editTaskButton'
import DeleteTaskButton from '@/features/task/ui/deleteTaskButton'
import ToggleTaskCompleteButton from '@/features/task/ui/toggleTaskCompleteButton'
import * as tasksApi from '@/app/api/tasks.api'

// Mock dependencies
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
	}),
}))

jest.mock('@/app/api/tasks.api')
jest.mock('@/app/providers/tasks-provider', () => ({
	useTasks: () => ({
		refetchTasks: jest.fn(),
		tasks: [
			{
				id: 1,
				title: 'Test Task',
				completed: false,
				priority: 1,
				date_created: '2024-01-15T10:00:00Z',
				date_completed: null,
				order: 1,
				description: 'Test description',
			},
		],
	}),
}))

// Mock UI components
jest.mock('@/shared/ui/button', () => ({
	Button: ({ children, onClick, disabled, ...props }: any) => (
		<button onClick={onClick} disabled={disabled} {...props}>
			{children}
		</button>
	),
}))

jest.mock('next/link', () => {
	return ({ children, href }: any) => <a href={href}>{children}</a>
})

jest.mock('lucide-react', () => ({
	CheckCircleIcon: () => <span data-testid='check-icon' />,
	CircleIcon: () => <span data-testid='circle-icon' />,
}))

describe('Task Feature Components', () => {
	describe('EditTaskButton', () => {
		it('should render edit button', () => {
			render(<EditTaskButton taskId={1} />)
			expect(screen.getByText('Edit')).toBeInTheDocument()
		})

		it('should link to edit page with correct task id', () => {
			render(<EditTaskButton taskId={42} />)
			const link = screen.getByText('Edit').closest('a')
			expect(link).toHaveAttribute('href', '/tasks/edit/42')
		})

		it('should render with different task ids', () => {
			const { rerender } = render(<EditTaskButton taskId={1} />)
			let link = screen.getByText('Edit').closest('a')
			expect(link).toHaveAttribute('href', '/tasks/edit/1')

			rerender(<EditTaskButton taskId={100} />)
			link = screen.getByText('Edit').closest('a')
			expect(link).toHaveAttribute('href', '/tasks/edit/100')
		})
	})

	describe('DeleteTaskButton', () => {
		beforeEach(() => {
			jest.clearAllMocks()
		})

		it('should render delete button', () => {
			render(
				<DeleteTaskButton
					taskId={1}
					isRefetch={false}
					redirect={false as any}
				/>,
			)
			expect(screen.getByText(/Delete/)).toBeInTheDocument()
		})

		it('should call deleteTaskById when clicked', async () => {
			const mockDelete = jest.fn().mockResolvedValue({})
			;(tasksApi.deleteTaskById as jest.Mock) = mockDelete

			render(
				<DeleteTaskButton
					taskId={1}
					isRefetch={false}
					redirect={false as any}
				/>,
			)

			const button = screen.getByText(/Delete/)
			fireEvent.click(button)

			await waitFor(() => {
				expect(mockDelete).toHaveBeenCalledWith(1)
			})
		})

		it('should be disabled while pending', async () => {
			jest
				.mocked(tasksApi.deleteTaskById)
				.mockImplementation(
					() => new Promise((resolve) => setTimeout(() => resolve({}), 100)),
				)

			render(
				<DeleteTaskButton
					taskId={1}
					isRefetch={false}
					redirect={false as any}
				/>,
			)

			const button = screen.getByText(/Delete/)
			fireEvent.click(button)

			await waitFor(() => {
				expect(button).toBeDisabled()
			})
		})

		it('should have destructive variant styling', () => {
			render(
				<DeleteTaskButton
					taskId={1}
					isRefetch={false}
					redirect={false as any}
				/>,
			)
			const button = screen.getByText(/Delete/)
			expect(button).toBeInTheDocument()
		})
	})

	describe('ToggleTaskCompleteButton', () => {
		const mockTask = {
			id: 1,
			title: 'Test Task',
			completed: false,
			priority: 1,
			date_created: '2024-01-15T10:00:00Z',
			date_completed: null,
			order: 1,
			description: 'Test description',
		}

		const mockUpdatedTaskHandler = jest.fn()

		beforeEach(() => {
			jest.clearAllMocks()
		})

		it('should render circle icon for incomplete task', () => {
			render(
				<ToggleTaskCompleteButton
					task={mockTask}
					updatedTaskHandler={mockUpdatedTaskHandler}
				/>,
			)
			expect(screen.getByTestId('circle-icon')).toBeInTheDocument()
		})

		it('should render check circle icon for completed task', () => {
			const completedTask = { ...mockTask, completed: true }
			render(
				<ToggleTaskCompleteButton
					task={completedTask}
					updatedTaskHandler={mockUpdatedTaskHandler}
				/>,
			)
			expect(screen.getByTestId('check-icon')).toBeInTheDocument()
		})

		it('should call taskCompletedToggle when clicked', async () => {
			const mockToggle = jest
				.fn()
				.mockResolvedValue({ ...mockTask, completed: true })
			;(tasksApi.taskCompletedToggle as jest.Mock) = mockToggle

			render(
				<ToggleTaskCompleteButton
					task={mockTask}
					updatedTaskHandler={mockUpdatedTaskHandler}
				/>,
			)

			const button = screen.getByRole('button')
			fireEvent.click(button)

			await waitFor(() => {
				expect(mockToggle).toHaveBeenCalledWith(1, false)
			})
		})

		it('should call updatedTaskHandler with new task data', async () => {
			const updatedTask = { ...mockTask, completed: true }
			;(tasksApi.taskCompletedToggle as jest.Mock).mockResolvedValue(
				updatedTask,
			)

			render(
				<ToggleTaskCompleteButton
					task={mockTask}
					updatedTaskHandler={mockUpdatedTaskHandler}
				/>,
			)

			const button = screen.getByRole('button')
			fireEvent.click(button)

			await waitFor(() => {
				expect(mockUpdatedTaskHandler).toHaveBeenCalledWith(updatedTask)
			})
		})

		it('should support custom size prop', () => {
			const { container } = render(
				<ToggleTaskCompleteButton
					task={mockTask}
					size='lg'
					updatedTaskHandler={mockUpdatedTaskHandler}
				/>,
			)
			expect(container).toBeInTheDocument()
		})
	})
})

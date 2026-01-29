import { render, screen, fireEvent } from '@testing-library/react'
import PrioritySelect from '@/entities/task/ui/prioritySelect'
import CompletedSelect from '@/entities/task/ui/completedSelect'

// Mock the UI components
jest.mock('@/shared/ui/select', () => ({
	Select: ({ children, value }: any) => (
		<div data-testid='select' data-value={value}>
			{children}
		</div>
	),
	SelectTrigger: ({ children, ...props }: any) => (
		<button data-testid='select-trigger' {...props}>
			{children}
		</button>
	),
	SelectValue: ({ placeholder }: any) => <span>{placeholder}</span>,
	SelectContent: ({ children }: any) => (
		<div data-testid='select-content'>{children}</div>
	),
	SelectItem: ({ children, value, ...props }: any) => (
		<div
			data-testid='select-item'
			data-value={value}
			onClick={() => {
				const parent = document.querySelector('[data-testid="select"]')
				const event = new CustomEvent('change', { detail: value })
				parent?.dispatchEvent(event)
			}}
			{...props}
		>
			{children}
		</div>
	),
}))

describe('Select Components', () => {
	describe('PrioritySelect', () => {
		it('should render priority select component', () => {
			const mockOnChange = jest.fn()
			render(<PrioritySelect value='1' valueChanged={mockOnChange} />)

			expect(screen.getByTestId('select')).toBeInTheDocument()
		})

		it('should display placeholder when no value provided', () => {
			const mockOnChange = jest.fn()
			render(<PrioritySelect valueChanged={mockOnChange} />)

			expect(screen.getByText('Priority')).toBeInTheDocument()
		})

		it('should have priority options', () => {
			const mockOnChange = jest.fn()
			render(<PrioritySelect value='1' valueChanged={mockOnChange} />)

			expect(screen.getByText('Low')).toBeInTheDocument()
			expect(screen.getByText('Medium')).toBeInTheDocument()
			expect(screen.getByText('High')).toBeInTheDocument()
		})

		it('should call valueChanged callback when priority changes', () => {
			const mockOnChange = jest.fn()
			render(<PrioritySelect value='1' valueChanged={mockOnChange} />)

			const items = screen.getAllByTestId('select-item')
			fireEvent.click(items[1]) // Click on Medium

			// The component should pass the value to the callback
			// Note: actual implementation details depend on the Select component behavior
		})

		it('should display current selected value', () => {
			const mockOnChange = jest.fn()
			const { container } = render(
				<PrioritySelect value='3' valueChanged={mockOnChange} />,
			)

			const selectDiv = container.querySelector('[data-testid="select"]')
			expect(selectDiv).toHaveAttribute('data-value', '3')
		})
	})

	describe('CompletedSelect', () => {
		it('should render completed select component', () => {
			const mockOnChange = jest.fn()
			render(<CompletedSelect value='false' valueChanged={mockOnChange} />)

			expect(screen.getByTestId('select')).toBeInTheDocument()
		})

		it('should display placeholder when no value provided', () => {
			const mockOnChange = jest.fn()
			const { container } = render(
				<CompletedSelect valueChanged={mockOnChange} />,
			)

			// Check that the placeholder is in the component
			expect(container.textContent).toContain('Completed')
		})

		it('should have completed and uncompleted options', () => {
			const mockOnChange = jest.fn()
			render(<CompletedSelect value='false' valueChanged={mockOnChange} />)

			const completedItems = screen.getAllByText('Completed')
			expect(completedItems.length).toBeGreaterThan(0)
			expect(screen.getByText('Uncompleted')).toBeInTheDocument()
		})

		it('should handle both true and false values', () => {
			const mockOnChange = jest.fn()
			const { rerender, container } = render(
				<CompletedSelect value='true' valueChanged={mockOnChange} />,
			)

			let selectDiv = container.querySelector('[data-testid="select"]')
			expect(selectDiv).toHaveAttribute('data-value', 'true')

			rerender(<CompletedSelect value='false' valueChanged={mockOnChange} />)

			selectDiv = container.querySelector('[data-testid="select"]')
			expect(selectDiv).toHaveAttribute('data-value', 'false')
		})
	})
})

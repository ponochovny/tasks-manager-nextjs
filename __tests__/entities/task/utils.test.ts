import { priorityFormat } from '@/entities/task/utils'

describe('Task Utils', () => {
	describe('priorityFormat', () => {
		it('should return "Low" for priority 1', () => {
			expect(priorityFormat(1)).toBe('Low')
		})

		it('should return "Medium" for priority 2', () => {
			expect(priorityFormat(2)).toBe('Medium')
		})

		it('should return "High" for priority 3', () => {
			expect(priorityFormat(3)).toBe('High')
		})

		it('should return "Low" for unknown priority', () => {
			expect(priorityFormat(0)).toBe('Low')
			expect(priorityFormat(99)).toBe('Low')
			expect(priorityFormat(-1)).toBe('Low')
		})
	})
})

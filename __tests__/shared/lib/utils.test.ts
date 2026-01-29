import { cn, mergeDateAndTime, getLocalOffsetString } from '@/shared/lib/utils'

describe('Utils', () => {
	describe('cn', () => {
		it('should merge class names correctly', () => {
			const result = cn('px-2', 'py-1')
			expect(result).toBe('px-2 py-1')
		})

		it('should handle conditional classes', () => {
			const result = cn('px-2', false && 'py-1', 'text-sm')
			expect(result).toBe('px-2 text-sm')
		})

		it('should handle array of classes', () => {
			const result = cn(['px-2', 'py-1'], 'text-sm')
			expect(result).toBe('px-2 py-1 text-sm')
		})

		it('should merge tailwind conflicts correctly', () => {
			const result = cn('px-2', 'px-4')
			expect(result).toBe('px-4')
		})
	})

	describe('mergeDateAndTime', () => {
		it('should merge date and time correctly', () => {
			const date = new Date('2024-01-15')
			const time = '14:30:45'

			const result = mergeDateAndTime(date, time)

			expect(result.getHours()).toBe(14)
			expect(result.getMinutes()).toBe(30)
			expect(result.getSeconds()).toBe(45)
			expect(result.getDate()).toBe(15)
		})

		it('should handle time without seconds', () => {
			const date = new Date('2024-01-15')
			const time = '14:30'

			const result = mergeDateAndTime(date, time)

			expect(result.getHours()).toBe(14)
			expect(result.getMinutes()).toBe(30)
			expect(result.getSeconds()).toBe(0)
		})

		it('should create a new date instance', () => {
			const date = new Date('2024-01-15')
			const result = mergeDateAndTime(date, '10:00:00')

			expect(result).not.toBe(date)
			expect(result.getTime()).not.toBe(date.getTime())
		})
	})

	describe('getLocalOffsetString', () => {
		it('should return offset string with sign', () => {
			const result = getLocalOffsetString()
			expect(result).toMatch(/^[+-]\d+$/)
		})

		it('should handle custom date', () => {
			const date = new Date('2024-01-15T00:00:00Z')
			const result = getLocalOffsetString(date)
			expect(result).toMatch(/^[+-]\d+$/)
		})

		it('should return string type', () => {
			const result = getLocalOffsetString()
			expect(typeof result).toBe('string')
		})
	})
})

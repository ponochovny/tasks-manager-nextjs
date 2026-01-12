import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function mergeDateAndTime(date: Date, time: string): Date {
	const [hours, minutes, seconds] = time.split(':').map(Number)

	const result = new Date(date)
	result.setHours(hours, minutes || 0, seconds || 0, 0)

	return result
}

export function getLocalOffsetString(date: Date = new Date()): string {
	const offset = -date.getTimezoneOffset()
	const sign = offset >= 0 ? '+' : '-'
	const hours = Math.floor(Math.abs(offset) / 60)
	// const minutes = Math.abs(offset) % 60
	// return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(
	// 	2,
	// 	'0'
	// )}`
	return `${sign}${String(hours).padStart(2, '')}`
}

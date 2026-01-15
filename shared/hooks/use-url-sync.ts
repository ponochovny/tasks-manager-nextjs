import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { TasksQuery } from '@/app/api/tasks.api'

function buildSearchParams(query: TasksQuery) {
	const params = new URLSearchParams()

	if (query.completed !== undefined)
		params.set('completed', String(query.completed))

	if (query.page) params.set('page', String(query.page))

	if (query.sort) params.set('sort', query.sort)

	if (query.order) params.set('order', query.order)

	if (query.priority) params.set('priority', query.priority)

	// ⚠️ "limit" is NOT included

	return params
}

export const useUrlSync = (query: TasksQuery) => {
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		const params = buildSearchParams(query)
		router.replace(`${pathname}?${params.toString()}`, { scroll: false })
	}, [query, router, pathname])
}

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { TasksQuery } from '@/app/api/tasks.api'

function buildSearchParams(query: TasksQuery) {
	const params = new URLSearchParams()

	if (query.completed !== undefined)
		params.set('completed', String(query.completed))

	if (query.page) params.set('page', String(query.page))

	if (query.sort) params.set('sort', query.sort)

	if (query.order) params.set('order', query.order)

	if (query.priority) params.set('priority', query.priority)

	if (query.mode) params.set('mode', query.mode)

	// ⚠️ "limit" is NOT included

	return params
}

export const useUrlSync = (query: TasksQuery) => {
	const router = useRouter()
	const pathname = usePathname()
	const prevQueryRef = useRef<TasksQuery>(query)

	useEffect(() => {
		if (JSON.stringify(prevQueryRef.current) !== JSON.stringify(query)) {
			prevQueryRef.current = query
			const params = buildSearchParams(query)
			router.replace(`${pathname}?${params.toString()}`, { scroll: false })
		}
	}, [query, router, pathname])
}

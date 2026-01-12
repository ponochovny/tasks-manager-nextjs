'use client'

import { useEffect } from 'react'
import H1 from '@/shared/ui/h1'
import { useTasks } from './providers/tasks-provider'
import UiPagination from '@/shared/ui/ui-pagination'
import TasksList from '@/widgets/tasks-list'
import { Button } from '@/shared/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
	const { pagination, isPending, refetchTasks } = useTasks()

	useEffect(() => {
		refetchTasks()
	}, [refetchTasks])

	return (
		<>
			<H1>
				Tasks
				<Button variant='ghost' asChild>
					<Link href={`/tasks/create`}>
						<PlusIcon className='size-8' />
					</Link>
				</Button>
			</H1>
			<div className='mt-10 w-full space-y-6'>
				{isPending ? (
					<p className='text-gray-500'>Loading...</p>
				) : (
					<>
						<TasksList />
						<UiPagination pagination={pagination} />
					</>
				)}
			</div>
		</>
	)
}

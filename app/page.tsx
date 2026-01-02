'use client'

import H1 from '@/shared/ui/h1'
import { useTasks } from './providers/tasks-provider'
import UiPagination from '@/shared/ui/ui-pagination'
import TasksList from '@/widgets/tasks-list'

export default function Home() {
	const { pagination, isPending } = useTasks()

	return (
		<>
			<H1>Tasks {isPending ? '(Loading...)' : ''}</H1>
			<div className='mt-10 w-full space-y-6'>
				<TasksList />
				<UiPagination pagination={pagination} />
			</div>
		</>
	)
}

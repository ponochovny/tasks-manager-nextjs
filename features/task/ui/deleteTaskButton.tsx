'use client'

import { deleteTaskById } from '@/app/api/tasks.api'
import { useTasks } from '@/app/providers/tasks-provider'
import { Button } from '@/shared/ui/button'
import { useTransition } from 'react'

const DeleteTaskButton = ({ taskId }: { taskId: number }) => {
	const [isPending, startTransition] = useTransition()
	const { fetchTasks } = useTasks()

	const handleDelete = () => {
		startTransition(async () => {
			await deleteTaskById(taskId).then(() => {
				fetchTasks()
			})
		})
	}

	return (
		<Button
			size='sm'
			variant='destructive'
			onClick={handleDelete}
			disabled={isPending}
		>
			Delete {isPending ? '...' : ''}
		</Button>
	)
}

export default DeleteTaskButton

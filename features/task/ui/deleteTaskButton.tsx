'use client'

import { deleteTaskById } from '@/app/api/tasks.api'
import { useTasks } from '@/app/providers/tasks-provider'
import { Button } from '@/shared/ui/button'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

const DeleteTaskButton = ({
	taskId,
	isRefetch = true,
	redirect = '/',
}: {
	taskId: number
	isRefetch?: boolean
	redirect?: string
}) => {
	const [isPending, startTransition] = useTransition()
	const { fetchTasks } = useTasks()
	const router = useRouter()

	const handleDelete = () => {
		startTransition(async () => {
			await deleteTaskById(taskId)
			if (isRefetch) await fetchTasks()
			if (redirect) router.push(redirect)
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

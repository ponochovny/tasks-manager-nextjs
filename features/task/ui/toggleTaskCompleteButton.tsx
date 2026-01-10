'use client'

import { taskCompletedToggle } from '@/app/api/tasks.api'
import { ITask, useTasks } from '@/app/providers/tasks-provider'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { CheckCircleIcon, CircleIcon } from 'lucide-react'

const ToggleTaskCompleteButton = ({
	task,
	size = 'sm',
	updatedTaskHandler,
}: {
	task: ITask
	size?: string
	updatedTaskHandler: (updatedTask: ITask) => void
}) => {
	const { tasks } = useTasks()

	const handleToggleTaskCompleted = async (id: number, completed: boolean) => {
		if (!tasks) return

		try {
			const updatedTask = await taskCompletedToggle(id, completed)

			updatedTaskHandler(updatedTask)
		} catch {}
	}

	return (
		<Button
			variant='ghost'
			size='icon'
			onClick={() => handleToggleTaskCompleted(task.id, task.completed)}
		>
			{task.completed ? (
				<CheckCircleIcon
					className={cn('text-green-500', size === 'sm' ? 'size-5' : 'size-8')}
				/>
			) : (
				<CircleIcon
					className={cn('text-gray-300', size === 'sm' ? 'size-5' : 'size-8')}
				/>
			)}
		</Button>
	)
}

export default ToggleTaskCompleteButton

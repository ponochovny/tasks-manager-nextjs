'use client'

import { taskCompletedToggle } from '@/app/api/tasks.api'
import { ITask, useTasks } from '@/app/providers/tasks-provider'
import { Button } from '@/shared/ui/button'
import { CheckCircleIcon, CircleIcon } from 'lucide-react'

const ToggleTaskCompleteButton = ({ task }: { task: ITask }) => {
	const { tasks, setTasks } = useTasks()

	const handleToggleTaskCompleted = async (id: number, completed: boolean) => {
		const updatedTask = await taskCompletedToggle(id, completed)
		setTasks(
			tasks.map((task) =>
				task.id === id
					? {
							...task,
							completed: updatedTask.completed,
							date_completed: updatedTask.completed
								? updatedTask.date_completed
								: null,
					  }
					: task
			)
		)
	}

	return (
		<Button
			variant='ghost'
			size='icon'
			onClick={() => handleToggleTaskCompleted(task.id, task.completed)}
		>
			{task.completed ? (
				<CheckCircleIcon className='size-5 text-green-500' />
			) : (
				<CircleIcon className='size-5 text-gray-300' />
			)}
		</Button>
	)
}

export default ToggleTaskCompleteButton

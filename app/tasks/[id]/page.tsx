'use client'

import { getTaskById } from '@/app/api/tasks.api'
import { ITask } from '@/app/providers/tasks-provider'
import { TaskInfo } from '@/entities/task'
import { DeleteTaskButton, ToggleTaskCompleteButton } from '@/features/task'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'

const TaskPage = () => {
	const { id } = useParams()
	const [isPending, startTransition] = useTransition()
	const [task, setTask] = useState<null | ITask>(null)

	const getTask = useCallback(async () => {
		try {
			if (id === undefined) return

			const data = await getTaskById(+id)

			return data.data
		} catch {}
	}, [id])

	const refetchTask = useCallback(() => {
		startTransition(async () => {
			await getTask().then((data) => setTask(data))
		})
	}, [getTask])

	useEffect(() => {
		refetchTask()
	}, [refetchTask])

	if (task === null && !isPending) return null

	if (!task && !isPending) {
		return (
			<div className='py-10 text-center'>
				<p className='text-gray-500'>Task not found</p>
			</div>
		)
	}

	if (!task && isPending) {
		return (
			<div className='py-10 text-center'>
				<p>Loading...</p>
			</div>
		)
	}

	return (
		<div className='space-y-6 md:w-auto w-full'>
			{task && (
				<div className='space-y-2'>
					<TaskInfo
						task={task as ITask}
						toggleTaskCompletionSlot={
							<ToggleTaskCompleteButton
								task={task}
								updatedTaskHandler={refetchTask}
								size='md'
							/>
						}
					/>
					<DeleteTaskButton taskId={(task as ITask).id} isRefetch={false} />
				</div>
			)}
		</div>
	)
}

export default TaskPage

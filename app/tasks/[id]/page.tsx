'use client'

import { getTaskById } from '@/app/api/tasks.api'
import { ITask } from '@/app/providers/tasks-provider'
import { TaskInfo } from '@/entities/task'
import { DeleteTaskButton } from '@/features/task'
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

	useEffect(() => {
		startTransition(async () => {
			await getTask().then((data) => setTask(data))
		})
	}, [getTask])

	if (task === null && !isPending) return null

	return (
		<div className='space-y-6'>
			{isPending ? (
				<p>Loading...</p>
			) : !task ? (
				<p className='text-gray-500'>Task not found</p>
			) : null}
			{task && (
				<div className='space-y-2'>
					<TaskInfo task={task as ITask} />
					<DeleteTaskButton taskId={(task as ITask).id} isRefetch={false} />
				</div>
			)}
		</div>
	)
}

export default TaskPage

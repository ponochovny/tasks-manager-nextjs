'use client'

import { getTaskById } from '@/app/api/tasks.api'
import { ITask } from '@/app/providers/tasks-provider'
import { TaskInfo } from '@/entities/task'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'

const TaskPage = () => {
	const { id } = useParams()
	const [isPending, startTransition] = useTransition()
	const [task, setTask] = useState<null | ITask>(null)

	const getTask = useCallback(async () => {
		if (id === undefined) return

		const data = await getTaskById(+id)

		return data.data
	}, [id])

	useEffect(() => {
		startTransition(async () => {
			await getTask().then((data) => setTask(data))
		})
	}, [getTask])

	if (task === null && !isPending) return null

	return (
		<div className='space-y-6'>
			{isPending ? <p>Loading...</p> : <TaskInfo task={task as ITask} />}
		</div>
	)
}

export default TaskPage

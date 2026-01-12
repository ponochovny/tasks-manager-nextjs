'use client'

import { useCallback, useEffect, useState, useTransition } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { editTask, getTaskById } from '@/app/api/tasks.api'
import { ITask } from '@/app/providers/tasks-provider'
import H1 from '@/shared/ui/h1'
import TaskForm, { formSchema } from '@/widgets/task-form'
import z from 'zod'
import { toast } from 'sonner'

const EditTask = () => {
	const { id } = useParams<{ id: string }>()
	const [isPending, startTransition] = useTransition()
	const [task, setTask] = useState<null | ITask>(null)
	const router = useRouter()

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

	useEffect(() => {
		if (task !== null && !isPending) {
			if (!task?.title) {
				setTimeout(() => {
					router.push('/')
				}, 3000)
			}
		}
	}, [task, isPending, router])

	const handleEdit = async (values: z.infer<typeof formSchema>) => {
		const updatedData = {
			...values,
			date_created: values.date_created.toISOString(),
			date_completed: values.date_completed
				? values.date_completed.toISOString()
				: null,
		}

		toast.promise(
			() =>
				editTask(task?.id as number, updatedData).then(() => {
					router.push(`/tasks/${task?.id}`)
				}),
			{
				loading: 'Loading...',
				success: () => `Task edited successfully`,
				error: 'Error',
			}
		)
	}

	if (task === null && !isPending) return null

	if (!task && isPending) {
		return (
			<div className='py-10'>
				<p>Loading...</p>
			</div>
		)
	}

	if (!task && !isPending) {
		return (
			<div className='py-10'>
				<p className='text-gray-500 flex flex-col text-left'>
					<span>Task not found.</span>
					<span>Redirecting to home...</span>
				</p>
			</div>
		)
	}

	return (
		<div className='space-y-6'>
			<H1>Edit Task</H1>
			<TaskForm data={task} submitted={handleEdit} />
		</div>
	)
}

export default EditTask

'use client'

import { createTask } from '@/app/api/tasks.api'
import H1 from '@/shared/ui/h1'
import TaskForm, { formSchema } from '@/widgets/task-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import z from 'zod'

const CreateTask = () => {
	const router = useRouter()

	const handleCreate = async (values: z.infer<typeof formSchema>) => {
		const newData = {
			...values,
			date_created: values.date_created.toISOString(),
			date_completed: values.date_completed
				? values.date_completed.toISOString()
				: null,
		}

		toast.promise(
			() =>
				createTask(newData).then((res) => {
					router.push(`/tasks/${res.id}`)
				}),
			{
				loading: 'Loading...',
				success: () => `Task created successfully`,
				error: 'Error',
			},
		)
	}

	return (
		<div className='space-y-6 md:w-auto w-full'>
			<H1>Create Task</H1>
			<TaskForm submitted={handleCreate} />
		</div>
	)
}

export default CreateTask

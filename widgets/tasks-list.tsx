import Link from 'next/link'
import {
	Item,
	ItemActions,
	ItemContent,
	ItemMedia,
	ItemTitle,
} from '@/shared/ui/item'
import { ITask, useTasks } from '@/app/providers/tasks-provider'
import HumanDate from '@/shared/ui/human-date'
import {
	DeleteTaskButton,
	EditTaskButton,
	SetTaskPrioritySelect,
	ToggleTaskCompleteButton,
} from '@/features/task'

const TasksList = () => {
	const { tasks, setTasks } = useTasks()

	const updatedTaskHandler = (updatedTask: ITask) => {
		if (!tasks) return
		setTasks(
			tasks.map((task) =>
				task.id === updatedTask.id
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

	if (!tasks) return null

	if (tasks && tasks.length === 0) {
		return <p className='text-gray-500'>No tasks found</p>
	}

	return (
		<ul className='space-y-2'>
			{tasks.map((task) => (
				<Item variant='outline' size='sm' asChild key={task.id}>
					<div className='flex items-center justify-between w-full'>
						<ItemMedia>
							<ToggleTaskCompleteButton
								task={task}
								updatedTaskHandler={updatedTaskHandler}
							/>
						</ItemMedia>
						<ItemContent className='items-start'>
							<Link href={`/tasks/${task.id}`} className='inline-block'>
								<ItemTitle>{task.title}</ItemTitle>
							</Link>
							<ItemTitle className='text-sm text-gray-500'>
								<HumanDate date={task.date_completed} />
							</ItemTitle>
						</ItemContent>
						<ItemActions>
							<SetTaskPrioritySelect task={task} />
							<EditTaskButton taskId={task.id} />
							<DeleteTaskButton taskId={task.id} />
						</ItemActions>
					</div>
				</Item>
			))}
		</ul>
	)
}

export default TasksList

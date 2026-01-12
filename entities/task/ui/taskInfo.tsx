import { ITask } from '@/app/providers/tasks-provider'
import { EditTaskButton } from '@/features/task'
import H1 from '@/shared/ui/h1'
import HumanDate from '@/shared/ui/human-date'

const TaskInfo = ({
	task,
	toggleTaskCompletionSlot,
}: {
	task: ITask
	toggleTaskCompletionSlot: React.ReactNode
}) => {
	const { title, description, priority, date_created, date_completed } = task

	return (
		<>
			<H1>
				{toggleTaskCompletionSlot}
				{title}
				<EditTaskButton taskId={task.id} />
			</H1>
			<div>
				<p>{description}</p>
				<p>Priority - {priority}</p>
				<p>
					Created - <HumanDate date={date_created} />
				</p>
				<p>
					{date_completed ? (
						<>
							Completed - <HumanDate date={date_completed} />
						</>
					) : (
						'Incompleted'
					)}
				</p>
			</div>
		</>
	)
}

export default TaskInfo

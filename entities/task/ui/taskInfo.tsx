import { ITask } from '@/app/providers/tasks-provider'
import H1 from '@/shared/ui/h1'
import HumanDate from '@/shared/ui/human-date'
import { CheckCircleIcon, CircleIcon } from 'lucide-react'

const TaskInfo = ({ task }: { task: ITask }) => {
	const {
		completed,
		title,
		description,
		priority,
		date_created,
		date_completed,
	} = task

	return (
		<>
			<H1>
				{completed ? (
					<CheckCircleIcon className='size-8 text-green-500' />
				) : (
					<CircleIcon className='size-8 text-gray-300' />
				)}
				{title}
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

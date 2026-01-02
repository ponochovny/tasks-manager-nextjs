import { taskPriorityChange } from '@/app/api/tasks.api'
import { ITask, Priority, useTasks } from '@/app/providers/tasks-provider'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select'

const SetTaskPrioritySelect = ({ task }: { task: ITask }) => {
	const { tasks, setTasks } = useTasks()

	const handleTaskPriorityChange = async (id: number, value: string) => {
		const updatedTask = await taskPriorityChange(id, value)
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, priority: updatedTask.priority } : task
			)
		)
	}

	return (
		<Select
			defaultValue={task.priority}
			onValueChange={(value) => handleTaskPriorityChange(task.id, value)}
		>
			<SelectTrigger className='w-30'>
				<SelectValue placeholder='Priority' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={Priority.low}>Low</SelectItem>
				<SelectItem value={Priority.medium}>Medium</SelectItem>
				<SelectItem value={Priority.high}>High</SelectItem>
			</SelectContent>
		</Select>
	)
}

export default SetTaskPrioritySelect

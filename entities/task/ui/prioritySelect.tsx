import { Priority } from '@/app/providers/tasks-provider'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select'
import { priorityFormat } from '../utils'

const PrioritySelect = ({
	value,
	valueChanged,
}: {
	value?: string | null
	valueChanged: (value: string) => void
}) => {
	return (
		<Select value={value || ''} onValueChange={(value) => valueChanged(value)}>
			<SelectTrigger className='w-30'>
				<SelectValue placeholder='Priority' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={Priority.low.toString()}>
					{priorityFormat(Priority.low)}
				</SelectItem>
				<SelectItem value={Priority.medium.toString()}>
					{priorityFormat(Priority.medium)}
				</SelectItem>
				<SelectItem value={Priority.high.toString()}>
					{priorityFormat(Priority.high)}
				</SelectItem>
			</SelectContent>
		</Select>
	)
}

export default PrioritySelect

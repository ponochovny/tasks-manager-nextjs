import { Priority } from '@/app/providers/tasks-provider'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select'

const PrioritySelect = ({
	defaultValue,
	valueChanged,
}: {
	defaultValue: string
	valueChanged: (value: string) => void
}) => {
	return (
		<Select
			defaultValue={defaultValue}
			onValueChange={(value) => valueChanged(value)}
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

export default PrioritySelect

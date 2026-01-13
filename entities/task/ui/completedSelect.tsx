import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select'

const CompletedSelect = ({
	value,
	valueChanged,
}: {
	value?: string
	valueChanged: (value: string) => void
}) => {
	return (
		<Select value={value || ''} onValueChange={(value) => valueChanged(value)}>
			<SelectTrigger className='w-30'>
				<SelectValue placeholder='Completed' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={'true'}>Completed</SelectItem>
				<SelectItem value={'false'}>Uncompleted</SelectItem>
			</SelectContent>
		</Select>
	)
}

export default CompletedSelect

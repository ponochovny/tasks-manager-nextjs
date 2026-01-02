import { Button } from '@/shared/ui/button'
import Link from 'next/link'

const EditTaskButton = ({ taskId }: { taskId: number }) => {
	return (
		<Button size='sm' variant='outline' asChild>
			<Link href={`/tasks/edit/${taskId}`}>Edit</Link>
		</Button>
	)
}

export default EditTaskButton

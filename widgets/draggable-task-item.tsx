'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ITask } from '@/app/providers/tasks-provider'
import Link from 'next/link'
import {
	Item,
	ItemActions,
	ItemContent,
	ItemMedia,
	ItemTitle,
} from '@/shared/ui/item'
import HumanDate from '@/shared/ui/human-date'
import {
	DeleteTaskButton,
	EditTaskButton,
	ToggleTaskCompleteButton,
} from '@/features/task'
import { PrioritySelect } from '@/entities/task'
import { GripVertical } from 'lucide-react'
import { buttonVariants } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'

interface DraggableTaskItemProps {
	task: ITask
	updatedTaskHandler: (task: ITask) => void
	handleTaskPriorityChange: (id: number, value: string) => void
}

const DraggableTaskItem = ({
	task,
	updatedTaskHandler,
	handleTaskPriorityChange,
}: DraggableTaskItemProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: task.id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.75 : 1,
	}

	return (
		<Item variant='outline' size='sm' asChild ref={setNodeRef} style={style}>
			<div className='flex items-center justify-between w-full'>
				<ItemMedia className='flex items-center md:m-0 -ml-4 gap-0 md:gap-2'>
					<button
						{...attributes}
						{...listeners}
						className={cn(
							buttonVariants({
								variant: 'ghost',
							}),
							'cursor-grab active:cursor-grabbing',
						)}
						title='Drag to reorder'
					>
						<GripVertical className='size-5 text-gray-400' />
					</button>
					<ToggleTaskCompleteButton
						task={task}
						updatedTaskHandler={updatedTaskHandler}
					/>
				</ItemMedia>
				<ItemContent className='md:flex-row flex-col gap-2 md:items-center md:justify-between'>
					<div className='flex flex-col gap-1'>
						<Link href={`/tasks/${task.id}`} className='inline-block'>
							<ItemTitle>{task.title}</ItemTitle>
						</Link>
						<ItemTitle className='text-sm text-gray-500'>
							<HumanDate date={task.date_completed} />
						</ItemTitle>
					</div>

					<PrioritySelect
						value={task.priority.toString()}
						valueChanged={(value) => handleTaskPriorityChange(task.id, value)}
					/>
				</ItemContent>
				<ItemActions className='md:flex-row flex-col items-stretch'>
					<EditTaskButton taskId={task.id} />
					<DeleteTaskButton taskId={task.id} />
				</ItemActions>
			</div>
		</Item>
	)
}

export default DraggableTaskItem

'use client'

import React from 'react'
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
				<ItemMedia className='flex items-center gap-2'>
					<button
						{...attributes}
						{...listeners}
						// className='cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 rounded'
						className={cn(
							buttonVariants({
								variant: 'ghost',
							}),
							'cursor-grab active:cursor-grabbing',
							// className,
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
				<ItemContent className='items-start'>
					<Link href={`/tasks/${task.id}`} className='inline-block'>
						<ItemTitle>{task.title}</ItemTitle>
					</Link>
					<ItemTitle className='text-sm text-gray-500'>
						<HumanDate date={task.date_completed} />
					</ItemTitle>
				</ItemContent>
				<ItemActions>
					<PrioritySelect
						value={task.priority.toString()}
						valueChanged={(value) => handleTaskPriorityChange(task.id, value)}
					/>
					<EditTaskButton taskId={task.id} />
					<DeleteTaskButton taskId={task.id} />
				</ItemActions>
			</div>
		</Item>
	)
}

export default DraggableTaskItem

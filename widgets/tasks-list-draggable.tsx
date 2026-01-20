'use client'

import { useCallback } from 'react'
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from '@dnd-kit/core'
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { ITask, useTasks } from '@/app/providers/tasks-provider'
import { updateTaskOrder, taskPriorityChange } from '@/app/api/tasks.api'
import DraggableTaskItem from './draggable-task-item'

const TasksListDraggable = () => {
	const { tasks, setTasks } = useTasks()

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	)

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
					: task,
			),
		)
	}

	const handleTaskPriorityChange = async (id: number, value: string) => {
		if (!tasks) return
		const updatedTask = await taskPriorityChange(id, +value)
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, priority: updatedTask.priority } : task,
			),
		)
	}

	const handleDragEnd = useCallback(
		async (event: DragEndEvent) => {
			if (!tasks) return
			const { active, over } = event
			if (!over || active.id === over.id) return
			const activeIndex = tasks.findIndex((t) => t.id === active.id)
			const overIndex = tasks.findIndex((t) => t.id === over.id)
			const newTasks = arrayMove(tasks, activeIndex, overIndex)
			setTasks(newTasks)
			const updates = newTasks.map((task, index) =>
				updateTaskOrder(task.id, index),
			)
			await Promise.all(updates)
		},
		[tasks, setTasks],
	)

	if (!tasks) return null

	if (tasks.length === 0) {
		return <p className='text-gray-500'>No tasks found</p>
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={tasks.map((t) => t.id)}
				strategy={verticalListSortingStrategy}
			>
				<ul className='space-y-2'>
					{tasks.map((task) => (
						<DraggableTaskItem
							key={task.id}
							task={task}
							updatedTaskHandler={updatedTaskHandler}
							handleTaskPriorityChange={handleTaskPriorityChange}
						/>
					))}
				</ul>
			</SortableContext>
		</DndContext>
	)
}

export default TasksListDraggable

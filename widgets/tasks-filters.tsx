import { useTasks } from '@/app/providers/tasks-provider'
import { CompletedSelect, PrioritySelect } from '@/entities/task'
import { Button } from '@/shared/ui/button'
import {
	ArrowDownUp,
	ArrowDownWideNarrowIcon,
	ArrowUpNarrowWideIcon,
	XCircleIcon,
} from 'lucide-react'

const TasksFilters = () => {
	const { query, setQuery } = useTasks()

	const setOrderLogic = (field: string) => {
		return query.sort !== field
			? 'asc'
			: query.order === 'asc'
				? 'desc'
				: query.order === 'desc'
					? undefined
					: 'asc'
	}
	const setSortLogic = (
		field: 'priority' | 'date_created' | 'date_completed',
	) => {
		return query.order === 'desc' && query.sort === field ? undefined : field
	}

	const SortSign = (field: string) => {
		return (
			<>
				{query.order === 'asc' && query.sort === field && (
					<ArrowDownWideNarrowIcon className='inline-block size-4 ml-1' />
				)}
				{query.order === 'desc' && query.sort === field && (
					<ArrowUpNarrowWideIcon className='inline-block size-4 ml-1' />
				)}
				{(query.order === undefined || query.sort !== field) && (
					<ArrowDownUp className='inline-block size-4 ml-1' />
				)}
			</>
		)
	}

	const sortClearBtnCondition = (field: string) => {
		return query.sort === field && query.order !== undefined
	}

	return (
		<div className='mb-4 flex gap-4'>
			<div className='flex items-center'>
				<CompletedSelect
					value={query.completed !== undefined ? String(query.completed) : ''}
					valueChanged={(value) =>
						setQuery((prev) => ({
							...prev,
							completed: value === 'true',
							mode: 'auto',
						}))
					}
				/>
				{query.completed !== undefined && (
					<Button
						onClick={() =>
							setQuery((prev) => ({
								...prev,
								completed: undefined,
							}))
						}
						variant='ghost'
					>
						<XCircleIcon className='size-4' />
					</Button>
				)}
			</div>
			<div className='flex items-center'>
				<PrioritySelect
					value={query.priority || null}
					valueChanged={(value) =>
						setQuery((prev) => ({
							...prev,
							sort: query.sort === 'priority' ? undefined : query.sort,
							order: undefined,
							priority: value,
							mode: 'auto',
						}))
					}
				/>
				{query.priority && (
					<Button
						onClick={() =>
							setQuery((prev) => ({
								...prev,
								priority: undefined,
							}))
						}
						variant='ghost'
					>
						<XCircleIcon className='size-4' />
					</Button>
				)}
			</div>
			{query.priority === undefined && (
				<div className='flex items-center'>
					<Button
						onClick={() =>
							setQuery((prev) => ({
								...prev,
								sort: setSortLogic('priority'),
								order: setOrderLogic('priority'),
								mode: 'auto',
							}))
						}
						variant='outline'
					>
						Priority
						{SortSign('priority')}
					</Button>
					{query.sort === 'priority' && query.order !== undefined && (
						<Button
							onClick={() =>
								setQuery((prev) => ({
									...prev,
									sort: undefined,
									order: undefined,
								}))
							}
							variant='ghost'
						>
							<XCircleIcon className='size-4' />
						</Button>
					)}
				</div>
			)}
			<div className='flex items-center'>
				<Button
					onClick={() =>
						setQuery((prev) => ({
							...prev,
							sort: setSortLogic('date_completed'),
							order: setOrderLogic('date_completed'),
							mode: 'auto',
						}))
					}
					variant='outline'
				>
					Date completed
					{SortSign('date_completed')}
				</Button>
				{sortClearBtnCondition('date_completed') && (
					<Button
						onClick={() =>
							setQuery((prev) => ({
								...prev,
								sort: undefined,
								order: undefined,
							}))
						}
						variant='ghost'
					>
						<XCircleIcon className='size-4' />
					</Button>
				)}
			</div>
			<div className='flex items-center'>
				<Button
					onClick={() =>
						setQuery((prev) => ({
							...prev,
							sort: setSortLogic('date_created'),
							order: setOrderLogic('date_created'),
							mode: 'auto',
						}))
					}
					variant='outline'
				>
					Date created
					{SortSign('date_created')}
				</Button>
				{sortClearBtnCondition('date_created') && (
					<Button
						onClick={() =>
							setQuery((prev) => ({
								...prev,
								sort: undefined,
								order: undefined,
							}))
						}
						variant='ghost'
					>
						<XCircleIcon className='size-4' />
					</Button>
				)}
			</div>
			<div className='flex items-center'>
				<Button
					onClick={() =>
						setQuery((prev) => ({
							...prev,
							mode: prev.mode === 'manual' ? 'auto' : 'manual',
							sort: prev.mode === 'manual' ? undefined : 'order',
							order: prev.mode === 'manual' ? undefined : 'asc',
							completed: undefined,
							priority: undefined,
							page: undefined,
						}))
					}
					variant={query.mode === 'manual' ? 'default' : 'outline'}
				>
					Manual
				</Button>
			</div>
		</div>
	)
}

export default TasksFilters

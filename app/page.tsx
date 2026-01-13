'use client'

import H1 from '@/shared/ui/h1'
import { useTasks } from './providers/tasks-provider'
import UiPagination from '@/shared/ui/ui-pagination'
import TasksList from '@/widgets/tasks-list'
import { Button } from '@/shared/ui/button'
import {
	ArrowDownUp,
	ArrowDownWideNarrowIcon,
	ArrowUpNarrowWideIcon,
	PlusIcon,
	XCircleIcon,
} from 'lucide-react'
import Link from 'next/link'
import { CompletedSelect, PrioritySelect } from '@/entities/task'

export default function Home() {
	const { pagination, isPending, query, setQuery } = useTasks()

	return (
		<>
			<H1>
				Tasks
				<Button variant='ghost' asChild>
					<Link href={`/tasks/create`}>
						<PlusIcon className='size-8' />
					</Link>
				</Button>
			</H1>
			<div className='mt-10 w-full space-y-6'>
				<div className='mb-4 flex gap-4'>
					<div className='flex items-center'>
						<CompletedSelect
							value={
								query.completed !== undefined ? String(query.completed) : ''
							}
							valueChanged={(value) =>
								setQuery((prev) => ({
									...prev,
									completed: value === 'true',
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
										sort: query.order === 'desc' ? undefined : 'priority',
										order:
											query.order === 'asc'
												? 'desc'
												: query.order === 'desc'
												? undefined
												: 'asc',
									}))
								}
								variant='outline'
							>
								Priority
								{query.order === 'asc' && query.sort === 'priority' && (
									<ArrowDownWideNarrowIcon className='inline-block size-4 ml-1' />
								)}
								{query.order === 'desc' && query.sort === 'priority' && (
									<ArrowUpNarrowWideIcon className='inline-block size-4 ml-1' />
								)}
								{(query.order === undefined || query.sort !== 'priority') && (
									<ArrowDownUp className='inline-block size-4 ml-1' />
								)}
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
									sort: query.order === 'desc' ? undefined : 'date_completed',
									order:
										query.order === 'asc'
											? 'desc'
											: query.order === 'desc'
											? undefined
											: 'asc',
								}))
							}
							variant='outline'
						>
							Date completed
							{query.order === 'asc' && query.sort === 'date_completed' && (
								<ArrowDownWideNarrowIcon className='inline-block size-4 ml-1' />
							)}
							{query.order === 'desc' && query.sort === 'date_completed' && (
								<ArrowUpNarrowWideIcon className='inline-block size-4 ml-1' />
							)}
							{(query.order === undefined ||
								query.sort !== 'date_completed') && (
								<ArrowDownUp className='inline-block size-4 ml-1' />
							)}
						</Button>
						{query.sort === 'date_completed' && query.order !== undefined && (
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
				</div>

				{isPending ? (
					<p className='text-gray-500'>Loading...</p>
				) : (
					<>
						<TasksList />
						<UiPagination pagination={pagination} />
					</>
				)}
			</div>
		</>
	)
}

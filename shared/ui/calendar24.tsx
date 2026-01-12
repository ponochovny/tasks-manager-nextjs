'use client'

import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { getLocalOffsetString } from '../lib/utils'

export function Calendar24({
	value,
	dateChanged,
	timeChanged,
}: {
	value: Date | undefined
	dateChanged: (date: Date) => void
	timeChanged: (time: string) => void
}) {
	const [open, setOpen] = React.useState(false)
	const [date, setDate] = React.useState<Date | undefined>(undefined)

	React.useEffect(() => {
		setDate(value)
	}, [value])

	return (
		<div className='flex gap-4'>
			<div className='flex flex-col gap-3'>
				<Label htmlFor='date-picker' className='px-1'>
					Date
				</Label>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant='outline'
							id='date-picker'
							className='w-32 justify-between font-normal'
						>
							{date ? date.toLocaleDateString() : 'Select date'}
							<ChevronDownIcon />
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-auto overflow-hidden p-0' align='start'>
						<Calendar
							mode='single'
							selected={date}
							captionLayout='dropdown'
							onSelect={(date) => {
								setDate(date)
								if (date) dateChanged(date)
								setOpen(false)
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
			<div className='flex flex-col gap-3'>
				<Label htmlFor='time-picker' className='px-1'>
					Time ({getLocalOffsetString()})
				</Label>
				<Input
					type='time'
					id='time-picker'
					step='1'
					defaultValue={date ? date.toLocaleTimeString() : undefined}
					onChange={(e) => timeChanged(e.target.value)}
					className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
				/>
			</div>
		</div>
	)
}

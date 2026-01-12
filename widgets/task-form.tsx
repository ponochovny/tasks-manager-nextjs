'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/shared/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { PrioritySelect } from '@/entities/task'
import { Switch } from '@/shared/ui/switch'
import { Calendar24 } from '@/shared/ui/calendar24'
import { mergeDateAndTime } from '@/shared/lib/utils'
import { ITask, Priority } from '@/app/providers/tasks-provider'

export const formSchema = z
	.object({
		title: z.string().min(2, {
			message: 'Title must be at least 2 characters.',
		}),
		description: z.string().min(5, {
			message: 'Description must be at least 5 characters.',
		}),
		priority: z.enum(Priority),
		completed: z.boolean(),
		date_created: z.date(),
		date_completed: z.date().optional(),
	})
	.refine(
		(data) => {
			if (data.date_completed && data.date_created) {
				return data.date_completed >= data.date_created
			}
			return true
		},
		{
			message: 'Completed date must be greater than or equal to created date.',
			path: ['date_completed'],
		}
	)

function TaskForm({
	data,
	submitted,
}: {
	data?: ITask | null
	submitted: (values: z.infer<typeof formSchema>) => void
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: data?.title || '',
			description: data?.description || '',
			priority: data?.priority || Priority.low,
			completed: data?.completed || false,
			date_created: data?.date_created
				? new Date(data.date_created)
				: new Date(),
			date_completed: data?.date_completed
				? new Date(data.date_completed)
				: undefined,
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
		submitted(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder='Task title' {...field} />
							</FormControl>
							{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input placeholder='Task description' {...field} />
							</FormControl>
							{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='priority'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Priority</FormLabel>
							<FormControl>
								{/* <Input placeholder='shadcn' {...field} /> */}
								{/* <select {...field} className='border rounded px-2 py-1'>
									<option value='low'>Low</option>
									<option value='medium'>Medium</option>
									<option value='high'>High</option>
								</select> */}
								<PrioritySelect
									defaultValue={field.value}
									valueChanged={field.onChange}
								/>
							</FormControl>
							{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
							{/* <SetTaskPrioritySelect /> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='completed'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Completed</FormLabel>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={(checked) => {
										if (checked && !form.getValues('date_completed')) {
											form.setValue('date_completed', new Date())
										}
										if (!checked) {
											form.setValue('date_completed', undefined)
										}
										field.onChange(checked)
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='date_completed'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Date Completed</FormLabel>
							<FormControl>
								<Calendar24
									value={field.value}
									dateChanged={(date) => {
										field.onChange(date)
									}}
									timeChanged={(time) => {
										const dateWithUpdatedTime = mergeDateAndTime(
											field.value || new Date(),
											time
										)
										field.onChange(dateWithUpdatedTime)
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='date_created'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Date Created</FormLabel>
							<FormControl>
								<Calendar24
									value={field.value}
									dateChanged={(date) => {
										field.onChange(date)
									}}
									timeChanged={(time) => {
										const dateWithUpdatedTime = mergeDateAndTime(
											field.value,
											time
										)
										field.onChange(dateWithUpdatedTime)
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	)
}

export default TaskForm

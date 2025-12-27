import { NextResponse } from 'next/server'
import { ITask } from '../../providers/tasks-provider'

export async function GET() {
	const tasks: ITask[] = [
		{
			id: 1,
			title: 'Initial Task',
			completed: false,
			date: new Date().toISOString(),
		},
		{
			id: 2,
			title: 'Second Task',
			completed: false,
			date: new Date().toISOString(),
		},
		{
			id: 3,
			title: 'Third Task',
			completed: false,
			date: new Date().toISOString(),
		},
	]

	return NextResponse.json(tasks)
}

// import { NextResponse } from 'next/server'
// import { ITask } from '../../providers/tasks-provider'

// export async function GET() {
// const tasks: ITask[] = [
// 	{
// 		id: 1,
// 		title: 'Initial Task',
// 		priority: 'medium',
// 		description: 'This is the initial task',
// 		completed: false,
// 		date: new Date().toISOString(),
// 	},
// 	{
// 		id: 2,
// 		title: 'Second Task',
// 		priority: 'high',
// 		description: 'This is the second task',
// 		completed: true,
// 		date: new Date().toISOString(),
// 	},
// 	{
// 		id: 3,
// 		title: 'Third Task',
// 		priority: 'low',
// 		description: 'This is the third task',
// 		completed: false,
// 		date: new Date().toISOString(),
// 	},
// ]
// const tasks: ITask[] = await fetch(
// 	'http://localhost:3001/tasks?_page=1&_limit=5'
// ).then((res) => res.json())
// return NextResponse.json(tasks)
// }

// export async function PATCH(
// 	request: Request,
// 	{ params }: { params: { id: string } }
// ) {
// 	const id = parseInt(params.id, 10)
// 	const body = await request.json()
// 	const { completed } = body

// 	// Here you would normally update the task in your database.
// 	// For this example, we'll just return a mock updated task.

// 	// const updatedTask: ITask = {
// 	// 	id,
// 	// 	title: `Task ${id}`,
// 	// 	priority: 'medium',
// 	// 	description: `This is task ${id}`,
// 	// 	completed,
// 	// 	date: new Date().toISOString(),
// 	// }
// 	const updatedTask: ITask = await fetch(`http://localhost:3001/tasks/${id}`, {
// 		method: 'PUT',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify({ completed }),
// 	}).then((res) => res.json())

// 	return NextResponse.json(updatedTask)
// }

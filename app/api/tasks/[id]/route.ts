import { ITask } from '@/app/providers/tasks-provider'
import { NextResponse } from 'next/server'

export async function PATCH(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const id = parseInt(params.id, 10)
	const body = await request.json()
	const { completed } = body

	try {
		const updatedTask: ITask = await fetch(
			`http://localhost:3001/tasks/${id}`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ completed }),
			}
		).then((res) => res.json())
		return NextResponse.json(updatedTask)
	} catch (error) {
		console.log('Error updating task:', error)
		return NextResponse.json({ error }, { status: 500 })
	}
}

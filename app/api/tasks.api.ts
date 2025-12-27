// interface ITask {
// 	id: number
// 	title: string
// 	completed: boolean
// 	date: string
// }

export const getTasks = async () => {
	const res = await fetch('/api/tasks')
	return res.json()
}

// export const createTask = async (task: ITask) => {
// 	const res = await fetch('/api/tasks', {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify(task),
// 	})
// 	return res.json()
// }

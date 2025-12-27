'use client'

import { useTasks } from './providers/tasks-provider'

export default function Home() {
	const { tasks, setTasks } = useTasks()

	return (
		<div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
			<main className='flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start'>
				<h1 className='text-5xl font-bold text-zinc-900 dark:text-white sm:text-6xl'>
					Hello World!
				</h1>
				<div className='mt-10 w-full'>
					<ul>
						{tasks.map((task) => (
							<li key={task.id}>{task.title}</li>
						))}
					</ul>
				</div>
			</main>
		</div>
	)
}

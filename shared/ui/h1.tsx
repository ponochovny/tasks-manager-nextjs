import React from 'react'

const H1 = ({ children }: { children: React.ReactNode }) => {
	return (
		<h1 className='text-5xl font-bold text-zinc-900 dark:text-white sm:text-6xl mt-2 flex items-center gap-2'>
			{children}
		</h1>
	)
}

export default H1

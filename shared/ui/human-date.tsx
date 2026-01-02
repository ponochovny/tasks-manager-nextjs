const HumanDate = ({ date }: { date: Date | string | null | undefined }) => {
	return (
		<span>
			{date
				? new Date(date).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'short',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit',
				  })
				: '-'}
		</span>
	)
}

export default HumanDate

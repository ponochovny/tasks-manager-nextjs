export function priorityFormat(priority: number) {
	switch (priority) {
		case 1:
			return 'Low'
		case 2:
			return 'Medium'
		case 3:
			return 'High'
		default:
			return 'Low'
	}
}

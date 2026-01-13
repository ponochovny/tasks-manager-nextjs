'use client'

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from '@/shared/ui/pagination'
import Link from 'next/link'
import { cn } from '../lib/utils'
import { buttonVariants } from './button'

const UiPagination = ({
	pagination,
}: {
	pagination: {
		total: number
		limit: number
		page: number
		pages: number
	}
}) => {
	const prevPage = pagination?.page > 1 ? pagination?.page - 1 : null
	const prevPageLink = prevPage ? `/?page=${prevPage}` : '#'

	const nextPage =
		pagination?.page < pagination?.pages ? pagination?.page + 1 : null
	const nextPageLink = nextPage ? `/?page=${nextPage}` : '#'

	if (!pagination?.pages || pagination.pages < 1) {
		return null
	}

	return (
		<Pagination>
			<PaginationContent>
				{prevPage && (
					<PaginationItem>
						<PaginationPrevious href={prevPageLink} />
					</PaginationItem>
				)}
				<PaginationItem>
					{Array.from({ length: pagination?.pages || 0 }, (_, i) => i + 1).map(
						(pageNumber) => {
							return pageNumber === pagination.page ? (
								<span
									key={pageNumber}
									className={cn(
										buttonVariants({
											variant: 'outline',
										})
									)}
								>
									{pageNumber}
								</span>
							) : (
								<Link
									href={`/?page=${pageNumber}`}
									key={pageNumber}
									className={cn(
										buttonVariants({
											variant:
												pageNumber === pagination.page ? 'outline' : 'ghost',
										})
									)}
								>
									{pageNumber}
								</Link>
							)
						}
					)}
				</PaginationItem>
				{nextPage && (
					<PaginationItem>
						<PaginationNext href={nextPageLink} />
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	)
}

export default UiPagination

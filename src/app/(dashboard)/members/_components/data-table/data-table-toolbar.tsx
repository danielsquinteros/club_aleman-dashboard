'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/ui/data-table-view-options';

import { roles } from '@/db/data/members';
import { DataTableFacetedFilter } from '@/components/ui/data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

export function DataTableToolbar<TData>({
	table,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className='flex items-center justify-between'>
			<div className='flex flex-1 items-center space-x-2'>
				<Input
					placeholder='Filter members...'
					value={
						(table.getColumn('firstName')?.getFilterValue() as string) ?? ''
					}
					onChange={(event) =>
						table.getColumn('firstName')?.setFilterValue(event.target.value)
					}
					className='h-8 w-[150px] lg:w-[250px]'
				/>
				{table.getColumn('role') && (
					<DataTableFacetedFilter
						column={table.getColumn('role')}
						title='Role'
						options={roles}
					/>
				)}
				{isFiltered && (
					<Button
						variant='ghost'
						onClick={() => table.resetColumnFilters()}
						className='h-8 px-2 lg:px-3'
					>
						Reset
						<Cross2Icon className='ml-2 h-4 w-4' />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
}

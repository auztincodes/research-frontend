import CTable from './';
import { tableHeaders, tableData } from '../../data/table-data.js';

export default {
	title: 'Library/Table',
	component: CTable
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { CTable },
	template: `
	<c-table v-bind="$props">
		<template name="table-row" slot-scope="{ item }">
			<td class="table__row-item">
				{{ item.date }}
			</td>
			<td class="table__row-item">
				{{ item.name }}
			</td>
			<td class="table__row-item">
				{{ item.email }}
			</td>
			<td class="table__row-item">
				{{ item.phone }}
			</td>
			<td class="table__row-item">
				{{ item.txn_id }}
			</td>
			<td class="table__row-item">
				{{ item.module }}
			</td>
			<td class="table__row-item">
				{{ item.status }}
			</td>
		</template>
	</c-table>`
});

export const Default = Template.bind({});

Default.args = {
	tableHeaders,
	tableData
};

import CTableHeader from './TableHeader';
export default {
	name: 'CTable',
	props: {
		tableHeaders: {
			required: true,
			default: []
		},
		tableData: {
			required: true,
			default: () => []
		},
		theme: {
			type: String,
			default: ''
		},
		loading: {
			default: false
		}
	},
	data() {
		return {
			sortBy: null,
			sortType: 'asc'
		};
	},
	computed: {
		sortedData() {
			return this.tableData;
		}
	},
	methods: {
		sortData(value) {
			if (value) {
				let id = value.toLowerCase();
				if (this.sortType === 'asc') {
					if (value === 'createdAt' || value === 'updatedAt') {
						this.sortedData.sort((a, b) => {
							return new Date(a[value]) - new Date(b[value]);
						});
					} else {
						this.sortedData.sort((a, b) => (a[id] < b[id] ? -1 : 1));
					}

					this.sortType = 'desc';
				} else {
					if (value === 'createdAt' || value === 'updatedAt') {
						this.sortedData.sort((a, b) => {
							return new Date(b[value]) - new Date(a[value]);
						});
					} else {
						this.sortedData.sort((a, b) => (b[id] < a[id] ? -1 : 1));
					}

					this.sortType = 'asc';
				}
			}
		}
	},
	components: {
		CTableHeader
	}
};

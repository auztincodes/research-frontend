import Papa from 'papaparse';
import { mapActions } from 'vuex';

export default {
	data() {
		return {
			csvImport: {
				contacts: null,
				is_csv: true
			},
			csvHeaders: [],
			openConfigPage: false,
			dataFields: [
				{
					mainKey: 'Company',
					csvKey: '',
					placeholder: 'Google, Netflix, Facebook'
				},
				{
					mainKey: 'Email',
					csvKey: '',
					placeholder: 'wilsonjane@gmail.com, marcus@gmail.com'
				},
				{
					mainKey: 'First Name',
					csvKey: '',
					placeholder: 'Cody Fisher, Jenny Wilson, McCann, Marcus'
				},
				{
					mainKey: 'Last Name',
					csvKey: '',
					placeholder: 'Jenny Wilson, McCann, Marcus'
				},
				{
					mainKey: 'Linkedin',
					csvKey: '',
					placeholder: 'Robert Fox, Guy Hawkins, Jenny Wilson, McCann, Marcus'
				},
				{
					mainKey: 'Title',
					csvKey: '',
					placeholder: 'Design manager, Software engineer, Product manager'
				},
				{
					mainKey: 'Website',
					csvKey: '',
					placeholder: 'google.com, twitter.com, facebook.com'
				}
			]
		};
	},
	methods: {
		...mapActions({
			showAlert: 'showAlert'
		}),
		inputFile(newFile) {
			if (newFile.size > 10485760) {
				this.showAlert({
					status: 'error',
					message: 'file size is more that 10MB',
					showAlert: true
				});
				return true;
			}
			if (newFile.name.split('.').pop() !== 'csv') {
				this.showAlert({
					status: 'error',
					message: 'file type is not csv',
					showAlert: true
				});
				return true;
			}
			var file = newFile.file;
			Papa.parse(file, {
				complete: (res) => {
					this.csvHeaders = res.meta.fields;
					this.csvImport.contacts = res.data;
					this.dataFields = this.dataFields.map((field) => {
						field.csvKey = this.csvHeaders.find((header) => header === field.mainKey);
						return field;
					});
					this.openConfigPage = true;
				},
				header: true
			});
		},
		submitImportCSV() {
			this.csvImport.contacts = this.csvImport.contacts.map((el) => {
				Object.keys(el).forEach((u) => {
					if (this.dataFields.map((ii) => ii.csvKey).includes(u)) {
						const title = this.dataFields.find((w) => w.csvKey === u).mainKey;
						const value = el[u];
						delete el[u];
						el[title] = value;
						return el;
					}
				});
				return el;
			});

			this.uploadBulkResearch();
		}
	}
};

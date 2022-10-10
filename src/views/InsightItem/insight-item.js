import { mapMutations, mapGetters, mapActions } from 'vuex';
import CTag from '@/components/Tag';
import LoadingState from '@/components/LoadingState';
import insightMixin from '@/mixins/insightMixin';

export default {
	mixins: [insightMixin],
	name: 'InsightItem',
	components: {
		CTag,
		LoadingState
	},
	data() {
		return {
			hideSearch: false,
			rows: 1,
			searchType: '',
			filterValue: [],
			itemContent: '',
			loading: false,
			can_render: false,
			researchedPayload: {
				type: Object
			},
			tabs: ['All', 'Data', 'E-signature', 'Non-profit'],
			dislikeOption: 'Not relevant to this search',
			contactSortMethod: '',
			companySortMethod: ''
		};
	},
	watch: {
		hideSearch(value) {
			value ? (this.rows = 30) : (this.rows = 1);
		}
	},
	async mounted() {
		this.searchType = this.getSearchedItem.type;
		await this.initUserBookmarks();
		await this.initUserNote(this.getSearchedResult.rowId);
	},
	computed: {
		...mapGetters({
			getNotepad: 'search_services/getNotepad',
			getSearchedItem: 'search_services/getSearchedItem'
		}),
		notepad: {
			get() {
				return this.getNotepad;
			},
			set(value) {
				this.saveNotepad(value);
			}
		},
		contact_insights_categories: {
			get() {
				let newObj = {};
				let result = JSON.parse(JSON.stringify(this.getSearchedResult[this.searchType]));
				const data = result.news;
				const tab = this.selectedTab;
				this.tabs = Object.keys(data);

				if (tab === 'All') {
					let newArray = [];
					for (const item in data) {
						newArray = [...newArray, ...data[item]];
					}
					const uniqueArray = [...new Map(newArray.map((item) => [item['url'], item])).values()];
					this.sortByDislike(uniqueArray);
					this.sortByBookmarked(uniqueArray);
					return this.checkContactSort(uniqueArray);
				} else {
					const element = Object.keys(data).includes(tab) ? data[tab] : '';
					newObj[tab] = element;
					this.sortByBookmarked(newObj[tab]);
					this.sortByDislike(newObj[tab]);
					return this.checkContactSort(newObj[tab]);
				}
			},
			set(value) {
				return value;
			}
		},
		company_insights_categories: {
			get() {
				let newObj = {};
				let result = JSON.parse(JSON.stringify(this.getSearchedResult[this.searchType]));
				const data = result.news;
				const tab = this.companyTab;
				const element = Object.keys(data).includes(tab) ? data[tab] : '';
				newObj[tab] = element;
				this.sortByDislike(newObj[tab]);
				this.sortByBookmarked(newObj[tab]);
				return this.checkCompanySort(newObj[tab]);
			},
			set(value) {
				return value;
			}
		}
	},
	methods: {
		...mapMutations({
			saveNotepad: 'search_services/saveNotepad',
			saveSearchPayload: 'search_services/saveSearchPayload'
		}),
		...mapActions({
			content: 'search_services/content',
			fetchResearch: 'search_services/research'
		}),
		// checkContactSort(uniqueArray) {
		// 	if (this.contactSortMethod === 'recent') {
		// 		return this.sortByRecent(uniqueArray);
		// 	} else if (this.contactSortMethod === 'relevance') {
		// 		return this.sortByRelevance(uniqueArray);
		// 	} else {
		// 		return uniqueArray;
		// 	}
		// },
		// checkCompanySort(uniqueArray) {
		// 	if (this.companySortMethod === 'recent') {
		// 		return this.sortByRecent(uniqueArray);
		// 	} else if (this.companySortMethod === 'relevance') {
		// 		return this.sortByRelevance(uniqueArray);
		// 	} else {
		// 		return uniqueArray;
		// 	}
		// },
		// sortByRelevance(data) {
		// 	return data.sort((a, b) => (a.meta.relevanceScore < b.meta.relevanceScore ? 1 : -1));
		// },
		// sortByRecent(data) {
		// 	return data.sort((a, b) => {
		// 		return (
		// 			new Date(b.meta.published != null) - new Date(a.meta.published != null) ||
		// 			new Date(b.meta.published) - new Date(a.meta.published)
		// 		);
		// 	});
		// },
		getYYYYMMDD(dob) {
			const d = new Date(dob);
			return new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0];
		},
		fetchContent() {
			this.loading = true;
			this.content(this.getContentPayload)
				.then(async (response) => {
					if (response.data.status === 'success') {
						this.can_render = response.data.data.can_render;
						return true;
					}
					this.showAlert({
						status: 'error',
						message: 'Something went wrong',
						showAlert: true
					});
				})
				.catch((error) => {
					this.showAlert({
						status: 'error',
						message: error.response.data.message,
						showAlert: true
					});
				})
				.finally(() => {
					this.loading = false;
				});
		},
		expandNotepad() {
			this.hideSearch = true;
		},
		async displaySearchItem(type, item) {
			const data = {
				type: type,
				item: item
			};
			await this.saveSearchedItem(data);
		}
	}
};

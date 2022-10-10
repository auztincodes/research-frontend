//import VNav from '../Nav.vue';
import VHeader from '@/components/Header/searchResult/Header';
import ToggleDropdown from '@/components/ToggleDropdown';
import { mapMutations, mapGetters, mapActions } from 'vuex';
import DCheckbox from '@/components/DefaultCheckbox';
import CTag from '@/components/Tag';
import DropdownCheckbox from '@/components/DropdownCheckbox';
import LoadingState from '@/components/LoadingState';

export default {
	name: 'SearchItem',
	components: {
		VHeader,
		ToggleDropdown,
		DCheckbox,
		CTag,
		DropdownCheckbox,
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
			editNote: false,
			userNote: null,
			notepadTXT: null
		};
	},
	watch: {
		hideSearch(value) {
			value ? (this.rows = 30) : (this.rows = 1);
		}
	},
	async mounted() {
		this.getFilterKeys();
		this.searchType = this.getSearchedItem.type;
		await await this.initUserBookmarks();
		await this.initUserNote(this.getSearchedResult.rowId);
	},
	computed: {
		...mapGetters({
			getNotepad: 'search_services/getNotepad',
			getSearchedItem: 'search_services/getSearchedItem',
			getSearchedResult: 'search_services/getSearchedResult'
		}),
		notepad: {
			get() {
				return this.getNotepad;
			},
			set(value) {
				this.saveNotepad(value);
			}
		},
		research: {
			get() {
				let newObj = {};
				const data = this.getSearchedResult[this.searchType];
				if (this.filterValue.length === 0) {
					for (const key in data) {
						if (Object.hasOwnProperty.call(data, key) && data[key].length !== 0) {
							const element = data[key];
							newObj[key] = element;
						}
					}
				} else {
					this.filterValue.map((value) => {
						const element = Object.keys(data).includes(value) ? data[value] : null;
						newObj[value] = element;
					});
				}
				return newObj;
			}
		}
	},
	methods: {
		...mapMutations({
			saveNotepad: 'search_services/saveNotepad',
			saveSearchedItem: 'search_services/saveSearchedItem',
			saveSearchedResult: 'search_services/saveSearchedResult',
			saveSearchPayload: 'search_services/saveSearchPayload'
		}),
		...mapActions({
			content: 'search_services/content',
			fetchResearch: 'search_services/research',
			getUserNote: 'user/getNote',
			updateUserNote: 'user/updateNote',
			addToBookmarks: 'user/addToBookmarks',
			getUserBookmarks: 'user/getBookmarks',
			removeFromBookmarks: 'user/removeFromBookmarks',
			showAlert: 'showAlert'
		}),
		async initUserBookmarks() {
			try {
				const userBookmarks = await this.getUserBookmarks(this.getSearchedResult.rowId);
				const { status, data, statusText } = userBookmarks;
				if (status === 200 && statusText === 'OK') {
					this.userBookmarks = data.response;
				}
			} catch (error) {
				console.log(error);
			} finally {
				this.loading = false;
			}
		},
		async btnAddToBookMarks(dataItem) {
			await this.addToBookmarks({
				rowId: this.getSearchedResult.rowId,
				url: dataItem.url,
				type: dataItem.type,
				description: dataItem.description,
				relevance_score: dataItem.meta.relevanceScore,
				title: dataItem.title
			});
			const searchResultClone = { ...this.getSearchedResult };
			searchResultClone[dataItem.type].others[dataItem.index].is_bookmarked = true;
			await this.saveSearchedResult(searchResultClone);
			await this.initUserBookmarks();
			this.showAlert({
				status: 'success',
				message: 'Added to bookmarks',
				showAlert: true
			});
		},
		async btnRemoveFromBookMarks(dataItem) {
			await this.removeFromBookmarks({
				url: dataItem.url
			});
			const searchResultClone = { ...this.getSearchedResult };
			searchResultClone[dataItem.type].others[dataItem.index].is_bookmarked = false;
			await this.saveSearchedResult(searchResultClone);
			await this.initUserBookmarks();
			this.showAlert({
				status: 'success',
				message: 'Removed from bookmarks',
				showAlert: true
			});
		},
		async initUserNote(rowID) {
			try {
				const userNote = await this.getUserNote(rowID);
				const { status, data, statusText } = userNote;
				if (status === 200 && statusText === 'OK') {
					if (data.data) {
						this.userNote = data.data;
						this.notepadTXT = data.data.note;
					}
				}
			} catch (error) {
				console.log(error);
			} finally {
				this.noteLoading = false;
			}
		},
		async handleTextareaBlur() {
			this.editNote = !this.editNote;
			try {
				await this.updateUserNote({
					rowId: this.getSearchedResult.rowId,
					note: this.notepadTXT
				});
				this.userNote = this.notepadTXT;
				this.showAlert({
					status: 'success',
					message: 'Note updated successfully',
					showAlert: true
				});
			} catch (error) {
				this.showAlert({
					status: 'error',
					message: 'error updating note',
					showAlert: true
				});
			}
		},

		sortByRelevance() {
			for (const key in this.research) {
				console.log(this.research);
				const element = this.research[key];
				return element.sort((a, b) => (a.meta.relevanceScore < b.meta.relevanceScore ? 1 : -1));
			}
		},
		sortByRecent() {
			for (const key in this.research) {
				console.log(this.research);
				const element = this.research[key];
				return element.sort((a, b) => {
					return (
						new Date(b.meta.published != null) - new Date(a.meta.published != null) ||
						new Date(b.meta.published) - new Date(a.meta.published)
					);
				});
			}
		},
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
		},
		getFilterKeys() {
			this.filterValue = [];
			for (const key in this.getSearchedResult[this.searchType]) {
				this.filterValue.push(key);
			}
		}
	}
};

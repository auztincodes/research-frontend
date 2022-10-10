import ToggleDropdown from '@/components/ToggleDropdown';
import DropdownCheckbox from '@/components/DropdownCheckbox';
import VHeader from '@/components/Header/searchResult/Header';
import { mapMutations, mapGetters, mapActions } from 'vuex';
import DCheckbox from '@/components/DefaultCheckbox';
import ScreenWidthMixin from '@/mixins/screen-width';
import DotLoader from '@/components/DotLoader.vue';
import PageLoad from '../SearchResult/PageLoad.vue';
export default {
	name: 'Bookmarks',
	components: {
		ToggleDropdown,
		DCheckbox,
		DropdownCheckbox,
		DotLoader,
		PageLoad,
		VHeader
	},
	mixins: [ScreenWidthMixin],
	data() {
		return {
			loadMore: false,
			bookmarkLoading: true,
			userBookmarks: null
		};
	},
	async created() {
		await this.initUserBookmarks();
	},
	watch: {
		'$route.query.rowId'() {
			this.initUserBookmarks();
		}
	},
	computed: {
		...mapGetters({
			getSearchedResult: 'search_services/getSearchedResult'
		}),
		screenType: {
			get() {
				if (this.screenWidth > 796) {
					this.searchType = '';
					return 'large';
				} else {
					return 'small';
				}
			}
		},
		allBookMarks() {
			let result = {
				contact_research: '',
				company_research: ''
			};

			if (this.userBookmarks) {
				const { company_research, contact_research } = this.userBookmarks;
				if (company_research && company_research.length) {
					const { type } = company_research[0];
					result[type] = { ...company_research };
				}

				if (contact_research && contact_research.length) {
					const { type } = contact_research[0];
					result[type] = { ...contact_research };
				}
			}
			return result;
		},
		contactResearch() {
			let result = {};
			if (this.userBookmarks) {
				const { contact_research } = this.userBookmarks;
				if (contact_research && contact_research.length) {
					result = { ...contact_research };
				}
			}
			return result;
		},
		companyResearch() {
			let result = {};
			if (this.userBookmarks) {
				const { company_research } = this.userBookmarks;
				if (company_research && company_research.length) {
					result = { ...company_research };
				}
			}
			return result;
		}
	},
	methods: {
		...mapMutations({
			saveSearchedResult: 'search_services/saveSearchedResult',
			saveSearchedItem: 'search_services/saveSearchedItem'
		}),
		...mapActions({
			getUserBookmarks: 'user/getBookmarks',
			showAlert: 'showAlert',
			removeFromBookmarks: 'user/removeFromBookmarks'
		}),
		displaySearchItem(type, item) {
			const data = {
				type: type,
				item: item
			};
			this.saveSearchedItem(data);
			this.$router.push({ name: 'InsightItem' });
		},
		async initUserBookmarks() {
			this.bookmarkLoading = true;
			try {
				const userBookmarks = await this.getUserBookmarks(this.$route.query.rowId);
				const { status, data, statusText } = userBookmarks;
				if (status === 200 && statusText === 'OK') {
					this.userBookmarks = data.response;
				}
			} catch (error) {
				console.log(error);
			} finally {
				this.bookmarkLoading = false;
			}
		},
		async btnRemoveFromBookMarks(dataItem) {
			await this.removeFromBookmarks({
				url: dataItem.url
			});
			await this.initUserBookmarks();
			this.showAlert({
				status: 'success',
				message: 'Removed from bookmarks',
				showAlert: true
			});
		}
	}
};

import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import SearchResult from '../../../src/views/SearchResult/SearchResult.vue';
import flushPromises from 'flush-promises';

import VueRouter from 'vue-router';
const localVue = createLocalVue();

localVue.use(VueRouter);
localVue.use(Vuex);
let researchResponse = {
	status: 200,
	statusText: 'OK',
	data: {
		data: {
			research_score: 0.6954999999999999,
			socials: [{ twitter: {} }],
			_id: '1',
			company: 'Volley',
			email: 'dayo@enyata.com',
			company_meta: {},
			contact_meta: {},
			full_name: 'Ian Carnevale',
			linkedin: 'https://www.linkedin.com/in/oladayo',
			role: 'CEO',
			url: 'https://enyata.com',
			rowId: '1',
			batchId: '1',
			userId: '1',
			status: { statusCode: 'DONE', message: 'Done' },
			__v: 0,
			createdAt: '2021-04-22T20:17:50.272Z',
			updatedAt: '2021-06-21T14:21:40.293Z',
			company_research: {
				others: [
					{
						title: 'Volley: Home',
						url: 'https://volleythat.com/',
						description: 'Volley',
						tags: ['website'],
						dontRender: null,
						meta: {
							timestamp: '2021-06-21T14:21:35.384Z',
							published: null,
							resourceType: 'website',
							host: 'volleythat.com',
							html: {
								snippet: '<b>Volley</b>',
								title: '<b>Volley</b>: Home',
								url: 'https://<b>volley</b>that.com/'
							},
							content: { html: '<div></div>', tag: ['San Francisco'], date: null },
							relevanceScore: 0.6954999999999999
						},
						content: null,
						is_bookmarked: false
					}
				]
			},
			contact_research: {
				others: [
					{
						title: 'Volley: Home',
						url: 'https://volleythat.com/',
						description: 'Volley',
						tags: ['website'],
						dontRender: null,
						meta: {
							timestamp: '2021-06-21T14:21:35.384Z',
							published: null,
							resourceType: 'website',
							host: 'volleythat.com',
							html: {
								snippet: '<b>Volley</b>',
								title: '<b>Volley</b>: Home',
								url: 'https://<b>volley</b>that.com/'
							},
							content: { html: '<div></div>', tag: ['San Francisco'], date: null },
							relevanceScore: 0.6954999999999999
						},
						content: null,
						is_bookmarked: false
					}
				]
			}
		}
	}
};
let researchDoneRes = {
	status: 200,
	statusText: 'OK',
	data: {
		message: 'success'
	}
};
let bookmarks = {
	status: 200,
	data: {
		response: {
			company_research: [
				{
					createdAt: '2021-05-14T10:33:11.606Z',
					description: 'AMZN',
					relevance_score: 0.41000000000000003,
					rowId: '3d9d0ec5-2e1b-4ab0-b7fb-0995940a08f2',
					title: 'AMZN Stock Price',
					type: 'company_research',
					updatedAt: '2021-05-14T10:33:11.606Z',
					url: 'https://www.marketwatch.com/investing/stock/amzn',
					userId: '607ea1bf965bbe6414c00b13',
					__v: 0,
					_id: '609e51e7487a4982cfcb045a'
				}
			],
			contact_research: [
				{
					createdAt: '2021-05-14T10:33:11.606Z',
					description: 'AMZN',
					relevance_score: 0.41000000000000003,
					rowId: '3d9d0ec5-2e1b-4ab0-b7fb-0995940a08f2',
					title: 'AMZN Stock Price',
					type: 'company_research',
					updatedAt: '2021-05-14T10:33:11.606Z',
					url: 'https://www.marketwatch.com/investing/stock/amzn',
					userId: '607ea1bf965bbe6414c00b13',
					__v: 0,
					_id: '609e51e7487a4982cfcb045a'
				}
			]
		}
	},
	statusText: 'OK'
};
let notebookResponse = {
	statusText: 'OK',
	status: 200,
	data: {
		data: {
			note: 'Hello',
			rowId: '1'
		}
	}
};
let err = {
	response: {
		data: {
			message: 'error'
		}
	}
};
describe('SearchResult', () => {
	let store;
	let actions;
	const router = new VueRouter({
		routes: [
			{ path: '/login', name: 'Login' },
			{ path: '/search-result', name: 'searchResult', query: { rowId: '1' } }
		]
	});
	const noQueryRoute = new VueRouter({
		routes: [
			{ path: '/search-result', name: 'searchResult' },
			{ path: '/', name: 'Search' }
		]
	});
	const searchRoute = new VueRouter({ routes: [{ path: '/search-item', name: 'SearchItem' }] });
	beforeEach(() => {
		actions = {
			showAlert: jest.fn(),
			getUserBookmarks: jest.fn().mockReturnValue(bookmarks),
			getUserNote: jest.fn().mockReturnValue(notebookResponse),
			updateUserNote: jest.fn(),
			addToBookmarks: jest.fn(),
			removeFromBookmarks: jest.fn()
		};
		store = new Vuex.Store({
			modules: {
				auth: {
					namespaced: true,
					getters: {
						getLoggedUser: () => ({
							id: '1',
							email: 'abass@enyata.com',
							token: '123',
							is_settings: true,
							role: 'admin'
						})
					},
					mutations: {
						logout: jest.fn()
					}
				},
				user: {
					namespaced: true,
					actions
				},
				search_services: {
					namespaced: true,
					getters: {
						getSearchedResult: () => researchResponse.data.data
					},
					mutations: {
						saveSearchedResult: jest.fn(),
						saveSearchedItem: jest.fn()
					},
					actions: {
						research: jest.fn().mockResolvedValue(researchResponse),
						researchedResult: jest.fn().mockResolvedValue(researchResponse),
						researchDone: jest.fn().mockResolvedValue(researchDoneRes)
					}
				}
			},
			actions: {
				showAlert: jest.fn()
			}
		});
	});

	it('Render without errors', () => {
		const wrapper = shallowMount(SearchResult, {
			localVue,
			router,
			store
		});
		expect(wrapper.vm).toBeTruthy();
	});

	it('routes to search page', async () => {
		const wrapper = shallowMount(SearchResult, {
			localVue,
			store,
			router: noQueryRoute
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$route.name).toBe('Search');
	});
	it('should call initUserBookmarks', async () => {
		store.dispatch = jest.fn().mockResolvedValue(bookmarks);
		const wrapper = shallowMount(SearchResult, {
			localVue,
			router,
			store
		});
		expect(wrapper.vm.initUserBookmarks());
		await flushPromises();
		expect(store.dispatch).toHaveBeenCalledWith('user/getBookmarks', '1');
	});
	it('should call initUserNote', async () => {
		store.dispatch = jest.fn().mockResolvedValue(notebookResponse);
		const wrapper = shallowMount(SearchResult, {
			localVue,
			router,
			store
		});
		expect(wrapper.vm.initUserNote());
		await flushPromises();
		expect(store.dispatch).toHaveBeenCalledWith('user/getNote', '1');
	});
	it('should call markResearch', async () => {
		store.dispatch = jest.fn().mockResolvedValue(researchDoneRes);
		const wrapper = shallowMount(SearchResult, {
			localVue,
			router,
			store
		});
		expect(wrapper.vm.markResearch());
		await flushPromises();
		expect(store.dispatch).toHaveBeenCalledWith('search_services/researchDone', '1');
		await flushPromises();
	});
	it('should throw an error when markResearch is called', async () => {
		store.dispatch = jest.fn().mockRejectedValue(err);
		const wrapper = shallowMount(SearchResult, {
			localVue,
			router,
			store
		});
		expect(wrapper.vm.markResearch());
		await flushPromises();
	});
	it('should call getResult', async () => {
		store.dispatch = jest.fn().mockResolvedValue(researchResponse);
		const wrapper = shallowMount(SearchResult, {
			localVue,
			router,
			store
		});
		expect(wrapper.vm.getResult());
		await flushPromises();
	});
	it(' throw an error when getResult is called', async () => {
		store.dispatch = jest.fn().mockRejectedValue(err);
		const wrapper = shallowMount(SearchResult, {
			localVue,
			router,
			store
		});
		expect(wrapper.vm.getResult());
		await flushPromises();
	});

	it('should sort relevance by contact_research', async () => {
		const wrapper = shallowMount(SearchResult, {
			localVue,
			router,
			store,
			data() {
				return {
					contact_research: researchResponse.data.data.contact_research
				};
			}
		});
		expect(wrapper.vm.sortByRelevance('contact_research'));
	});
	it('should sort relevance by company_research', async () => {
		const wrapper = shallowMount(SearchResult, {
			localVue,
			router,
			store,
			data() {
				return {
					company_research: researchResponse.data.data.company_research
				};
			}
		});
		expect(wrapper.vm.sortByRelevance('company_research'));
	});
	it('should sort sortByRecent by company_research', async () => {
		const wrapper = shallowMount(SearchResult, {
			localVue,
			router,
			store,
			data() {
				return {
					company_research: researchResponse.data.data.company_research
				};
			}
		});
		expect(wrapper.vm.sortByRecent('company_research'));
	});
	it('should sort sortByRecent by contact_research', async () => {
		const wrapper = shallowMount(SearchResult, {
			localVue,
			router,
			store,
			data() {
				return {
					contact_research: researchResponse.data.data.contact_research
				};
			}
		});
		expect(wrapper.vm.sortByRecent('contact_research'));
	});
	it('calls displaySearchItem method', async () => {
		const wrapper = shallowMount(SearchResult, {
			store,
			localVue,
			router: searchRoute
		});
		expect(wrapper.vm.displaySearchItem());
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$route.name).toBe('SearchItem');
	});
	it('calls validateURL method', async () => {
		const wrapper = shallowMount(SearchResult, {
			store,
			localVue,
			router
		});
		expect(wrapper.vm.validateURL('https://js.com'));
	});
	it('adds https on link when validateURL is called', async () => {
		const wrapper = shallowMount(SearchResult, {
			store,
			localVue,
			router
		});
		expect(wrapper.vm.validateURL('js.com'));
	});
	it('should call btnAddToBookMarks', async () => {
		const wrapper = shallowMount(SearchResult, {
			localVue,
			router,
			store
		});
		wrapper.find('.url__bookmark__group').trigger('click');
		expect(actions.addToBookmarks).toHaveBeenCalled();
	});
	it('should call btnRemoveFromBookMarks', async () => {
		const wrapper = shallowMount(SearchResult, {
			localVue,
			router,
			store
		});
		wrapper.find('.url__bookmark__group').trigger('click');
		expect(actions.removeFromBookmarks).toHaveBeenCalled();
	});
	it('should call handleTextareaBlur', async () => {
		const wrapper = shallowMount(SearchResult, {
			localVue,
			router,
			store,
			data() {
				return {
					editNote: true
				};
			}
		});
		await wrapper.vm.handleTextareaBlur();
	});

	it('should throw an error when handleTextareaBlur is called', async () => {
		store.dispatch = jest.fn().mockRejectedValue(err);
		const wrapper = shallowMount(SearchResult, {
			localVue,
			router,
			store,
			data() {
				return {
					editNote: true
				};
			}
		});
		await wrapper.vm.handleTextareaBlur();
	});
});

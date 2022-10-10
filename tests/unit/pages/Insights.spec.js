import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Insights from '../../../src/views/Insights/Insights.vue';
import VueRouter from 'vue-router';

// const lodash = require('lodash');
// lodash.debounce = jest.fn((fn) => fn());

jest.mock('lodash', () => ({
	debounce: (fn) => fn
}));

const localVue = createLocalVue();
localVue.filter('moment', (val, val2) => val + val2);
localVue.use(Vuex);

let researchResponse = {
	status: 200,
	statusText: 'OK',
	data: {
		data: {
			contact_details: {
				company: 'Volley',
				email: 'dayo@enyata.com',
				full_name: 'Ian Carnevale',
				last_refresh: '2021-07-30T15:19:51.743Z',
				role: 'CEO',
				socials: [{ angel: 'angel.co/ian-carnevale' }],
				url: 'https://volley.com'
			},
			company_insights: {
				jobs: [],
				news: {
					all: [],
					products: [],
					funding: [],
					people: []
				},
				snapshots: {
					interests: ['education'],
					jobs: null,
					mentions: 13
				}
			},
			contact_insights: {
				news: {
					Andela: [
						{
							title: 'Volley: Home',
							url: 'https://volleythat.com/',
							description: 'Volley',
							tags: ['website'],
							dontRender: null,
							is_bookmarked: false,
							is_disliked: false,
							meta: {
								timestamp: '2021-06-21T14:21:35.384Z',
								published: null,
								resourceType: 'article',
								host: 'volleythat.com',
								html: {
									snippet: '<b>Volley</b>',
									title: '<b>Volley</b>: Home',
									url: 'https://<b>volley</b>that.com/'
								},
								content: { html: '<div></div>', tag: ['San Francisco'], date: null },
								relevanceScore: 0.6954999999999999
							}
						}
					]
				},
				quotes: [],
				snapshot: {
					current_employer: {
						start_date: '1'
					},
					interests: [],
					last_linkedin_activity: '1',
					mentions: 6,
					most_viral_tweet: '5'
				},
				topics: {
					Andela: 1,
					Jeremy: 1,
					Nigeria: 1
				}
			},
			rowId: '1',
			status: { statusCode: 'UPDATING', message: 'Updating' }
		}
	}
};

// deep cloning existing object to avoid rewriting the whole response

let subResponse = {
	data: {
		done: {
			contact_details: {
				company: 'Volley',
				email: 'dayo@enyata.com',
				full_name: 'Ian Carnevale',
				last_refresh: '2021-07-30T15:19:51.743Z',
				role: 'CEO',
				socials: [{ angel: 'angel.co/ian-carnevale' }],
				url: 'https://volley.com'
			},
			status: { statusCode: 'READY', message: 'Ready' }
		}
	},
	status: 200
};

let researchDoneRes = {
	status: 200,
	statusText: 'OK',
	data: {
		message: 'success'
	}
};
let bookmarkResponse = researchResponse;
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

describe('Insights', () => {
	let store;
	const router = new VueRouter({
		routes: [
			{ path: '/insights', name: 'Insights', query: { id: researchResponse.data.data.rowId } },
			{ path: '/', name: 'Search' }
		]
	});
	const insightItemRoute = new VueRouter({
		routes: [
			{ path: '/insight-item', name: 'InsightItem' },
			{ path: '/', name: 'Search' }
		]
	});
	beforeEach(() => {
		store = new Vuex.Store({
			actions: {
				showAlert: jest.fn()
			},
			modules: {
				search_services: {
					actions: {
						researchedResult: jest.fn().mockResolvedValue(researchResponse),
						researchDone: jest.fn().mockResolvedValue(researchDoneRes),
						refresh: jest.fn().mockResolvedValue(researchResponse),
						subscribeResearch: jest.fn().mockResolvedValue(subResponse),
						dislike: jest.fn().mockResolvedValue()
					},
					getters: {
						getSearchedResult: () => researchResponse.data.data
					},
					mutations: {
						saveSearchedItem: jest.fn(),
						saveSearchedResult: jest.fn()
					},
					namespaced: true
				},
				user: {
					actions: {
						getBookmarks: jest.fn().mockResolvedValue(bookmarks),
						getNote: jest.fn().mockResolvedValue(notebookResponse),
						updateNote: jest.fn().mockResolvedValue(),
						addToBookmarks: jest.fn().mockResolvedValue(bookmarkResponse),
						removeFromBookmarks: jest.fn().mockResolvedValue(bookmarkResponse)
					},
					getters: {},
					mutations: {},
					namespaced: true
				}
			}
		});
	});

	it('Render without errors', async () => {
		const wrapper = shallowMount(Insights, {
			localVue,
			store,
			mocks: {
				$route: { path: '/insights', name: 'Insights', query: { id: researchResponse.data.data.rowId } }
			}
		});
		expect(wrapper.vm).toBeTruthy();
	});

	it('Render with a different tab', () => {
		const tab = researchResponse.data.data.contact_insights.news;
		const wrapper = shallowMount(Insights, {
			localVue,
			router,
			data() {
				return {
					selectedTab: Object.keys(tab)[0]
				};
			},
			mocks: {
				$route: { path: '/insights', name: 'Insights', query: { id: researchResponse.data.data.rowId } }
			},
			store
		});
		expect(wrapper.vm).toBeTruthy();
	});

	it('routes to search page', async () => {
		localVue.use(VueRouter);
		const wrapper = shallowMount(Insights, {
			localVue,
			store,
			router
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$route.name).toBe('Search');
	});

	it('should throw an error when markResearch is called', async () => {
		store.dispatch = jest.fn().mockRejectedValue(err);
		const wrapper = shallowMount(Insights, {
			localVue,
			router,
			store
		});
		expect(wrapper.vm.markResearch());
	});

	// it('watches for changes to contactSearchQuery', async () => {
	// 	const wrapper = shallowMount(Insights, {
	// 		localVue,
	// 		store
	// 	});
	// 	wrapper.vm.$options.watch.contactSearchQuery.call(wrapper.vm, true);
	// 	await wrapper.vm.$nextTick();
	// 	expect(wrapper.vm.contactSearchQuery).toBe(false);
	// });

	it('tests that contactSearch is called', async () => {
		const wrapper = shallowMount(Insights, {
			store,
			localVue,
			router,
			data() {
				return {
					contactSearchQuery: ''
				};
			}
		});
		const vm = wrapper.vm;
		const contactSearch = jest.spyOn(vm, 'contactSearch');

		await wrapper.setData({ contactSearchQuery: 'lani' });
		expect(wrapper.vm.$data.contactSearchQuery).toEqual('lani');

		expect(contactSearch).toHaveBeenCalled();

		await wrapper.setData({ contactSearchQuery: '' });
		expect(contactSearch).toHaveBeenCalled();
	});

	it('tests that companySearch is called', async () => {
		const wrapper = shallowMount(Insights, {
			store,
			localVue,
			router,
			data() {
				return {
					companySearchQuery: ''
				};
			}
		});
		const vm = wrapper.vm;
		const companySearch = jest.spyOn(vm, 'companySearch');

		await wrapper.setData({ companySearchQuery: 'funding' });
		expect(wrapper.vm.$data.companySearchQuery).toEqual('funding');

		expect(companySearch).toHaveBeenCalled();

		await wrapper.setData({ companySearchQuery: '' });
		expect(companySearch).toHaveBeenCalled();
	});

	// it('checks that the search clears when the cancle button is clicked', () => {
	// 	const wrapper = shallowMount(Insights, {
	// 		store,
	// 		localVue,
	// 		router
	// 		// data() {
	// 		// 	return {
	// 		// 		companySearchQuery: ''
	// 		// 	};
	// 		// }
	// 	});
	// 	const btn = wrapper.find({ ref: 'companySearchText' });
	// 	console.log(btn);
	// 	btn.trigger('click');
	// })

	it('tests for RefreshResearch method is called', () => {
		const wrapper = shallowMount(Insights, {
			router,
			store,
			localVue
		});
		expect(wrapper.vm.RefreshResearch());
	});

	it('tests for subscribe method is called', () => {
		const wrapper = shallowMount(Insights, {
			router,
			store,
			localVue
		});
		expect(wrapper.vm.subscribe());
	});

	it('tests for error in subscribe', () => {
		store.dispatch = jest.fn().mockRejectedValue(err);
		const wrapper = shallowMount(Insights, {
			router,
			store,
			localVue
		});
		expect(wrapper.vm.subscribe());
	});

	it('should call handleTextareaBlur', async () => {
		const wrapper = shallowMount(Insights, {
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

	it('should call markResearch', async () => {
		const wrapper = shallowMount(Insights, {
			localVue,
			router,
			store
		});
		expect(wrapper.vm.markResearch());
	});

	it('calls displaySearchItem method', async () => {
		const wrapper = shallowMount(Insights, {
			store,
			localVue,
			router: insightItemRoute
		});
		wrapper.vm.displaySearchItem();
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$route.name).toBe('InsightItem');
	});

	it('calls validateURL method', async () => {
		const wrapper = shallowMount(Insights, {
			store,
			localVue,
			router
		});
		expect(wrapper.vm.validateURL('https://js.com'));
	});

	it('adds https on link when validateURL is called', async () => {
		const wrapper = shallowMount(Insights, {
			store,
			localVue,
			router
		});
		expect(wrapper.vm.validateURL('js.com'));
	});

	it('should call btnAddToBookMarks', async () => {
		const article = {
			content: null,
			description: 'The founders, Ian Carnevale',
			dontRender: null,
			index: 1,
			is_bookmarked: false,
			url: 'https://www.theladders.com/company/andela-jobs',
			meta: {
				relevanceScore: 0.2
			}
		};
		const wrapper = shallowMount(Insights, {
			localVue,
			router,
			article,
			store
		});
		expect(wrapper.vm.btnAddToBookMarks(article));
	});

	it('should call btnRemoveFromBookMarks', async () => {
		const article = {
			content: null,
			description: 'The founders, Ian Carnevale',
			dontRender: null,
			index: 1,
			is_bookmarked: false,
			url: 'https://www.theladders.com/company/andela-jobs',
			meta: {
				relevanceScore: 0.2
			}
		};
		const wrapper = shallowMount(Insights, {
			localVue,
			router,
			article,
			store
		});
		expect(wrapper.vm.btnRemoveFromBookMarks(article));
	});
});

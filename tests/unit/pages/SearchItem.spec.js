import { shallowMount, createLocalVue } from '@vue/test-utils';
import SearchItem from '../../../src/views/SearchItem/SearchItem.vue';
import Vuex from 'vuex';
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
describe('SearchItem', () => {
	let store;
	const searcheItem = {
		item: researchResponse.data.data.contact_research.others[0],
		type: 'contact_research'
	};
	const router = new VueRouter({ routes: [{ path: '/search-item', name: 'SearchItem' }] });
	beforeEach(() => {
		store = new Vuex.Store({
			modules: {
				search_services: {
					namespaced: true,
					getters: {
						getSearchedResult: () => researchResponse.data.data,
						getSearchedItem: () => searcheItem,
						getNotePad: () => 'note'
					},
					mutations: {
						saveSearchedResult: jest.fn(),
						saveSearchedItem: jest.fn(),
						saveNotepad: jest.fn()
					},
					actions: {
						content: jest.fn(),
						research: jest.fn()
					}
				},
				user: {
					namespaced: true,
					actions: {
						getUserBookmarks: jest.fn().mockReturnValue(bookmarks),
						getUserNote: jest.fn().mockReturnValue(notebookResponse),
						updateUserNote: jest.fn(),
						addToBookmarks: jest.fn(),
						removeFromBookmarks: jest.fn()
					}
				}
			},
			actions: {
				showAlert: jest.fn()
			}
		});
	});

	it('Render without errors', () => {
		const wrapper = shallowMount(SearchItem, {
			localVue,
			router,
			store
		});
		expect(wrapper.vm).toBeTruthy();
	});
});

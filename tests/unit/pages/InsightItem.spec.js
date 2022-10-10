import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import InsightItem from '../../../src/views/InsightItem/InsightItem.vue';

// import VueRouter from 'vue-router';
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
// let err = {
// 	response: {
// 		data: {
// 			message: 'error'
// 		}
// 	}
// };

let getSearchedItem = {
	type: 'contact_insights',
	item: {
		content: null,
		description:
			'Before she was BadGalRiRi: music, fashion and beauty icon, Robyn Rihanna Fenty was a little girl in Barbados transfixed by her mothers lipstick.',
		dontRender: null,
		is_bookmarked: true,
		is_disliked: false,
		title: 'About Fenty Beauty',
		url: 'https://fentybeauty.com/pages/about-fenty-beauty'
	}
};

describe('InsightItem', () => {
	let store;
	// const router = new VueRouter({
	// 	routes: [
	// 		{ path: '/insights', name: 'Insights', query: { rowId: researchResponse.data.data.rowId } },
	// 		{ path: '/', name: 'Search' }
	// 	]
	// });
	// const insightItemRoute = new VueRouter({
	// 	routes: [
	// 		{ path: '/insight-item', name: 'InsightItem' },
	// 		{ path: '/', name: 'Search' }
	// 	]
	// });
	beforeEach(() => {
		store = new Vuex.Store({
			actions: {
				showAlert: jest.fn()
			},
			modules: {
				search_services: {
					actions: {
						dislike: jest.fn().mockResolvedValue(),
						content: jest.fn().mockResolvedValue(),
						research: jest.fn().mockResolvedValue()
					},
					getters: {
						getSearchedResult: () => researchResponse.data.data,
						// getNotepad: () => response,
						getSearchedItem: () => getSearchedItem
					},
					mutations: {
						saveSearchedItem: jest.fn(),
						saveSearchedResult: jest.fn(),
						saveNotepad: jest.fn(),
						saveSearchPayload: jest.fn()
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
		const wrapper = shallowMount(InsightItem, {
			localVue,
			store,
			router
			// mocks: {
			// 	$route: { path: '/insights', name: 'Insights', query: { rowId: researchResponse.data.data.rowId } }
			// }
		});
		expect(wrapper.vm).toBeTruthy();
	});
});

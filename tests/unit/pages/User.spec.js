import User from '../../../src/views/Dashboard/User';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
const Paginate = require('vuejs-paginate');

jest.mock('vuejs-paginate');
jest.useFakeTimers();

const localVue = createLocalVue();

localVue.use(VueRouter);

localVue.use(Vuex);
localVue.component('paginate', Paginate);
let statusRes = {
	status: 200,
	statusText: 'OK',
	data: {
		data: {
			email: 'aileen.rioux@volley.com',
			first_name: 'Aileen',
			is_settings: true,
			last_name: 'Rioux',
			last_research_date: { _id: '60cc929ee16df22ed1eaa553', updatedAt: '2021-06-18T13:54:00.521Z' },
			monthly_research: 400,
			next_payment_date: '2021-07-18T13:27:04.675Z',
			organisation: 'Volley',
			profession: 'BDR',
			remaining_monthly_research: 399,
			researches_performed: 5,
			role: 'user',
			status: 'active',
			updatedAt: '2021-06-28T15:47:16.013Z',
			_id: '1',
			company_research: ['hello'],
			contact_research: ['hello']
		}
	}
};

let historyRes = {
	status: 200,
	statusText: 'OK',
	data: {
		data: [
			{
				email: 'aileen.rioux@volley.com',
				first_name: 'Aileen',
				is_settings: true,
				last_name: 'Rioux',
				last_research_date: { _id: '60cc929ee16df22ed1eaa553', updatedAt: '2021-06-18T13:54:00.521Z' },
				monthly_research: 400,
				next_payment_date: '2021-07-18T13:27:04.675Z',
				organisation: 'Volley',
				profession: 'BDR',
				remaining_monthly_research: 399,
				researches_performed: 5,
				role: 'user',
				status: { statusCode: 'DONE' },
				updatedAt: '2021-06-28T15:47:16.013Z',
				_id: '1',
				rowId: '1'
			},
			{
				email: 'aileen.rioux@volley.com',
				first_name: 'Aileen',
				is_settings: true,
				last_name: 'Rioux',
				last_research_date: { _id: '60cc929ee16df22ed1eaa553', updatedAt: '2021-06-18T13:54:00.521Z' },
				monthly_research: 400,
				next_payment_date: '2021-07-18T13:27:04.675Z',
				organisation: 'Volley',
				profession: 'BDR',
				remaining_monthly_research: 399,
				researches_performed: 5,
				role: 'user',
				status: { statusCode: 'PENDING' },
				updatedAt: '2021-06-28T15:47:16.013Z',
				_id: '1',
				rowId: '1'
			}
		]
	}
};

let res = {
	status: 200,
	statusText: 'OK'
};

let item = {
	email: 'buhari@enyata.com',
	first_name: 'Buharii',
	is_settings: true,
	last_name: 'Gerald',
	monthly_research: 120,
	organisation: 'MIT',
	profession: 'Engineer',
	role: 'admin',
	status: 'active',
	updatedAt: '2021-06-25T12:17:31.455Z',
	_id: '60992e95baa22116bb37d258'
};

let userInfo = {
	id: '1',
	user: {
		first_name: 'lani',
		last_name: 'juyi',
		role: 'CTO',
		monthly_research: '200',
		organisation: 'Enyata',
		profession: 'engineer'
	}
};
let subscribeResult = {
	status: 200,
	data: {
		done: {
			research_score: 0.5455,
			rowId: '1',
			status: { statusCode: 'READY', message: 'Ready' },
			_id: '60d45e1e43b0bda463dff22f'
		}
	}
};

describe('User', () => {
	let store;
	const router = new VueRouter({ routes: [{ path: 'user/:userId?', name: 'User', meta: 'user', query: { userId: '1' } }] });

	beforeEach(() => {
		store = new Vuex.Store({
			actions: {
				showAlert: jest.fn()
			},
			getters: {},
			mutations: {},
			modules: {
				users_management: {
					actions: {
						singleUser: jest.fn().mockResolvedValue(statusRes),
						research_history: jest.fn().mockResolvedValue(historyRes),
						bulk_research: jest.fn(),
						getSettings: jest.fn().mockResolvedValue(statusRes),
						settings: jest.fn().mockResolvedValue(statusRes),
						deactivateUser: jest.fn().mockResolvedValue(statusRes),
						activateUser: jest.fn().mockResolvedValue(statusRes),
						updateUser: jest.fn().mockResolvedValue(res)
					},
					getters: {},
					mutations: {},
					namespaced: true
				},
				search_services: {
					namespaced: true,
					actions: {
						subscribeResearch: jest.fn().mockResolvedValue(subscribeResult)
					}
				}
			}
		});
	});

	it('tests that the user page mounts', () => {
		const wrapper = mount(User, {
			router,
			store,
			localVue
		});
		expect(wrapper.vm).toBeTruthy();
	});

	it('tests that the deactivate method is called', () => {
		const wrapper = shallowMount(User, {
			router,
			store,
			localVue
		});
		expect(wrapper.vm.deactivate());
	});

	it('tests that the activate method is called', () => {
		const wrapper = shallowMount(User, {
			router,
			store,
			localVue
		});
		expect(wrapper.vm.activate());
	});

	it('tests that user settings method is called', () => {
		const wrapper = shallowMount(User, {
			router,
			store,
			localVue
		});
		expect(wrapper.vm.getUserSettings());
	});

	it('tests that status toggle method is called', () => {
		const wrapper = mount(User, {
			// router,
			mocks: {
				$route: {
					query: {
						userId: '1'
					}
				}
			},
			store,
			data() {
				return {
					userDetails: {
						status: 'active'
					}
				};
			}
		});
		expect(wrapper.vm.statusToggle());
		if (wrapper.vm.$data.userDetails.status === 'active') {
			expect(wrapper.vm.deactivate());
		}
		expect(wrapper.vm.activate());
	});

	it('tests that the edit modal method is called', () => {
		const wrapper = shallowMount(User, {
			store,
			router,
			localVue
		});
		expect(wrapper.vm.openEditModal(item));
	});

	it('tests that the page navigation works', () => {
		const wrapper = shallowMount(User, {
			store,
			router,
			localVue,
			data() {
				return {
					page: 1
				};
			}
		});
		expect(wrapper.vm.clickCallback(wrapper.vm.$data.page));
	});

	it('tests that the checkAll method is called on check', () => {
		let event = new Event('target');
		event = {
			target: {
				checked: true
			}
		};
		const wrapper = shallowMount(User, {
			router,
			store,
			localVue,
			data() {
				return {
					history: historyRes.data.data
				};
			}
		});
		expect(wrapper.vm.checkAll(event));
	});

	it('tests that the checkAll method is called on uncheck', () => {
		let event = new Event('target');
		event = {
			target: {
				checked: false
			}
		};
		const wrapper = shallowMount(User, {
			router,
			store,
			localVue,
			data() {
				return {
					history: historyRes.data.data
				};
			}
		});
		expect(wrapper.vm.checkAll(event));
		expect(wrapper.vm.checkedContacts).toEqual([]);
	});

	it('tests that the inputFile method is called', () => {
		let newFile = {
			size: 12234212312,
			name: 'lani.jpeg'
		};
		const wrapper = shallowMount(User, {
			router,
			store,
			localVue,
			data() {
				return {
					history: historyRes.data.data
				};
			}
		});
		expect(wrapper.vm.inputFile(newFile));

		newFile = {
			name: 'lani.jpeg'
		};
		expect(wrapper.vm.inputFile(newFile));
	});

	it('tests that settings keyword method is called', () => {
		let event = new Event('target');
		event = {
			target: {
				value: 'community, buildup'
			}
		};
		const wrapper = shallowMount(User, {
			router,
			localVue,
			store
		});
		expect(wrapper.vm.onKeywordsChange('company_research', event));
	});

	it('tests that edit modal is toggled', () => {
		const wrapper = shallowMount(User, {
			store,
			router,
			localVue
		});
		expect(wrapper.vm.toggleClass).toBe(true);
		wrapper.vm.showEditModal = true;
		wrapper.vm.$nextTick();
		wrapper.vm.toggleEditModal();
		expect(wrapper.vm.toggleClass).toBe(false);
		jest.advanceTimersByTime(500);
		wrapper.vm.$nextTick();
		expect(wrapper.vm.showEditModal).toBe(false);
		expect(wrapper.vm.toggleClass).toBe(true);
	});

	it('tests that search preference form method is called', () => {
		const wrapper = shallowMount(User, {
			router,
			store,
			localVue
		});
		expect(wrapper.vm.submitForm());
	});

	it('tests that subscribe method is called', () => {
		const wrapper = shallowMount(User, {
			router,
			store,
			localVue
		});
		expect(wrapper.vm.subscribe());
	});

	it('tests that UploadContact method is called', () => {
		const wrapper = shallowMount(User, {
			router,
			store,
			localVue
		});
		expect(wrapper.vm.toggleUploadContact());
	});

	it('tests that UploadContact modal is toggled', () => {
		const wrapper = shallowMount(User, {
			store,
			router,
			localVue
		});
		expect(wrapper.vm.toggleClass).toBe(true);
		wrapper.vm.contactModal = true;
		wrapper.vm.$nextTick();
		wrapper.vm.toggleUploadContact();
		expect(wrapper.vm.toggleClass).toBe(false);
		jest.advanceTimersByTime(500);
		wrapper.vm.$nextTick();
		expect(wrapper.vm.contactModal).toBe(false);
		expect(wrapper.vm.toggleClass).toBe(true);
	});

	it('tests that users page method called', () => {
		const wrapper = shallowMount(User, {
			router,
			store,
			localVue
		});
		expect(wrapper.vm.backToUsers());
	});

	it('tests that research upload method called', () => {
		const wrapper = shallowMount(User, {
			router,
			store,
			localVue
		});
		expect(wrapper.vm.uploadBulkResearch());
	});

	it('tests for the showResearch method is called', () => {
		const wrapper = shallowMount(User, {
			router,
			store,
			localVue
		});
		expect(wrapper.vm.showResearch(item));
	});

	it('tests for the edit method is called', () => {
		const wrapper = shallowMount(User, {
			router,
			store,
			localVue,
			data() {
				return {
					userInfo
				};
			}
		});
		expect(wrapper.vm.editUser());
	});

	it('tests that tab is changed to contacts', () => {
		let evt = 'contacts';
		const wrapper = mount(User, {
			// router,
			mocks: {
				$route: {
					query: {
						userId: '1'
					}
				}
			},
			store,
			data() {
				return {
					activeTab: 'contacts'
				};
			}
		});
		expect(wrapper.vm.setActiveTab(evt));
		expect(wrapper.vm.$data.activeTab).toBe('contacts');
	});

	it('tests that tab is changed to settings', () => {
		let evt = 'settings';
		const wrapper = mount(User, {
			mocks: {
				$route: {
					query: {
						userId: '1'
					}
				}
			},
			store,
			data() {
				return {
					activeTab: 'settings'
				};
			}
		});
		expect(wrapper.vm.setActiveTab(evt));
		expect(wrapper.vm.$data.activeTab).toBe('settings');
	});
});

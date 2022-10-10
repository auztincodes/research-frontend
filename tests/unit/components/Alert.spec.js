import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Alert from '../../../src/components/Alert';
const localVue = createLocalVue();
localVue.use(Vuex);

const initialAlertState = {
	status: 'success',
	title: 'A test alert title',
	message: 'A test alert message',
	showAlert: false
};
jest.mock('axios', () => ({
	get: Promise.resolve(true)
}));
describe('Alert.vue', () => {
	let wrapper;
	let store;
	beforeEach(() => {
		store = new Vuex.Store({
			getters: {
				getAlert: (state) => state.alert
			},
			state: {
				alert: initialAlertState
			},
			actions: {
				showAlert: jest.fn()
			}
		});
		wrapper = shallowMount(Alert, {
			store,
			localVue,
			propsData: {
				iconType: 'Success',
				isGlobal: false,
				showAction: false,
				actionBtnType: 'error'
			}
		});
	});

	it('Render without errors', () => {
		expect(wrapper.vm).toBeTruthy();
	});

	it('shows alert status', () => {
		expect(wrapper.vm.showAlertStatus).toBe(false);
	});
	it('should return alert type', () => {
		expect(wrapper.vm.alertType).toBe(wrapper.props().iconType);
	});
	it('should return container class', () => {
		expect(wrapper.vm.containerModifierClass).toBe(`alert__container--${wrapper.props().iconType}`);
	});
	it('should return alert modifier class', () => {
		expect(wrapper.vm.alertModifierClass).toBe(`alert--${wrapper.props().iconType}`);
	});
	test('call closeAlert function', () => {
		wrapper.vm.closeAlert();
	});
	test('Should handle closeAlert button when click', async () => {
		await wrapper.find('div.alert').trigger('click');
		wrapper.vm.closeAlert();
	});
});

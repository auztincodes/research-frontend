import { shallowMount, createLocalVue } from '@vue/test-utils';
import App from '../../../src/App.vue';
import VueRouter from 'vue-router';
const localVue = createLocalVue();

localVue.use(VueRouter);
describe('App', () => {
	const router = new VueRouter({ routes: [{ path: '/login', name: 'Login' }] });
	const wrapper = shallowMount(App, {
		localVue,
		router
	});
	it('Render without errors', () => {
		expect(wrapper.vm).toBeTruthy();
	});
});

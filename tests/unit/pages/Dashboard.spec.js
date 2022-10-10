import { shallowMount, createLocalVue } from '@vue/test-utils';
import Dashboard from '../../../src/views/Dashboard/Index.vue';
import VueRouter from 'vue-router';
const localVue = createLocalVue();

localVue.use(VueRouter);
describe('Dashboard', () => {
	const wrapper = shallowMount(Dashboard, {
		localVue
		//router
	});
	it('Render without errors', () => {
		expect(wrapper.vm).toBeTruthy();
	});
});

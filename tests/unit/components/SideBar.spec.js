import { shallowMount, createLocalVue } from '@vue/test-utils';
import SideBar from '../../../src/components/SideBar';
import VueRouter from 'vue-router';
const localVue = createLocalVue();
localVue.use(VueRouter);
const routes = [{ path: '/', meta: {} }];
describe('SideBar', () => {
	const router = new VueRouter({ routes });
	const wrapper = shallowMount(SideBar, {
		localVue,
		router,
		data() {
			return {
				activeTab: ''
			};
		}
	});
	it('should be a vue instance', () => {
		expect(wrapper.vm).toBeTruthy();
	});

	it('watch for route change', async () => {
		wrapper.vm.$options.watch.$route.call(wrapper.vm, true);
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.activeTab).toBe(routes[0].meta);
	});
});

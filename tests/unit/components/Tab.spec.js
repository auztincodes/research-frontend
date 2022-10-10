import { shallowMount } from '@vue/test-utils';
import Tab from '../../../src/components/Tabs/Tab.vue';

describe('Tab.vue', () => {
	const wrapper = shallowMount(Tab, {
		propsData: {
			title: 'header',
			selected: false,
			color: '',
			icon: '',
			margin: ''
		},
		data() {
			return {
				isActive: false,
				iconClass: ''
			};
		}
	});
	it('Render without errors', () => {
		expect(wrapper.vm).toBeTruthy();
	});
	it('watch for active tab', async () => {
		wrapper.vm.$options.watch.isActive.call(wrapper.vm, true);
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('getData')).toBeTruthy();
	});

	it('should return style', () => {
		expect(wrapper.vm.style).toStrictEqual({ margin: wrapper.props().margin });
	});
});

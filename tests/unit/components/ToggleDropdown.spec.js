import { shallowMount } from '@vue/test-utils';
import ToggleDropdown from '../../../src/components/ToggleDropdown';

describe('ToggleDropdown.vue', () => {
	const wrapper = shallowMount(ToggleDropdown, {
		propsData: {
			showDropdown: false
		}
	});
	it('Render without errors', () => {
		expect(wrapper.vm).toBeTruthy();
	});

	test('call onClose function', () => {
		wrapper.vm.onClose();
	});
	test('check showDropdown value', () => {
		expect(wrapper.props().showDropdown).toBeFalsy();
	});

	// test('watch showDropdown', async () => {
	// 	wrapper.vm.$options.watch.showDropdown.call(wrapper.vm, true);
	// 	await wrapper.vm.$nextTick();
	// });
});

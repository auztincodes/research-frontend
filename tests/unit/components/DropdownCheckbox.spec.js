import { shallowMount } from '@vue/test-utils';
import DropdownCheckbox from '../../../src/components/DropdownCheckbox';

describe('DropdownCheckbox.vue', () => {
	const wrapper = shallowMount(DropdownCheckbox, {
		propsData: {
			name: 'some value'
		}
	});
	it('Render without errors', () => {
		expect(wrapper.vm).toBeTruthy();
	});

	test('call onClose function', () => {
		wrapper.vm.onClose();
	});
});

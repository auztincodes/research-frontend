import { shallowMount } from '@vue/test-utils';
import AlertIcon from '../../../src/components/AlertIcon.vue';

describe('AlertIcon.vue', () => {
	const wrapper = shallowMount(AlertIcon, {
		propsData: {
			type: 'success'
		}
	});
	it('Render without errors', () => {
		expect(wrapper.vm).toBeTruthy();
	});

	test('check showDropdown value', () => {
		expect(wrapper.props().type).toBe('success');
	});
});

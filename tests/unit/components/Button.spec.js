import { shallowMount } from '@vue/test-utils';
import VButton from '../../../src/components/Button';

describe('VButton.vue', () => {
	const wrapper = shallowMount(VButton, {
		propsData: {
			size: 'small'
		}
	});

	test('Render without errors', () => {
		expect(wrapper.vm).toBeTruthy();
	});

	test('Should handle button click', () => {
		wrapper.find('button').trigger('click');
	});
});

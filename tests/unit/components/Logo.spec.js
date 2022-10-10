import { shallowMount } from '@vue/test-utils';
import Logo from '../../../src/components/Logo.vue';

describe('Logo.vue', () => {
	const wrapper = shallowMount(Logo);
	it('Render without errors', () => {
		expect(wrapper.vm).toBeTruthy();
	});
});

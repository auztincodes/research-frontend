import { shallowMount } from '@vue/test-utils';
import Loader from '../../../src/components/Loader.vue';

describe('Loader.vue', () => {
	const wrapper = shallowMount(Loader);
	it('Render without errors', () => {
		expect(wrapper.vm).toBeTruthy();
	});
});

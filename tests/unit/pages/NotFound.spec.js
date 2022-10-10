import { shallowMount } from '@vue/test-utils';
import NotFound from '../../../src/views/NotFound.vue';

describe('NotFound.vue', () => {
	const wrapper = shallowMount(NotFound);
	it('Render without errors', () => {
		expect(wrapper.vm).toBeTruthy();
	});
});

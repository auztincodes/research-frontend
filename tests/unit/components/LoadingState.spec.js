import { shallowMount } from '@vue/test-utils';
import LoadingState from '../../../src/components/LoadingState.vue';

describe('LoadingState.vue', () => {
	const wrapper = shallowMount(LoadingState);
	it('Render without errors', () => {
		expect(wrapper.vm).toBeTruthy();
	});
});

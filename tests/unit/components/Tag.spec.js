import { shallowMount } from '@vue/test-utils';
import CTag from '../../../src/components/Tag';

describe('CTag.vue', () => {
	const wrapper = shallowMount(CTag, {
		propsData: {
			text: 'some value'
		}
	});
	it('Render without errors', () => {
		expect(wrapper.vm).toBeTruthy();
	});

	test('call deleteTag function', () => {
		wrapper.vm.deleteTag();
	});
	test('check text value', () => {
		expect(wrapper.props().text).toBe('some value');
	});
});

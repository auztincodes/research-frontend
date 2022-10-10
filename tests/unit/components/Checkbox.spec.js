import { shallowMount } from '@vue/test-utils';
import CCheckbox from '../../../src/components/Checkbox';

describe('CCheckbox.vue', () => {
	const wrapper = shallowMount(CCheckbox, {
		propsData: {
			name: 'some value'
		}
	});
	it('Render without errors', () => {
		expect(wrapper.vm).toBeTruthy();
	});

	it('Should handle checkbox checked', () => {
		wrapper.find('input').trigger('input');
	});

	it('determine checked value', () => {
		expect(wrapper.vm.checked).toBe('');
	});
	it('change value and determine checked value', async () => {
		await wrapper.setData({ checked: 'value' });
		await wrapper.setProps({ truthValue: 'value' });
		expect(wrapper.vm.checked).toBe('value');
	});
});

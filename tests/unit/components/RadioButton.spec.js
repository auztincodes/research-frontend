import { shallowMount } from '@vue/test-utils';
import RadioButton from '../../../src/components/RadioButton';

describe('RadioButton.vue', () => {
	const wrapper = shallowMount(RadioButton, {
		propsData: {
			id: 'Active',
			options: [
				{
					title: 'name',
					value: 'james'
				}
			]
		}
	});
	it('Render without errors', () => {
		expect(wrapper.vm).toBeTruthy();
	});

	it('trigger radio input', async () => {
		const radioInput = wrapper.find('input[type="radio"]');
		await radioInput.setChecked();

		expect(radioInput.element.checked).toBeTruthy();
	});
});

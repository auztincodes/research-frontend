import { mount } from '@vue/test-utils';
import TextInput from '../../../src/components/Input';

describe('TextInput.vue', () => {
	const wrapper = mount(TextInput, {
		propsData: {
			name: 'some value'
		}
	});
	it('Render without errors', () => {
		expect(wrapper.vm).toBeTruthy();
	});

	it('trigger input', async () => {
		const textInput = wrapper.find('input[type="text"]');
		await textInput.setValue('some value');
		expect(wrapper.find('input[type="text"]').element.value).toBe('some value');
	});
});

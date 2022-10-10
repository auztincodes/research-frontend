import { mount } from '@vue/test-utils';
import PasswordInput from '../../../src/components/Input/PasswordInput';

describe('PasswordInput.vue', () => {
	const wrapper = mount(PasswordInput, {
		propsData: {
			name: 'some value'
		},
		data() {
			return {
				show_password: false
			};
		}
	});
	it('Render without errors', () => {
		expect(wrapper.vm).toBeTruthy();
	});
});

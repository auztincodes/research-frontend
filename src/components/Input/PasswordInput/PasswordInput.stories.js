import PasswordInput from '.';
export default {
	title: 'Library/Password',
	component: { PasswordInput },
	argTypes: {
		type: {
			control: { type: 'select', options: ['password', 'text'] }
		},
		placeholder: {
			control: { type: 'text' }
		},
		name: {
			control: { type: 'text' }
		},
		showPasswordBar: {
			control: { type: 'boolean' }
		}
	}
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { PasswordInput },
	template: '<password-input v-bind="$props"/> '
});

export const Password = Template.bind({});
Password.args = {
	type: 'password',
	name: 'Password',
	placeholder: 'Enter Password',
	rules: 'required',
	width: '270px'
};
export const PasswordWithBar = Template.bind({});
PasswordWithBar.args = {
	type: 'password',
	name: 'Confirm Password',
	placeholder: 'Confirm Password',
	rules: 'required',
	showPasswordBar: false,
	width: '270px'
};

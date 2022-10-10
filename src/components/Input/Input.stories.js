import TextInput from './TextInput';
export default {
	title: 'Library/TextInput',
	component: { TextInput },
	argTypes: {
		type: {
			control: { type: 'select', options: ['email', 'text'] }
		},
		placeholder: {
			control: { type: 'text' }
		},
		name: {
			control: { type: 'text' }
		}
	}
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TextInput },
	template: '<text-input v-bind="$props"></text-input>'
});
export const Email = Template.bind({});
Email.args = {
	type: 'email',
	name: 'Email',
	placeholder: 'youremail@gmail.com',
	rules: 'required'
};
export const Text = Template.bind({});
Text.args = {
	type: 'text',
	name: 'First Name',
	placeholder: 'John',
	rules: 'required'
};
export const WithLabel = Template.bind({});
WithLabel.args = {
	type: 'text',
	name: 'First Name',
	placeholder: 'John',
	labelVisible: true,
	rules: 'required'
};

export const TextWithIcon = Template.bind({});
TextWithIcon.args = {
	type: 'text',
	name: 'First Name',
	placeholder: 'John',
	icon: { type: 'search' },
	width: '509px'
};

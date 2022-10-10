import CCheckbox from '.';

export default {
	title: 'Library/Checkbox',
	component: { CCheckbox },
	argTypes: {
		name: {
			control: { type: 'text' }
		}
	}
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { CCheckbox },
	template: '<c-checkbox v-bind="$props"> Document Verification</c-checkbox>'
});
export const Checkbox = Template.bind({});
Checkbox.args = {
	name: 'Document'
};

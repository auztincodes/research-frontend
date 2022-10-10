import VButton from '.';

export default {
	title: 'Library/VButton',
	component: { VButton },
	argTypes: {
		size: {
			control: { type: 'select', options: ['small', 'full', 'default'] }
		},
		buttonType: {
			control: { type: 'select', options: ['primary', 'outline', 'secondary', 'link', 'muted'] }
		}
	}
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { VButton },
	template: '<v-button v-bind="$props">Button</v-button>'
});
export const Default = Template.bind({});

export const Medium = Template.bind({});
Medium.args = {
	size: 'medium'
};

export const Small = Template.bind({});
Small.args = {
	size: 'small'
};
export const Full = Template.bind({});
Full.args = {
	size: 'full'
};
export const primary = Template.bind({});
primary.args = {
	buttonType: 'primary'
};
export const secondary = Template.bind({});
secondary.args = {
	buttonType: 'secondary'
};

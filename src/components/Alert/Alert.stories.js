import Alert from './';
import AlertIcon from '../AlertIcon';

export default {
	title: 'Library/Alert',
	component: Alert,
	argTypes: {
		iconType: {
			control: {}
		}
	}
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { Alert, AlertIcon },
	template: '<alert v-bind="$props" @click="close"></alert>',
	methods: {
		close() {
			console.log('closed');
		}
	}
});

export const Success = Template.bind({});

Success.args = {
	iconType: 'success'
};

export const Info = Template.bind({});

Info.args = {
	iconType: 'info'
};

export const Errors = Template.bind({});

Errors.args = {
	iconType: 'error'
};

export const Caution = Template.bind({});

Caution.args = {
	iconType: 'caution'
};

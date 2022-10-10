import CTag from './';
export default {
	title: 'Library/CTag',
	component: CTag,
	argTypes: {
		text: {
			control: { type: 'text' }
		}
	}
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { CTag },
	template: '<c-tag @click="deleteTags" v-bind="$props"/>',
	methods: {
		deleteTags() {
			console.log('tags');
		}
	}
});
export const Tag = Template.bind({});
Tag.args = {
	text: 'Transaction Id'
};

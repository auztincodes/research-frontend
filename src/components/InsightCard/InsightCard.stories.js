import InsightCard from './';

export default {
	title: 'Library/InsightCard',
	component: InsightCard
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { InsightCard },
	template: '<InsightCard v-bind="$props" />'
});

export const Default = Template.bind({});

Default.args = {
	title: 'Title',
	content: 'Content',
	quote: 'Quote'
};

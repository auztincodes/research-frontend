import { shallowMount } from '@vue/test-utils';
import Tabs from '../../../src/components/Tabs';
describe('Tabs.vue', () => {
	const wrapper = shallowMount(Tabs, {
		propsData: {
			title: 'header',
			selected: false,
			color: '',
			icon: '',
			margin: ''
		},
		data() {
			return {
				tabs: [
					{
						isActive: true,
						title: 'hello'
					}
				]
			};
		},
		slots: {
			default: '<div class="fake-msg"></div>'
		}
	});
	it('Render without errors', () => {
		expect(wrapper.vm).toBeTruthy();
	});
	it('should call selectTab', async () => {
		wrapper.vm.selectTab();
	});
	it('renders tab slot in tab-contents', () => {
		const list = wrapper.find('div.tab-contents');
		expect(list.findAll('.fake-msg').length).toBe(1);
	});
});

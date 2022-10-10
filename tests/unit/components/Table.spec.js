import { shallowMount, createLocalVue } from '@vue/test-utils';
import Table from '../../../src/components/Table';
import TableHeader from '../../../src/components/Table/TableHeader';
const localVue = createLocalVue();
describe('Table', () => {
	const wrapper = shallowMount(Table, {
		localVue,
		data() {
			return {
				sortBy: null,
				sortType: 'asc'
			};
		},
		propsData: {
			tableHeaders: [],
			tableData: [
				{
					name: 'First product'
				},
				{
					name: 'Second product'
				}
			],
			theme: '',
			loading: ''
		}
	});
	it('should be a vue instance', () => {
		expect(wrapper.vm).toBeTruthy();
	});
	it('should show header component by default', async () => {
		await wrapper.vm.$nextTick();

		expect(wrapper.findComponent(TableHeader).exists()).toBe(true);
	});
	it('should sort data', async () => {
		wrapper.vm.sortData();
		await wrapper.vm.$nextTick();
	});
	it('should return sorted data', () => {
		expect(wrapper.vm.sortedData).toBe(wrapper.props().tableData);
	});
	it('should reverse the products list when ordering in descending order', async () => {
		wrapper.vm.sortType = 'desc';
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.sortedData).toBe(wrapper.props().tableData.reverse());
	});
	it('shpuld handle clickRow when clicked', async () => {
		await wrapper.find('tr.table__row').trigger('click');
		expect(wrapper.emitted('rowClick')).toBeTruthy();
	});
});

// import { shallowMount } from '@vue/test-utils';
import InsightCard from '@/components/InsightCard';
import { shallowMount, createLocalVue } from '@vue/test-utils';
const localVue = createLocalVue();

localVue.filter('moment', (val, val2) => val + val2);

describe('InsightCard.vue', () => {
	it('Render without errors', () => {
		const wrapper = shallowMount(InsightCard, {
			propsData: {
				published: 'some value',
				article: {
					url: '',
					meta: {
						html: {
							snippet: ''
						}
					}
				}
			},
			localVue
		});
		expect(wrapper.vm).toBeTruthy();
	});

	it('tests the default article prop is used', () => {
		const wrapper = shallowMount(InsightCard, {
			propsData: {
				published: 'some value',
				article: {
					url: '',
					meta: {
						html: {
							snippet: ''
						}
					}
				}
			},
			localVue
		});

		console.log(wrapper.vm.article);
	});
});

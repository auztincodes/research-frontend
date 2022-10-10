import Modal from './';
export default {
	title: 'Library/Modal',
	component: Modal,
	argTypes: {}
};
const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { Modal },
	data: () => ({
		showModal: false,
		toggleClass: true
	}),
	template: `
        <div>
        <button @click="toggleModal"> Open Modal</button>
            <modal v-if="showModal" :toggleClass="toggleClass" @close="toggleModal" v-bind="$props">
                <div>
                   <p>Configure your search preferences on the 
                   settings page to get customised search result</p>
                
                </div>
            </modal>
           
        </div>
        `,
	methods: {
		toggleModal() {
			if (!this.showModal) {
				this.showModal = true;
			} else {
				this.toggleClass = !this.toggleClass;
				setTimeout(() => {
					this.showModal = !this.showModal;
					this.toggleClass = !this.toggleClass;
				}, 500);
			}
		}
	}
});
export const Default = Template.bind({});

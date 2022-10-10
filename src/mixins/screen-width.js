const ScreenWidthMixin = {
	data: () => ({
		windowWidth: 0,
		screenWidth: ''
	}),
	beforeMount() {
		this.$nextTick(() => {
			window.addEventListener('resize', this.onResize);
		});
		this.onResize();
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.onResize);
	},
	watch: {
		windowWidth(newWidth) {
			this.screenWidth = newWidth;
		}
	},
	methods: {
		onResize() {
			this.windowWidth = window.innerWidth;
		}
	}
};
export default ScreenWidthMixin;

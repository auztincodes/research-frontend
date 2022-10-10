<template>
	<div class="content" v-if="isActive" :style="style">
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			required: true
		},
		selected: {
			default: false
		},
		color: {
			default: String
		},
		icon: {
			default: String
		},
		margin: {
			type: String,
			default: '25px 0'
		}
	},
	data() {
		return {
			isActive: false,
			iconClass: ''
		};
	},
	computed: {
		style() {
			return {
				margin: this.margin
			};
		}
	},
	watch: {
		isActive(value) {
			if (value) {
				this.$emit('getData');
			}
		}
	},
	mounted() {
		this.isActive = this.selected;
		this.iconClass = this.icon;
	}
};
</script>

<style lang="scss" scoped>
.content {
	-webkit-animation: fadeIn 0.3s;
	animation: fadeIn 0.3s;
	overflow-x: scroll;
	width: 100%;
	max-width: 930px;
}
@-webkit-keyframes fadeIn {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}

@keyframes fadeIn {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}
</style>

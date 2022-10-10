<template>
	<button :type="submitType" :class="classes" class="btn-primary" v-on="$listeners">
		<slot />
		<slot name="icon" />
	</button>
</template>

<script src="./button.js"></script>
<style lang="scss" scoped>
@import '../../assets/scss/main.scss';
.btn {
	height: 46px;
	padding: 0 58px;
	border-radius: 2px;
	cursor: pointer;
	text-transform: capitalize;
	&-primary {
		background: #3b48f7;
		color: #fff;
	}
	&-secondary {
		background: rgba(59, 72, 247, 0.08);
		color: #3b48f7;
	}
	&-outline {
		color: #3a434b;
		background: #ffffff;
		border: 1px solid #d7dce0;
		box-sizing: border-box;
		border-radius: 4px;
		display: flex;
		align-items: center;
	}
	&-warning {
		background: #ca1b1b;
		color: #fff;
	}
	&[disabled] {
		color: grey;
		border: none;
		background-color: #f5f5f5;
	}
	&-small {
		padding: 0 20px;
		width: initial !important;
	}
	&-medium {
		padding: 0 20px;
		width: 95px;
		border: 1px solid #3b48f7;
		box-sizing: border-box;
		border-radius: 4px;
	}
	&-icon {
		padding: 0 18px;
		width: initial !important;
	}
	&-large {
		padding: 0 32px;
		border-radius: 8px;
	}
	&-full {
		width: 100%;
		text-align: center;
	}
	&-modal {
		height: 40px;
		min-width: 100px;
		text-align: center;
		border-radius: 4px;
		padding: 0 24px;
	}
}
@include query(mobile, max) {
	.btn {
		width: 100%;
	}
}
</style>

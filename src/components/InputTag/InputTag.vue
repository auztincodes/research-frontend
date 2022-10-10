<template>
	<div class="flex flex__item-center input-tag">
		<p class="tag-name">
			<slot />
		</p>
		<button type="button" class="tagBtn" @click.prevent="$emit('close')">
			<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M4.21233 3.3875L7.09983 0.5L7.92467 1.32483L5.03717 4.21233L7.92467 7.09983L7.09983 7.92467L4.21233 5.03717L1.32483 7.92467L0.5 7.09983L3.3875 4.21233L0.5 1.32483L1.32483 0.5L4.21233 3.3875Z"
					fill="#000"
				/>
			</svg>
		</button>
	</div>
</template>

<script src="./inputTag.js"></script>
<style lang="scss" scoped>
@import './InputTag.scss';
</style>

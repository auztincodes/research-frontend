<template>
	<div class="tab-container">
		<div class="tabs">
			<div class="tab" v-for="(tab, i) in tabs" :class="{ 'is-active': tab.isActive }" :key="i" @click="selectTab(tab)">
				<h5 class="">
					{{ tab.title }}
				</h5>
			</div>
		</div>

		<div class="tab-contents">
			<slot></slot>
		</div>
	</div>
</template>
<script src="./tabs.js"></script>
<style lang="scss" scoped>
.tabs {
	border-bottom: 1px solid #d7dce0;
	overflow-x: scroll;
	display: flex;
}
.tab {
	margin-right: 30px;
	padding-bottom: 15px;
	padding: 0 10px 10px;
	cursor: pointer;
	h5 {
		color: #81909d;
		line-height: 16px;
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 0.002em;
	}
	&.is-active {
		border-bottom: 3px solid #3b48f7;
		h5 {
			color: #3b48f7;
		}
	}
}
// .tab-contents {
// 	margin: 25px 0;
// }
</style>

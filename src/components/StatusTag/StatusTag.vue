<template>
	<div class="table__td__status">
		<span :class="`status status_${status}`">
			<span class="white__circle">
				<span class="pin"></span>
			</span>
			<span class="text"><slot></slot></span>
		</span>

		<!-- <span class="status_inactive" v-else-if="status.statusCode === 'INACTIVE'">
			<span class="white__circle">
				<span class="pin"></span>
			</span>
			<span class="text">{{ status.message }}</span>
		</span>

		<span class="status_active" v-else-if="status.statusCode === 'ACTIVE'">
			<span class="white__circle">
				<span class="pin"></span>
			</span>
			<span class="text">{{ status.message }}</span>
		</span>

		<span class="status_pending" v-else>
			<span class="white__circle">
				<span class="pin"></span>
			</span>
			<span class="text">{{ status.message }}</span>
		</span> -->
	</div>
</template>

<script src="./status-tag.js"></script>

<style lang="scss" scoped>
@import './Status.scss';
</style>

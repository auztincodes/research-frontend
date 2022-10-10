<template>
	<div id="app">
		<router-view />
		<Alert />
	</div>
</template>
<script>
import Alert from '@/components/Alert';

export default {
	name: 'App',
	components: {
		Alert
	}
};
</script>
<style lang="scss">
@import './assets/scss/main.scss';
</style>

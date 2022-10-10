<template>
	<label class="toggle"> <input type="checkbox" v-model="itemValue" checked v-on="$listeners" /><span class="toggle-icon"></span> </label>
</template>

<script src="./toggle.js"></script>
<style lang="scss" scoped>
@import './Toggle.scss';
</style>

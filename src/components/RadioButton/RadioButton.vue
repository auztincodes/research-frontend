<template>
	<div class="status">
		<div class="status-type" v-for="(option, index) in options" :key="index">
			<input type="radio" :id="option.title" :value="option.value" :name="name" v-model="innerValue" v-on="$listeners" />
			<label :style="{ marginBottom }" :for="option.title">{{ option.title }}</label>
			<br />
		</div>
	</div>
</template>

<script src="./RadioButton.js"></script>
<style lang="scss" scoped>
@import './RadioButton.scss';
</style>

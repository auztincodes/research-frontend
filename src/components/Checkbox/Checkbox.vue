<template>
	<div class="checkbox" :class="{ checked: innerValue }">
		<input :id="name" v-model="checked" type="checkbox" :name="name" :value="truthValue" v-on="$listeners" :disabled="disabled" />
		<label :for="name">
			<slot />
		</label>
	</div>
</template>

<script src="./Checkbox.js"></script>
<style lang="scss" scoped src="./Checkbox.scss"></style>

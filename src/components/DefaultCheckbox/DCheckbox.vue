<template>
	<ValidationProvider
		v-slot="{ errors, required, ariaInput, ariaMsg }"
		tag="div"
		class="form-group"
		:rules="isRequired ? { required: { allowFalse: !isRequired } } : ''"
	>
		<span v-if="errors[0]" class="checkbox-error" v-bind="ariaMsg">{{ errors[0] }}</span>
		<div class="" :class="({ checked: innerValue, error: errors[0] }, inputType)">
			<input :id="name" v-model="innerValue" :type="inputType" :name="name" :value="truthValue" />
			<label :for="name">
				<slot />
			</label>
		</div>
	</ValidationProvider>
</template>

<script src="./d-checkbox.js"></script>
<style lang="scss" scoped src="./d-checkbox.scss"></style>

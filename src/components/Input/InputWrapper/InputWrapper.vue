<template>
	<ValidationProvider
		v-slot="{ errors, required, ariaInput, ariaMsg }"
		:style="style"
		class="form-group"
		tag="div"
		:rules="rules"
		:name="name"
	>
		<slot :errors="errors" :ariaMsg="ariaMsg" />

		<span v-if="errors[0]" class="input-error--msg" v-bind="ariaMsg">{{ errors[0] }}</span>
	</ValidationProvider>
</template>

<script src="./InputWrapper.js"></script>
<style lang="scss" src="../input.scss"></style>

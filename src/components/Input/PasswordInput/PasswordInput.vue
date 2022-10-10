<template>
	<input-wrapper v-slot="{ errors, ariaInput }" v-bind="$props">
		<label :for="name" class="form-label" :class="{ gray: labelColor }"
			>{{ name }} <span v-if="rules === 'required'" class="required">*</span></label
		>
		<span class="form-input--wrapper">
			<input
				:id="name"
				ref="input"
				v-model="innerValue"
				:name="name"
				class="form-input"
				:class="{ 'form-input--error': errors && errors[0], 'form__input--valid': hasValue, 'input-icon': icon }"
				:type="[show_password == false ? 'password' : 'text']"
				:style="style"
				:placeholder="placeholder"
				v-bind="ariaInput"
				v-on="$listeners"
				autocomplete
			/>
			<span @click="show_password = !show_password" class="form-password--icon">
				<img v-if="show_password" svg-inline src="../../../assets/icons/visibility-on.svg" />
				<img v-if="!show_password" svg-inline src="../../../assets/icons/visibility-off.svg" />
			</span>
		</span>
	</input-wrapper>
</template>

<script src="./PasswordInput.js"></script>
<style lang="scss" scoped src="./PasswordInput.scss"></style>

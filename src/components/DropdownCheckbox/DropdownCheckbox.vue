<template>
	<div class="u-relative">
		<span class="dropdown__wrapper" @click="showDropdown = !showDropdown" ref="dropdown__wrapper">
			<slot name="dropdown-wrapper"></slot>
		</span>
		<template v-if="showDropdown">
			<div
				class="dropdown__list-wrapper"
				id="dropdown__list-wrapper"
				v-closable="{ exclude: ['dropdown__wrapper'], handler: 'onClose' }"
			>
				<ul id="dropdown-list" tabindex="-1" class="dropdown__list">
					<slot name="dropdown-items"></slot>
				</ul>
			</div>
		</template>
	</div>
</template>

<script src="./dropdown-checkbox.js"></script>

<style lang="scss" src="./dropdown-checkbox.scss" scoped></style>

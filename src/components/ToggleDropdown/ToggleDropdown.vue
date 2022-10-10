<template>
	<div class="u-relative">
		<span class="dropdown__wrapper" :style="{ padding: itemPadding }" @click="showDropdown = !showDropdown">
			<slot name="dropdown-wrapper"></slot>
		</span>
		<template v-if="showDropdown">
			<div class="dropdown__list-wrapper" id="dropdown__list-wrapper" :style="{ width }">
				<ul id="dropdown-list" tabindex="-1" class="dropdown__list">
					<slot name="dropdown-items"></slot>
				</ul>
			</div>
		</template>
	</div>
</template>

<script src="./toggle-dropdown.js"></script>

<style lang="scss" src="./toggle-dropdown.scss" scoped></style>

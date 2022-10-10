<template>
	<div class="modal-overlay" @click="closeModal" :class="[!toggleClass ? 'fadeOut' : null, `modal-${position}`]">
		<div @click.stop="" class="modal-body" :class="{ slideOutRight: !toggleClass && position === 'right' }" :style="style">
			<div class="modal-header" v-if="useSlot">
				
				<slot name="title"></slot>

				<svg @click="closeModal" class="modal-header--close" width="24" height="24">
					<g transform="rotate(-45 14.828 5.172)" fill="#333758" fill-rule="evenodd">
						<rect y="7" width="16" height="2" rx="1" />
						<path d="M9 1v14a1 1 0 01-2 0V1a1 1 0 112 0z" />
					</g>
				</svg>
			</div>
			<div class="modal-info" v-if="showInfo">
				<slot name="info"></slot>
			</div>

			<div v-if="useSlot" class="modal-content">
				<slot name="body"></slot>
			</div>
			<slot name="settings"></slot>
		</div>
	</div>
</template>

<script src="./modal.js"></script>
<style lang="scss" scoped src="./modal.scss"></style>

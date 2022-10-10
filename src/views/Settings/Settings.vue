<template>
	<div class="more__settings__modal__wrapper">
		<div class="more__settings__modal__header">
			<div class="more__settings__modal__header__btn__wrapper">
				<v-button class="config__btn__close" @click="checkSettingChanges">
					<div class="btn__content__wrapper">
						<span class="icon pr-1">
							<img src="@/assets/icons/close-sign.svg" class="ml-1" svg-inline />
						</span>
						<span class="text">Close</span>
					</div>
				</v-button>
			</div>
		</div>
		<div class="more__settings__modal__content">
			<div class="table__wrapper my-4">
				<div class="table">
					<h4 class="settings-header">Search preference</h4>
					<div class="search-terms">
						<div class="settings-group">
							<p class="text">Contact search terms</p>
							<p class="description">Add terms to refine your contact search results</p>
							<v-text-input
								class="search-input"
								placeholder="customer data, customer insights, NPS"
								name="contact search"
								v-model="settings.contact_research"
								@change="onKeywordsChange('contact_research', $event)"
								width="100%"
							/>
						</div>
						<div class="settings-group">
							<p class="text">Company search terms</p>
							<p class="description">Add terms to refine your company search results</p>
							<v-text-input
								class="search-input"
								@change="onKeywordsChange('company_research', $event)"
								v-model="settings.company_research"
								placeholder="Terms (comma seperated)"
								name="company search"
								width="100%"
							/>
						</div>
						<div class="flex flex-end">
							<v-button class="config__btn__close" @click="submitForm()" ref="settingsBtn">
								<div class="btn__content__wrapper">
									<Loader v-if="loading" />
									<span v-else class="text">Save Changes</span>
								</div>
							</v-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<v-modal v-if="showModal" :toggleClass="toggleClass" @close="toggleModal" maxWidth="400px" position="center">
			<template #title>
				<h4 class="modal__header-title">Unsave Changes</h4>
			</template>
			<template #body>
				<div class="modal__content">
					<p class="modal__content-text">You have some unsaved changes, are you sure you want to exit this page?</p>
					<div class="modal__content-btn">
						<div class="cancel" @click="closeMoreSearchSettings">Exit</div>
						<v-button class="update__btn" buttonType="primary" size="modal" @click="submitForm">
							<Loader v-if="loading" />
							<span v-else class="text">Save & Exit</span>
						</v-button>
					</div>
				</div>
			</template>
		</v-modal>
	</div>
</template>

<script src="./settings.js"></script>
<style lang="scss" scoped src="./settings.scss"></style>
<style lang="scss">
.no__scroll {
	overflow-y: hidden !important;
}
.update__btn {
	width: 135px;
}
</style>

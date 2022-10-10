<template>
	<div class="container container--lg">
		<config-data
			v-if="openConfigPage"
			@closeConfig="openConfigPage = false"
			:headers="csvHeaders"
			:dataFields="dataFields"
			@submitImportCSV="submitImportCSV"
		/>
		<nav class="navbar">
			<div class="nav-item logo">
				<logo />
			</div>
			<div class="nav__menu__right">
				<div class="research" @click="$router.push({ name: 'ContactResearch' })">Contact Research</div>
				<div class="user__menu__wrapper">
					<v-toggle-dropdown class="user__dropdown__menu">
						<template #dropdown-wrapper>
							<img class="mr-1" src="@/assets/icons/user-icon.svg" svg-inline />
							<img src="@/assets/icons/carret-down.svg" svg-inline />
						</template>
						<template #dropdown-items>
							<li class="dropdown__item" @click="$router.push({ name: 'ApiPortal' })">API Keys</li>
							<li
								class="dropdown__item"
								v-if="userDetails.role !== 'user'"
								@click="$router.push({ path: '/dashboard/users' })"
							>
								Dashboard
							</li>
							<li class="dropdown__item" @click="gotoSettings">Settings</li>
							<li ref="logout_user" class="dropdown__item" @click="logoutUser">Logout</li>
						</template>
					</v-toggle-dropdown>
				</div>
			</div>
		</nav>
		<main class="main-section">
			<div class="hero">
				<h2 class="hero-title">More refined <span>research</span> .</h2>
				<p class="hero-desc">Aggregated sales research to power your personalized outreach.</p>
			</div>
			<v-tabs>
				<v-tab title="Manual Search" @getData="setActiveTab('manual_search')" :selected="true">
					<ValidationObserver v-slot="{ invalid }">
						<form @submit.prevent="submitSearch" class="search-wrapper">
							<v-text-input
								class="search-input"
								rules="required"
								placeholder="Name"
								name="name"
								v-model="payload.full_name"
							/>
							<v-text-input class="search-input" rules="required" placeholder="Title" name="title" v-model="payload.role" />
							<v-text-input
								class="search-input"
								rules="required"
								placeholder="Company"
								name="company"
								v-model="payload.company"
							/>
							<v-button :disabled="invalid" id="search_btn" class="search_btn" submitType="submit">
								<template v-if="!loading">Search</template>
								<Loader v-else />
							</v-button>
						</form>
					</ValidationObserver>
				</v-tab>
				<v-tab title="Import Contacts" @getData="setActiveTab('import_contacts')">
					<div class="upload__wrapper">
						<file-upload
							:drop="true"
							ref="upload"
							:extensions="extensions"
							:accept="accept"
							@input-file="inputFile"
							v-model="files"
						>
							<template>
								<div class="upload__placeholder__content">
									<img class="mr-1" src="@/assets/icons/upload-icon.svg" svg-inline />
									<div class="text__content">
										<p><span class="link">Upload a file</span> or drag and drop</p>
									</div>
									<div class="text__desc">CSV up to 10MB</div>
								</div>
							</template>
						</file-upload>
					</div>
				</v-tab>
			</v-tabs>

			<template v-if="activeTab === 'manual_search'">
				<p class="more-filter" @click="showMoreSearch = !showMoreSearch">
					More search options <img src="@/assets/icons/arrow-drop-down.svg" class="ml-1" svg-inline />
				</p>
			</template>
			<!-- CONFIG MODAL -->
			<template v-if="showConfigModal">
				<v-modal position="center" :useSlot="false">
					<template #settings>
						<div class="config__modal__wrapper">
							<div class="config__modal__header">
								<div class="config__modal__header__btn__wrapper">
									<v-button class="config__btn__close" ref="config__btn__close" @click="closeConfigModal()">
										<div class="btn__content__wrapper">
											<span class="text">Close</span>
											<span class="icon">
												<img src="@/assets/icons/close-sign.svg" class="ml-1" svg-inline />
											</span>
										</div>
									</v-button>
								</div>
							</div>
							<div class="config__modal__content">
								<div class="config__icon__wrapper">
									<img src="@/assets/icons/empty-state-image.svg" class="ml-1" svg-inline />
								</div>
								<div class="config__text__wrapper">
									<p>
										Configure your search preferences on the <br />
										settings page to get customised search result
									</p>
								</div>
								<div class="config__btn__wrapper">
									<v-button class="config__btn" @click="gotoSettings">Settings</v-button>
								</div>
							</div>
						</div>
					</template>
				</v-modal>
			</template>
			<!-- CONFIG MODAL END -->
			<!-- __inpage -->
			<template v-if="showMoreSearch && activeTab === 'manual_search'">
				<div class="table__wrapper mb-3 table__inpage">
					<div class="table__wrapper__header">
						<div class="text__content">Search Preference</div>
						<div class="table__wrapper__header__btn__wrapper">
							<v-button class="table__wrapper__btn__close" @click="showMoreSearch = !showMoreSearch">
								<div class="btn__content__wrapper">
									<span class="icon pr-1">
										<img src="@/assets/icons/close-sign.svg" class="ml-1" svg-inline />
									</span>
									<span class="text">Close</span>
								</div>
							</v-button>
						</div>
					</div>
					<!-- Contact search -->
					<div class="table">
						<div class="search-terms">
							<div class="settings-group">
								<p class="text">Contact search terms</p>
								<p class="description">Add terms to refine your contact search results</p>
								<v-text-input
									class="search-input"
									placeholder="customer data, customer insights, NPS"
									name="contact search"
									v-model="payload.contact_research"
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
									v-model="payload.company_research"
									placeholder="Terms (comma seperated)"
									name="company search"
									width="100%"
								/>
							</div>
						</div>
					</div>
				</div>
			</template>
			<!-- __inpage END -->
		</main>
		<template v-if="showMoreSearchSettings">
			<router-view @routerEvent="routerEventHandler"></router-view>
		</template>
	</div>
</template>

<script src="./search.js"></script>
<style lang="scss" scoped src="./search.scss"></style>
<style lang="scss">
.nav__menu__right {
	.user__menu__wrapper {
		.user__dropdown__menu {
			.dropdown__list-wrapper {
				top: 80%;
			}
		}
	}
}
.upload__wrapper {
	.file-uploads {
		width: 100%;
		height: 140px;
		display: flex;
		justify-content: center;
		align-items: center;
		&:hover {
			cursor: pointer;
		}
		label {
			&:hover {
				cursor: pointer;
			}
		}
	}
}
</style>

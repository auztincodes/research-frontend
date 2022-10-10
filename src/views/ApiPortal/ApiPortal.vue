<template>
	<div class="container container--lg">
		<div class="dashboard-wrapper">
			<!-- <home-header /> -->
			<v-header />
			<div class="loader" v-if="pageLoading">
				<img src="@/assets/icons/page-loader.svg" alt="" />
			</div>

			<!-- if keys have never been generated -->
			<div v-else-if="!keys.length" class="page-wrapper">
				<img src="@/assets/icons/api-generate.svg" alt="" />
				<div class="text">
					<h2 class="text-main">Get an API Key</h2>
					<p class="text-sub">Click on the button to generate an API key</p>
				</div>
				<v-button class="config__btn__close" @click="getKey">
					<div class="btn__content__wrapper">
						<Loader v-if="loading" />
						<span v-else class="text">Generate API Key</span>
					</div>
				</v-button>
			</div>

			<!-- if keys have been generated before -->
			<div v-else class="page-content">
				<h3 class="page-content__name">API Keys</h3>
				<div class="page-content__body">
					<h4 class="form-head">Integration</h4>

					<template>
						<div v-for="(api, index) in keys" :key="index">
							<div class="form-body">
								<p class="label">API {{ api.mode }} key</p>
								<div class="key-section">
									<div class="key-group">
										<p class="key-group__text" :ref="`apiKey-${index}`">{{ api.key }}</p>
									</div>
									<div class="btn" :ref="`copyBtn-${index}`" @click="copyKey(api.key, index)">Copy</div>
								</div>
								<button v-if="index === 0" class="key-generate" @click="getKey">Regenerate key</button>
							</div>
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./apiPortal.js"></script>

<style lang="scss" scoped>
@import './apiPortal.scss';
</style>

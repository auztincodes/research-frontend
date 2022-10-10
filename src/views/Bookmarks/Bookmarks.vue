<template>
	<div class="">
		<v-header />
		<template v-if="bookmarkLoading">
			<page-load :showAside="false" />
		</template>
		<main v-else class="main container container--lg">
			<!-- contact search -->
			<div class="contact searched__wrapper">
				<div class="searched__wrapper-header">
					<h3 class="title" v-if="screenType === 'large'">Contact Research</h3>
					<toggle-dropdown v-else>
						<template #dropdown-wrapper>
							<h3 class="title">
								Contact Research
								<img src="@/assets/icons/arrow-dropdown-plane.svg" alt="dropdown icon" svg-inline />
							</h3>
						</template>
						<template #dropdown-items>
							<li class="dropdown__item" @click="searchType = 'company_research'">Company Research</li>
							<li class="dropdown__item" @click="searchType = 'contact_research'">Contact Research</li>
						</template>
					</toggle-dropdown>
					<div class="filter-sort">
						<toggle-dropdown>
							<template #dropdown-wrapper> </template>
							<template #dropdown-items>
								<li class="dropdown__item" @click="sortByRecent('contact_research')">Recent</li>
								<li class="dropdown__item" @click="sortByRelevance('contact_research')">Relevance</li>
							</template>
						</toggle-dropdown>
						<dropdown-checkbox>
							<template #dropdown-wrapper>
								<span class="filter"><img src="@/assets/icons/filter.svg" alt="filter icon" svg-inline /></span>
							</template>
							<template #dropdown-items>
								<span v-for="(data, i) in getSearchedResult.contact_research" :key="i">
									<li class="dropdown__item" v-if="getSearchedResult.contact_research[i].length !== 0">
										<d-checkbox v-model="contactFilter" inputType="checkbox" :truthValue="i" :name="i">
											{{ i }}
										</d-checkbox>
									</li>
								</span>
							</template>
						</dropdown-checkbox>
					</div>
				</div>
				<div class="searched-result" v-for="(data, i) in allBookMarks['contact_research']" :key="i">
					<span>
						<div class="searched__item">
							<div @click="displaySearchItem('contact_research', data)">
								<p class="searched__item-title">{{ data.title || '' }}</p>
								<p class="searched__item-desc">{{ data.description }}</p>
							</div>
							<div class="url__bookmark__group">
								<a :href="data.url" target="_blank" class="searched__item-url"
									><img src="@/assets/icons/planet-earth.svg" alt="planet earth icon" svg-inline />
									<p class="url-text">{{ data.url }}</p></a
								>
								<img
									@click="btnRemoveFromBookMarks(data)"
									alt="bookmark icon"
									src="@/assets/icons/bookman-icon-dark.svg"
									svg-inline
								/>
							</div>
						</div>
					</span>
					<dot-loader v-if="loadMore" />
				</div>
			</div>

			<!-- company search -->
			<div class="contact searched__wrapper">
				<div class="searched__wrapper-header">
					<h3 class="title" v-if="screenType === 'large'">Company Research</h3>
					<toggle-dropdown v-else>
						<template #dropdown-wrapper>
							<h3 class="title">
								Company Research
								<img src="@/assets/icons/arrow-dropdown-plane.svg" alt="dropdown icon" svg-inline />
							</h3>
						</template>
						<template #dropdown-items>
							<li class="dropdown__item" @click="searchType = 'company_research'">Company Research</li>
							<li class="dropdown__item" @click="searchType = 'contact_research'">Contact Research</li>
						</template>
					</toggle-dropdown>
					<div class="filter-sort">
						<toggle-dropdown>
							<template #dropdown-wrapper> </template>
							<template #dropdown-items>
								<li class="dropdown__item" @click="sortByRecent('company_research')">Recent</li>
								<li class="dropdown__item" @click="sortByRelevance('company_research')">Relevance</li>
							</template>
						</toggle-dropdown>
						<dropdown-checkbox>
							<template #dropdown-wrapper>
								<span class="filter"><img src="@/assets/icons/filter.svg" alt="filter icon" svg-inline /></span>
							</template>
							<template #dropdown-items>
								<span v-for="(data, i) in getSearchedResult.company_research" :key="i">
									<li class="dropdown__item" v-if="getSearchedResult.company_research[i].length !== 0">
										<d-checkbox v-model="companyFilter" inputType="checkbox" :truthValue="i" :name="i">
											{{ i }}
										</d-checkbox>
									</li>
								</span>
							</template>
						</dropdown-checkbox>
					</div>
				</div>
				<div class="searched-result" v-for="(data, i) in companyResearch" :key="i">
					<span>
						<div class="searched__item" :id="`searched__item-${i}`">
							<div @click="displaySearchItem('company_research', data)">
								<p class="searched__item-title">{{ data.title }}</p>
								<p class="searched__item-desc">{{ data.description }}</p>
							</div>
							<div class="url__bookmark__group">
								<a :href="data.url" target="_blank" class="searched__item-url"
									><img src="@/assets/icons/planet-earth.svg" alt="planet earth icon" svg-inline />
									<p class="url-text">{{ data.url }}</p></a
								>
								<img
									@click="btnRemoveFromBookMarks(data)"
									alt="bookmark icon"
									src="@/assets/icons/bookman-icon-dark.svg"
									svg-inline
								/>
							</div>
						</div>
					</span>
					<dot-loader v-if="loadMore" />
				</div>
			</div>
		</main>
	</div>
</template>

<script src="./bookmarks.js"></script>
<style lang="scss" scoped src="./bookmarks.scss"></style>

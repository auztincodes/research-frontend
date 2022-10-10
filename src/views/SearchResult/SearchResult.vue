<template>
	<div class="">
		<v-header />
		<template v-if="loading">
			<page-load />
		</template>
		<main v-else class="main container container--lg">
			<div v-if="!editNote" class="aside__left">
				<div class="section section__1">
					<div class="title">
						<div class="text">Contact Details</div>
					</div>
					<div class="contact__details">
						<div class="text__initials" v-if="searchedResult.full_name">
							{{
								searchedResult.full_name
									.match(/\b(\w)/g)
									.join('')
									.toUpperCase()
							}}
						</div>
						<div class="text__name__role">
							<div class="name">{{ searchedResult.full_name }}</div>
							<div class="role">{{ searchedResult.role }}</div>
						</div>
					</div>
				</div>
				<div class="section section__2">
					<div class="contact__address">
						<div class="title">Email Address</div>
						<div class="text">{{ searchedResult.email }}</div>
					</div>
					<div class="contact__address">
						<div class="title">Company</div>
						<div class="text">{{ searchedResult.company }}</div>
					</div>
					<div class="contact__icon__group">
						<span v-for="(social, i) in socials" :key="i">
							<a v-if="social.twitter && Object.entries(social.twitter).length > 0" :href="social.twitter" target="_blank"
								><img src="@/assets/icons/twitter-icon.svg" svg-inline
							/></a>
							<a v-if="social.linkedin && Object.entries(social.linkedin).length > 0" :href="social.linkedin" target="_blank"
								><img src="@/assets/icons/linkedin-icon.svg" svg-inline
							/></a>
							<a
								v-if="social.website && Object.entries(social.website).length > 0"
								:href="validateURL(social.website)"
								target="_blank"
								><img src="@/assets/icons/world-icon.svg" svg-inline
							/></a>
							<a
								v-if="social.crunchbase && Object.entries(social.crunchbase).length > 0"
								:href="validateURL(social.crunchbase)"
								target="_blank"
								><img src="@/assets/icons/crunchbase.svg" svg-inline
							/></a>
						</span>
					</div>
				</div>
				<div class="section__3">
					<div class="title__text">Research Status</div>
					<div class="input__group">
						<input type="checkbox" :checked="searchedResult.status.statusCode === 'DONE'" @change="markResearch($event)" />
						<div class="input__label__text">Completed</div>
					</div>
				</div>
				<div class="section__4">
					<div class="text">Bookmarked {{ userBookmarksCount }}</div>
					<div v-if="userBookmarksCount !== 0" @click="$router.push({ name: 'Bookmarks', query: { rowId: rowId } })" class="link">
						See All
					</div>
				</div>
				<div class="section__5 bookmarks">
					<div
						class=""
						v-if="showFirstBookmark.contact_research !== ''"
						@click="displaySearchItem('contact_research', showFirstBookmark['contact_research'])"
					>
						<div class="title">Contact Research</div>
						<div class="content">
							{{ showFirstBookmark['contact_research'].description || '' }}
						</div>
					</div>
					<div class="" v-if="showFirstBookmark.company_research !== ''">
						<div class="title">Company Research</div>
						<div class="content">
							{{ showFirstBookmark['company_research'].description || '' }}
						</div>
					</div>
				</div>
				<div class="section__6" @click="editNote = !editNote">
					<div class="text">Notes</div>
					<div class="link"></div>
				</div>
				<template v-if="notepadTXT">
					<div class="section__7" @click="editNote = !editNote">
						<div class="title">{{ notepadTXT }}</div>
						<div class="content"></div>
					</div>
				</template>
			</div>
			<div v-else class="notepad">
				<span class="title-wrapper">
					<p class="notepad-title">Notepad</p>
					<img src="@/assets/icons/collapse.svg" svg-inline @click="editNote = false" />
				</span>
				<textarea
					class="notepad-input"
					rows="20"
					cols="50"
					name="text"
					id="textArea"
					v-model="notepadTXT"
					@blur="handleTextareaBlur"
					placeholder="Write down findings from research."
				>
				</textarea>
			</div>

			<!-- contact search -->
			<div class="contact searched__wrapper" v-if="searchType === 'contact_research' || screenType === 'large'">
				<div class="searched__wrapper-header">
					<h3 class="title" v-if="screenType === 'large'">Contact Research</h3>
					<toggle-dropdown v-else>
						<template #dropdown-wrapper>
							<h3 class="title">
								Contact Research
								<img src="@/assets/icons/arrow-dropdown-plane.svg" svg-inline />
							</h3>
						</template>
						<template #dropdown-items>
							<li class="dropdown__item" @click="searchType = 'company_research'">Company Research</li>
							<li class="dropdown__item" @click="searchType = 'contact_research'">Contact Research</li>
						</template>
					</toggle-dropdown>
					<div class="filter-sort">
						<toggle-dropdown>
							<template #dropdown-wrapper>
								<p class="sort">Sort by <img src="@/assets/icons/arrow-dropdown-plane.svg" svg-inline /></p>
							</template>
							<template #dropdown-items>
								<li class="dropdown__item" @click="sortByRecent('contact_research')">Recent</li>
								<li class="dropdown__item" @click="sortByRelevance('contact_research')">Relevance</li>
							</template>
						</toggle-dropdown>
					</div>
				</div>
				<template v-if="contact_research.others && contact_research.others.length === 0">
					<div class="searched-result">
						<div class="searched__item">No research found</div>
					</div>
				</template>
				<div v-else class="searched-result" v-for="(data, i) in contact_research" :key="i">
					<span v-for="(dataItem, j) in data" :key="j">
						<div class="searched__item" v-if="dataItem.dontRender === null || !Object.keys(dataItem).includes('dontRender')">
							<div @click="displaySearchItem('contact_research', dataItem)">
								<span class="searched__item__group">
									<p class="searched__item-title">{{ dataItem.title }}</p>
									<p v-if="dataItem.meta.relevanceScore" class="searched__item-score">
										{{ (dataItem.meta.relevanceScore * 100).toFixed(2) }}%
									</p>
								</span>
								<p v-if="dataItem.meta.html" class="searched__item-desc" v-html="dataItem.meta.html.snippet"></p>
							</div>
							<div
								v-if="!dataItem.is_bookmarked"
								@click="btnAddToBookMarks({ type: 'contact_research', index: j, ...dataItem })"
								class="url__bookmark__group"
							>
								<a :href="dataItem.url" target="_blank" class="searched__item-url"
									><img src="@/assets/icons/planet-earth.svg" svg-inline />
									<p class="url-text">{{ dataItem.url }}</p></a
								>
								<img src="@/assets/icons/bookman-icon.svg" svg-inline />
							</div>
							<div
								v-else
								@click="btnRemoveFromBookMarks({ type: 'contact_research', index: j, ...dataItem })"
								class="url__bookmark__group"
							>
								<a :href="dataItem.url" target="_blank" class="searched__item-url"
									><img src="@/assets/icons/planet-earth.svg" svg-inline />
									<p class="url-text">{{ dataItem.url }}</p></a
								>
								<img src="@/assets/icons/bookman-icon-dark.svg" svg-inline />
							</div>
						</div>
					</span>
					<dot-loader v-if="loadMore" />
				</div>
			</div>

			<!-- company search -->
			<div class="contact searched__wrapper" v-if="searchType === 'company_research' || screenType === 'large'">
				<div class="searched__wrapper-header">
					<h3 class="title" v-if="screenType === 'large'">Company Research</h3>
					<toggle-dropdown v-else>
						<template #dropdown-wrapper>
							<h3 class="title">
								Company Research
								<img src="@/assets/icons/arrow-dropdown-plane.svg" svg-inline />
							</h3>
						</template>
						<template #dropdown-items>
							<li class="dropdown__item" @click="searchType = 'company_research'">Company Research</li>
							<li class="dropdown__item" @click="searchType = 'contact_research'">Contact Research</li>
						</template>
					</toggle-dropdown>
					<div class="filter-sort">
						<toggle-dropdown>
							<template #dropdown-wrapper>
								<p class="sort">Sort by <img src="@/assets/icons/arrow-dropdown-plane.svg" svg-inline /></p>
							</template>
							<template #dropdown-items>
								<li class="dropdown__item" @click="sortByRecent('company_research')">Recent</li>
								<li class="dropdown__item" @click="sortByRelevance('company_research')">Relevance</li>
							</template>
						</toggle-dropdown>
					</div>
				</div>
				<div class="searched-result" v-for="(data, i) in company_research" :key="i">
					<span v-for="(dataItem, j) in data" :key="j">
						<div
							class="searched__item"
							:id="`searched__item-${j}`"
							v-if="dataItem.dontRender === null || !Object.keys(dataItem).includes('dontRender')"
						>
							<div @click="displaySearchItem('company_research', dataItem)">
								<span class="searched__item__group">
									<p class="searched__item-title">{{ dataItem.title }}</p>
									<p v-if="dataItem.meta.relevanceScore" class="searched__item-score">
										{{ (dataItem.meta.relevanceScore * 100).toFixed(2) }}%
									</p>
								</span>
								<p v-if="dataItem.meta.html" class="searched__item-desc" v-html="dataItem.meta.html.snippet"></p>
							</div>
							<div
								v-if="!dataItem.is_bookmarked"
								@click="btnAddToBookMarks({ type: 'company_research', index: j, ...dataItem })"
								class="url__bookmark__group"
							>
								<a :href="dataItem.url" target="_blank" class="searched__item-url"
									><img src="@/assets/icons/planet-earth.svg" svg-inline />
									<p class="url-text">{{ dataItem.url }}</p></a
								>
								<img src="@/assets/icons/bookman-icon.svg" svg-inline />
							</div>
							<div
								v-else
								@click="btnRemoveFromBookMarks({ type: 'company_research', index: j, ...dataItem })"
								class="url__bookmark__group"
							>
								<a :href="dataItem.url" target="_blank" class="searched__item-url"
									><img src="@/assets/icons/planet-earth.svg" svg-inline />
									<p class="url-text">{{ dataItem.url }}</p></a
								>
								<img src="@/assets/icons/bookman-icon-dark.svg" svg-inline />
							</div>
						</div>
					</span>
					<dot-loader v-if="loadMore" />
				</div>
			</div>

			<!-- </div> -->
		</main>
	</div>
</template>

<script src="./search-result.js"></script>
<style lang="scss" scoped src="./search-result.scss"></style>

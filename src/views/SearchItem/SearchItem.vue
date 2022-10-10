<template>
	<div>
		<v-header />
		<main class="main container container--lg">
			<div class="searched__wrapper" :class="{ 'grey-color': hideSearch }">
				<div class="searched__wrapper-content" v-if="!hideSearch" id="infinite-list">
					<div class="searched__wrapper-header">
						<toggle-dropdown>
							<template #dropdown-wrapper>
								<h3 class="title">
									<template v-if="searchType === 'contact_research'">Contact Research</template>
									<template v-else>Company Research</template>
									<img src="@/assets/icons/arrow-dropdown-plane.svg" svg-inline />
								</h3>
							</template>
							<template #dropdown-items>
								<li class="dropdown__item" @click="(searchType = 'company_research'), (filterValue = [])">
									Company Research
								</li>
								<li class="dropdown__item" @click="(searchType = 'contact_research'), (filterValue = [])">
									Contact Research
								</li>
							</template>
						</toggle-dropdown>

						<div class="filter-sort">
							<toggle-dropdown>
								<template #dropdown-wrapper>
									<p class="sort">Sort by <img src="@/assets/icons/arrow-dropdown-plane.svg" svg-inline /></p>
								</template>
								<template #dropdown-items>
									<li class="dropdown__item" @click="sortByRecent">Recent</li>
									<li class="dropdown__item" @click="sortByRelevance">Relevance</li>
								</template>
							</toggle-dropdown>
						</div>
					</div>

					<div class="searched-result" v-for="(data, i) in research" :key="i">
						<span v-for="(dataItem, j) in data" :key="j">
							<div
								class="searched__item"
								v-if="!Object.keys(dataItem).includes('dontRender') || dataItem.dontRender === null"
								@click="displaySearchItem('company_research', dataItem)"
							>
								<span class="searched__item__group">
									<p class="searched__item-title">{{ dataItem.title }}</p>
									<p v-if="dataItem.meta.relevanceScore" class="searched__item-score">
										{{ (dataItem.meta.relevanceScore * 100).toFixed(2) }}%
									</p>
								</span>
								<p v-if="dataItem.meta.html" class="searched__item-desc" v-html="dataItem.meta.html.snippet"></p>
								<div
									v-if="!dataItem.is_bookmarked"
									@click="btnAddToBookMarks({ type: searchType, index: j, ...dataItem })"
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
									@click="btnRemoveFromBookMarks({ type: searchType, index: j, ...dataItem })"
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
					</div>
				</div>
				<div class="notepad">
					<span class="title-wrapper">
						<p class="notepad-title">Notepad</p>
						<img src="@/assets/icons/collapse.svg" svg-inline v-if="hideSearch" @click="hideSearch = false" />
					</span>
					<textarea
						class="notepad-input"
						:rows="rows"
						cols="50"
						name="text"
						v-model="notepadTXT"
						@focus="expandNotepad"
						@blur="handleTextareaBlur"
						id="textArea"
						placeholder="Write down findings from research."
					>
					</textarea>
				</div>
			</div>
			<div class="item__detail">
				<a :href="getSearchedItem.item.url" target="_blank" class="item__detail-url">{{ getSearchedItem.item.url }}</a>
				<p class="item__detail-title">{{ getSearchedItem.item.description }}</p>
				<p class="item__detail-date" v-if="getSearchedItem.item.meta.published !== null">
					{{ new Date(getSearchedItem.item.meta.published) | moment('Do, MMMM YYYY') }}
				</p>
				<div
					class="filter__tags"
					v-if="getSearchedItem.item.meta.content && Object.keys(getSearchedItem.item.meta.content).length > 0"
				>
					<img class="tag__badge" src="@/assets/icons/tag.svg" alt="" />
					<div class="tag__wrapper">
						<span v-for="(tag, i) in getSearchedItem.item.meta.content.tag" :key="i"
							><c-tag v-if="tag !== null || tag !== ''">{{ tag }}</c-tag></span
						>
					</div>
				</div>

				<template>
					<div
						class="item__detail-content"
						v-if="getSearchedItem.item.meta.content && Object.keys(getSearchedItem.item.meta.content).length > 0"
					>
						<div class="item-content" v-html="getSearchedItem.item.meta.content.html"></div>
					</div>
					<iframe
						v-else
						class="mt-2 iframe-wrapper"
						id="myframe"
						width="100%"
						height="500"
						:src="getSearchedItem.item.url"
					></iframe>
				</template>
			</div>
		</main>
	</div>
</template>

<script src="./search-item.js"></script>

<style src="../SearchResult/search-result.scss" lang="scss" scoped></style>
<style lang="scss" src="./search-item.scss" scoped></style>
<style lang="scss">
.item-content {
	p {
		margin-bottom: 15px;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin-bottom: 10px;
	}
	.default-blue {
		background: #fdd4e1;
	}
}
</style>

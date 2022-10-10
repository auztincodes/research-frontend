<template>
	<div>
		<v-header />
		<main class="main container container--lg">
			<div class="searched__wrapper" :class="{ 'grey-color': hideSearch }">
				<div class="searched__wrapper-content">
					<div class="searched__wrapper-header">
						<toggle-dropdown itemPadding="1rem 1rem 1rem 0">
							<template #dropdown-wrapper>
								<h3 class="title">
									<template v-if="searchType === 'contact_insights'">Contact Insights</template>
									<template v-else>Company Insights</template>
									<img src="@/assets/icons/arrow-dropdown-plane.svg" alt="dropdown icon" svg-inline />
								</h3>
							</template>
							<template #dropdown-items>
								<li class="dropdown__item" @click="searchType = 'company_insights'">Company Insights</li>
								<li class="dropdown__item" @click="searchType = 'contact_insights'">Contact Insights</li>
							</template>
						</toggle-dropdown>
					</div>
					<div class="" v-if="searchType === 'contact_insights'">
						<div class="news-section">
							<div class="section-wrapper">
								<div class="news">
									<h3 class="section-title">News & Articles</h3>
									<div class="filter-sort">
										<toggle-dropdown itemPadding=".5rem 0 .5rem .5rem">
											<template #dropdown-wrapper>
												<p class="sort">
													Sort by
													<img src="@/assets/icons/arrow-dropdown-plane.svg" alt="dropdown icon" svg-inline />
												</p>
											</template>
											<template #dropdown-items>
												<li class="dropdown__item" @click="contactSortMethod = 'recent'">Recent</li>
												<li class="dropdown__item" @click="contactSortMethod = 'relevance'">Relevant</li>
											</template>
										</toggle-dropdown>
									</div>
								</div>
								<div class="flex flex__space-center">
									<div ref="content" class="tab-group sm flex">
										<h5 class="tab" :class="{ active: selectedTab === 'All' }" @click="selectedTab = 'All'">All</h5>
										<h5
											v-for="(tab, index) in tabs"
											:key="index"
											class="tab"
											:class="{ active: tab === selectedTab }"
											@click="selectedTab = tab"
										>
											{{ tab }}
										</h5>
									</div>
									<div class="tab-circle" @click="scrollTab">
										<img src="@/assets/icons/arrow-right.svg" alt="arrow right icon" svg-inline />
									</div>
								</div>
							</div>
							<InsightCard
								v-for="(article, j) in contact_insights_categories"
								:key="contact_insights_categories[article]"
								@openModal="
									toggleModalClass(
										'dislikeModal',
										{ type: 'contact_insights', index: j, section: 'news', ...article },
										$event
									)
								"
								@removeDislike="toggleDislike({ type: 'contact_insights', index: j, section: 'news', ...article })"
								:published="article.meta.published ? article.meta.published : null"
								:article="article"
								@bookmark="btnUpdateBookMarks({ type: 'contact_insights', index: j, section: 'news', ...article }, $event)"
								@displayInsight="displaySearchItem('contact_insights', article)"
							/>
						</div>
						<div class="quote-section" v-if="getSearchedResult[searchType].quotes.length > 0">
							<div class="section-wrapper">
								<h3 class="section-title">Quotes</h3>
							</div>
							<InsightCard
								v-for="(quote, index) in getSearchedResult[searchType].quotes"
								:key="index"
								:published="quote.published ? quote.published : null"
								:url="quote.url"
								:quote="quote.text"
								:article="quote"
								@bookmark="btnUpdateBookMarks({ type: 'contact_insights', index: j, section: 'news', ...article }, $event)"
								@displayInsight="displaySearchItem('contact_insights', quote)"
							/>
						</div>
						<div class="otherInsight-section" ref="others">
							<div class="section-wrapper">
								<h3 class="section-title">Other Insights</h3>
							</div>
							<InsightCard
								v-for="(article, j) in contact_other_insights"
								:key="contact_other_insights[article]"
								@openModal="
									toggleModalClass(
										'dislikeModal',
										{ type: 'contact_insights', index: j, section: 'other_insights', ...article },
										$event
									)
								"
								@removeDislike="
									toggleDislike({ type: 'contact_insights', index: j, section: 'other_insights', ...article })
								"
								:published="article.meta.published"
								:article="article"
								@bookmark="
									btnUpdateBookMarks(
										{ type: 'contact_insights', index: j, section: 'other_insights', ...article },
										$event
									)
								"
								@displayInsight="displaySearchItem('contact_insights', article)"
							/>
						</div>
					</div>

					<div class="" v-if="searchType === 'company_insights'">
						<div class="news-section">
							<div class="section-wrapper">
								<div class="news">
									<h3 class="section-title">News</h3>
									<div class="filter-sort">
										<toggle-dropdown itemPadding=".5rem 0 .5rem .5rem">
											<template #dropdown-wrapper>
												<p class="sort">
													Sort by
													<img src="@/assets/icons/arrow-dropdown-plane.svg" alt="dropdown icon" svg-inline />
												</p>
											</template>
											<template #dropdown-items>
												<li class="dropdown__item" @click="companySortMethod = 'recent'">Recent</li>
												<li class="dropdown__item" @click="companySortMethod = 'relevant'">Relevant</li>
											</template>
										</toggle-dropdown>
									</div>
								</div>

								<div class="tab-group flex">
									<h5
										v-for="(tab, index) in companyTabs"
										:key="index"
										class="tab"
										:class="{ active: tab === companyTab }"
										@click="companyTab = tab"
									>
										{{ tab }}
									</h5>
								</div>
							</div>

							<InsightCard
								v-for="(article, j) in company_insights_categories"
								:key="company_insights_categories[article]"
								@openModal="
									toggleModalClass(
										'dislikeModal',
										{ type: 'company_insights', index: j, section: 'news', ...article },
										$event
									)
								"
								@removeDislike="toggleDislike({ type: 'company_insights', index: j, section: 'news', ...article })"
								:published="article.meta.published ? article.meta.published : null"
								@bookmark="btnUpdateBookMarks({ type: 'company_insights', index: j, section: 'news', ...article }, $event)"
								:article="article"
								@displayInsight="displaySearchItem('company_insights', article)"
							/>
						</div>
					</div>
				</div>
				<div class="notepad">
					<span class="title-wrapper">
						<p class="notepad-title">Notepad</p>
						<img
							src="@/assets/icons/collapse.svg"
							alt="close notepad icon"
							svg-inline
							v-if="hideSearch"
							@click="hideSearch = false"
						/>
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
				<p class="item__detail-date" v-if="getSearchedItem.item.meta.published">
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
		<modal
			position="center"
			v-if="dislikeModal"
			:active="true"
			:toggleClass="toggleClass"
			@close="toggleModalClass('dislikeModal', '')"
			maxWidth="400px"
			borderRadius="12px"
			marginTop="10%"
			:showInfo="true"
		>
			<template #title>
				<h4 class="modal__header-title">Not Relevant?</h4>
			</template>
			<template #info>
				<h5>Your feedback will help us improve your results.</h5>
			</template>
			<template #body>
				<div class="modal__content">
					<p class="modal__content-text">
						<RadioBtn
							style="display: block"
							marginBottom="24px"
							id="dislikeOption"
							:options="dislikeOptions"
							name="dislikeChoices"
							v-model="dislikeOption"
						/>
					</p>

					<form v-if="dislikeOption === 'Other'" action="">
						<label class="textLabel" for="dislikeForm">Comment</label>
						<textarea class="textarea" id="dislikeForm" name="dislikeForm" placeholder="Comment here..."> </textarea>
					</form>

					<div class="modal__content-btn">
						<v-button class="config__btn" buttonType="primary" size="full" @click="dislikeResearch">
							<template v-if="!dislikeLoading">Submit</template>
							<Loader v-else />
						</v-button>
					</div>
				</div>
			</template>
		</modal>
	</div>
</template>

<script src="./insight-item.js"></script>

<style src="../SearchResult/search-result.scss" lang="scss" scoped></style>
<style lang="scss" src="./insight-item.scss" scoped></style>
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

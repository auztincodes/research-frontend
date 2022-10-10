<template>
	<div class="">
		<v-header />
		<template v-if="loading">
			<page-load />
		</template>
		<main v-else class="main container container--lg">
			<div v-if="!editNote" class="aside__left">
				<div class="section section__1">
					<h5 class="title">Contact Details</h5>
					<div class="contact__details">
						<div class="text__initials" v-if="contact_details.full_name">
							{{
								contact_details.full_name
									.match(/\b(\w)/g)
									.join('')
									.toUpperCase()
							}}
						</div>
						<div class="text__name__role">
							<div class="name">{{ contact_details.full_name }}</div>
							<div class="role">{{ contact_details.role }}</div>
						</div>
					</div>
				</div>
				<div class="section section__2">
					<div class="contact__address" v-if="contact_details.email !== ''">
						<div class="title">Email Address</div>
						<div class="text">{{ contact_details.email }}</div>
					</div>
					<div class="contact__address">
						<div class="title">Company</div>
						<div class="text">{{ contact_details.company }}</div>
					</div>
					<div class="contact__icon__group">
						<span v-for="(social, i) in contact_details.socials" :key="i">
							<a
								v-if="social.twitter && Object.entries(social.twitter).length > 0"
								:href="validateURL(social.twitter)"
								target="_blank"
								><img src="@/assets/icons/twitter-icon.svg" alt="twitter icon" svg-inline
							/></a>
							<a
								v-if="social.linkedin && Object.entries(social.linkedin).length > 0"
								:href="validateURL(social.linkedin)"
								target="_blank"
								><img src="@/assets/icons/linkedin-icon.svg" alt="linkedin icon" svg-inline
							/></a>
							<a
								v-if="social.website && Object.entries(social.website).length > 0"
								:href="validateURL(social.website)"
								target="_blank"
								><img src="@/assets/icons/world-icon.svg" alt="website icon" svg-inline
							/></a>
							<a
								v-if="social.crunchbase && Object.entries(social.crunchbase).length > 0"
								:href="validateURL(social.crunchbase)"
								target="_blank"
								><img src="@/assets/icons/crunchbase.svg" alt="crunchbase icon" svg-inline
							/></a>
						</span>
					</div>
				</div>
				<div class="section__3">
					<h5 class="last__refresh">
						Last refresh:
						<span
							>{{ contact_details.last_refresh | moment('MMMM D, YYYY') }} |
							{{ contact_details.last_refresh | moment(' h:mm:ss a') }}</span
						>
					</h5>
					<div class="input__group">
						<div @click="RefreshResearch" class="icon refresh mr-1">
							<img
								:class="{ refresh__loading: insightStatus.statusCode === 'UPDATING' || refreshLoading }"
								src="@/assets/icons/refresh.svg"
								svg-inline
								alt="refresh"
							/>
						</div>
						<!-- <div class="icon notification"><img src="@/assets/icons/notification.svg" svg-inline alt="notification" /></div> -->
						<input type="checkbox" :checked="insightStatus.statusCode === 'DONE'" @change="markResearch($event)" />
						<div class="input__label__text">Mark as done</div>
					</div>
				</div>
				<div class="section section__4">
					<h5 class="title">Contact Insight</h5>
					<div class="contact-tabs">
						<p
							v-for="(tab, index) in contactInsightsTab"
							:key="index"
							class="contact-tab"
							:class="{ active: tab.title === selectedInsightTab }"
							@click="scrollToSection(tab)"
						>
							{{ tab.title }}
						</p>
					</div>
				</div>
				<div class="section__5">
					<div class="text">Bookmarked {{ userBookmarksCount }}</div>
					<div v-if="userBookmarksCount !== 0" @click="$router.push({ name: 'Bookmarks', query: { rowId: rowId } })" class="link">
						See All
					</div>
				</div>
				<div class="section__6 bookmarks">
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
				<div class="section__7" @click="editNote = !editNote">
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
					<img src="@/assets/icons/collapse.svg" alt="close notepad icon" svg-inline @click="editNote = false" />
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
					<div class="section-wrapper">
						<h3 class="title" v-if="screenType === 'large'">Contact Insights</h3>
						<toggle-dropdown v-else>
							<template #dropdown-wrapper>
								<h3 class="title">
									Contact Insights
									<img src="@/assets/icons/arrow-dropdown-plane.svg" alt="dropdown icon" svg-inline />
								</h3>
							</template>
							<template #dropdown-items>
								<li class="dropdown__item" @click="searchType = 'company_research'">Company Research</li>
								<li class="dropdown__item" @click="searchType = 'contact_research'">Contact Research</li>
							</template>
						</toggle-dropdown>
					</div>
				</div>
				<div class="snapshot-section" ref="snapshot">
					<div class="section-wrapper">
						<h3 class="section-title">Snapshot</h3>
						<div v-if="contact_insights.snapshot" class="snapshot-info">
							<div class="flex flex__item-center postion" v-if="contact_insights.snapshot.current_employer">
								<img src="@/assets/icons/work.svg" alt="company icon" svg-inline />
								<p class="ml">
									{{ contact_details.full_name }} has
									<template v-if="contact_insights.snapshot.current_employer.current">been working</template>
									<template v-else>worked</template> at
									<span class="main-info">{{ contact_details.company }}</span>
									<template v-if="contact_insights.snapshot.current_employer.start_date">
										for
										{{ contact_insights.snapshot.current_employer.start_date | moment('from', 'now', true) }}</template
									>
								</p>
							</div>
							<div class="flex flex__item-center postion" v-if="contact_insights.snapshot.mentions">
								<img src="@/assets/icons/articles.svg" svg-inline />
								<p class="ml">
									Mentioned in
									<span
										class="main-info"
										@click="scrollToSection((section = { title: 'News & article', ref: 'news-section' }))"
										>{{ contact_insights.snapshot.mentions }} articles</span
									>
								</p>
							</div>
							<div
								class="flex flex__item-center postion"
								v-if="contact_insights.snapshot.interests && contact_insights.snapshot.interests.length > 0"
							>
								<img src="@/assets/icons/convo-bubble.svg" alt="convo icon" svg-inline />
								<p class="ml">
									Speaks most about
									<span class="main-info" v-for="(interest, i) in contact_insights.snapshot.interests" :key="i">
										{{ interest }}
										<template v-if="i !== contact_insights.snapshot.interests.length - 1">, </template>
									</span>
								</p>
							</div>
							<div class="flex flex__item-center postion" v-if="getLinkedinUrl">
								<img src="@/assets/icons/linkedin-icon2.svg" alt="linkedin icon" svg-inline />
								<p
									class="ml"
									v-if="
										contact_insights.snapshot.last_linkedin_activity &&
										Object.entries(contact_insights.snapshot.last_linkedin_activity).length !== 0
									"
								>
									Posted on <a :href="getLinkedinUrl" target="_blank" class="main-info">LinkedIn</a>
									{{ contact_insights.snapshot.last_linkedin_activity | moment('LL') }}
								</p>
								<p class="ml" v-else>Posts on <a :href="getLinkedinUrl" target="_blank" class="main-info">LinkedIn</a></p>
							</div>
							<div class="flex flex__item-center postion" v-if="contact_insights.snapshot.most_viral_tweet">
								<img src="@/assets/icons/twitter-icon2.svg" alt="twitter icon" svg-inline />
								<p class="ml">Most viral tweet from the past 90days:</p>
							</div>
						</div>
						<template v-if="contact_insights.snapshot.most_viral_tweet">
							<Tweet
								:id="contact_insights.snapshot.most_viral_tweet"
								error-message="This tweet could not be loaded"
								error-message-class="tweet--error"
							>
								<div class="spinner">
									<LoadIcon />
								</div>
							</Tweet>
						</template>
					</div>
				</div>

				<div class="news-section" ref="news-section">
					<div class="section-wrapper">
						<div class="news">
							<h3 class="section-title">News & Articles</h3>
							<div class="filter-sort">
								<toggle-dropdown itemPadding=".5rem 0 .5rem .5rem">
									<template #dropdown-wrapper>
										<p class="sort">
											Sort by <img src="@/assets/icons/arrow-dropdown-plane.svg" alt="dropdown icon" svg-inline />
										</p>
									</template>
									<template #dropdown-items>
										<li class="dropdown__item" @click="contactSortMethod = 'recent'">Recent</li>
										<li class="dropdown__item" @click="contactSortMethod = 'relevance'">Relevant</li>
									</template>
								</toggle-dropdown>
							</div>
						</div>

						<TextInput
							class="search-section mb-0"
							type="text"
							placeholder="Search"
							name="contactSearch"
							v-model="contactSearchQuery"
							:icon="{ type: 'search' }"
							backgroundColor="#F5F5F5"
							border="#F5F5F5"
							borderRadius="12px"
							@clear="clearContactSearch"
							searchIconColor="#3A434B"
						/>
					</div>
					<div class="mt-2" v-if="contactFilter === 'search'">
						<InsightCard
							v-for="(article, j) in contactSearchResult"
							:key="contactSearchResult[article]"
							@openModal="
								toggleModalClass(
									'dislikeModal',
									{ type: 'contact_insights', index: j, section: 'news', ...article },
									$event
								)
							"
							@removeDislike="toggleDislike({ type: 'contact_insights', index: j, section: 'news', ...article }, $event)"
							:published="article.meta.published"
							:article="article"
							@bookmark="btnUpdateBookMarks({ type: 'contact_insights', index: j, section: 'news', ...article }, $event)"
							@displayInsight="displaySearchItem('contact_insights', article)"
						/>
					</div>
					<div ref="tabWrapper" class="section-wrapper flex flex__space-center">
						<div ref="content" v-if="!contactFilter" class="tab-group sm flex">
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
						<div v-if="!contactFilter" class="tab-circle" @click="scrollTab">
							<img src="@/assets/icons/arrow-right.svg" alt="arrow-right icon" svg-inline />
						</div>
					</div>
					<div class="section-wrapper">
						<p class="search--error mt-2" v-if="contactFilter === 'empty'">No data found</p>
					</div>
					<template v-if="!contactFilter">
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
							@removeDislike="toggleDislike({ type: 'contact_insights', index: j, section: 'news', ...article }, $event)"
							:published="article.meta.published"
							:article="article"
							@bookmark="btnUpdateBookMarks({ type: 'contact_insights', index: j, section: 'news', ...article }, $event)"
							@displayInsight="displaySearchItem('contact_insights', article)"
						/>
					</template>
				</div>
				<div v-if="!contactFilter && contact_insights.quotes.length > 0" class="quote-section" ref="quotes">
					<div class="section-wrapper">
						<h3 class="section-title">Quotes{{ contact_insights.quotes.length }}</h3>
					</div>
					<InsightCard
						v-for="(quote, index) in contact_insights.quotes"
						:key="index"
						:published="quote.published"
						:url="quote.url"
						:quote="quote.text"
						:article="quote"
						@bookmark="btnUpdateBookMarks({ type: 'contact_insights', index: j, section: 'quotes', ...article }, $event)"
						@displayInsight="displaySearchItem('contact_insights', quote)"
					/>
				</div>
				<div v-if="!contactFilter" class="topics-section" ref="topics">
					<div class="section-wrapper">
						<h3 class="section-title">Topics</h3>
					</div>
					<PieChart class="topics-chart" :chartData="chartData.values" :labels="chartData.labels" />
				</div>
				<div v-if="!contactFilter" class="otherInsight-section" ref="others">
					<div class="section-wrapper">
						<h3 class="section-title">Other Insights</h3>
					</div>
					<InsightCard
						v-for="(otherInsight, j) in contact_other_insights"
						:key="contact_other_insights[otherInsight]"
						@openModal="
							toggleModalClass(
								'dislikeModal',
								{ type: 'contact_insights', index: j, section: 'other_insights', ...otherInsight },
								$event
							)
						"
						@removeDislike="
							toggleDislike({ type: 'contact_insights', index: j, section: 'other_insights', ...otherInsight }, $event)
						"
						:published="otherInsight.meta.published"
						:article="otherInsight"
						@bookmark="
							btnUpdateBookMarks({ type: 'contact_insights', index: j, section: 'other_insights', ...otherInsight }, $event)
						"
						@displayInsight="displaySearchItem('contact_insights', otherInsight)"
					/>
				</div>
			</div>

			<!-- company search -->
			<div class="contact searched__wrapper" v-if="searchType === 'company_research' || screenType === 'large'">
				<div class="section-wrapper">
					<div class="searched__wrapper-header">
						<h3 class="title" v-if="screenType === 'large'">Company Insights</h3>
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
					</div>
					<div class="snapshot-section">
						<h3 class="section-title">Snapshot</h3>
						<div v-if="company_insights.snapshot" class="snapshot-info">
							<div class="flex flex__item-center postion">
								<img src="@/assets/icons/articles.svg" alt="company article icon" svg-inline />
								<p class="ml" v-if="company_insights.snapshot.mentions">
									Mentioned in
									<span
										class="main-info"
										@click="scrollToSection((section = { title: 'News', ref: 'company-news-section' }))"
										>{{ company_insights.snapshot.mentions }} relevant articles</span
									>
									in the past year
								</p>
							</div>
							<div class="flex flex__item-center postion" v-if="company_insights.snapshot.last_funding">
								<img src="@/assets/icons/fund.svg" alt="funds icon" svg-inline />
								<p class="ml">
									Raised a round of
									<span
										class="main-info"
										@click="
											scrollToSection(
												(section = {
													title: 'Funding',
													ref: 'company-tab',
													activate: () => switchToCompanyTab('funding')
												})
											)
										"
										>funding</span
									>
									in
									{{ company_insights.snapshot.last_funding | moment('MMMM YYYY') }}
								</p>
							</div>
							<div class="flex flex__item-center postion" v-if="company_insights.snapshot.interests.length > 0">
								<img class="convo-bubble" src="@/assets/icons/convo-bubble.svg" alt="convo icon" svg-inline />
								<p class="ml">
									Speaks most about
									<span class="main-info" v-for="(interest, i) in company_insights.snapshot.interests" :key="i">
										{{ interest }}
										<template v-if="i !== company_insights.snapshot.interests.length - 1">, </template>
									</span>
								</p>
							</div>
							<div class="flex flex__item-center postion" v-if="company_insights.jobs.length > 0">
								<img src="@/assets/icons/jobs.svg" alt="open jobs icon" svg-inline />
								<p class="ml">Have {{ company_insights.snapshot.jobs }} <span class="main-info">open jobs</span></p>
							</div>
						</div>
					</div>
				</div>

				<div class="news-section" ref="company-news-section">
					<div class="section-wrapper">
						<div class="news">
							<h3 class="section-title">News</h3>
							<div class="filter-sort">
								<toggle-dropdown itemPadding=".5rem 0 .5rem .5rem">
									<template #dropdown-wrapper>
										<p class="sort">
											Sort by <img src="@/assets/icons/arrow-dropdown-plane.svg" alt="dropdown icon" svg-inline />
										</p>
									</template>
									<template #dropdown-items>
										<li class="dropdown__item" @click="companySortMethod = 'recent'">Recent</li>
										<li class="dropdown__item" @click="companySortMethod = 'relevant'">Relevant</li>
									</template>
								</toggle-dropdown>
							</div>
						</div>
						<TextInput
							class="search-section mb-0"
							type="text"
							placeholder="Search"
							name="companySearch"
							v-model="companySearchQuery"
							:icon="{ type: 'search' }"
							backgroundColor="#F5F5F5"
							border="#F5F5F5"
							borderRadius="12px"
							@clear="clearCompanySearch"
							searchIconColor="#3A434B"
						/>
					</div>
					<div class="mt-2" v-if="companyFilter === 'search'">
						<InsightCard
							v-for="(article, j) in companySearchResult"
							:key="companySearchResult[article]"
							@openModal="
								toggleModalClass(
									'dislikeModal',
									{ type: 'company_insights', index: j, section: 'news', ...article },
									$event
								)
							"
							@removeDislike="toggleDislike({ type: 'company_insights', index: j, section: 'news', ...article }, $event)"
							:published="article.meta.published"
							:article="article"
							@bookmark="btnUpdateBookMarks({ type: 'company_insights', index: j, section: 'news', ...article }, $event)"
							@displayInsight="displaySearchItem('company_insights', article)"
						/>
					</div>
					<div v-if="!companyFilter" class="section-wrapper tab-group flex" ref="company-tab">
						<h5
							v-for="(tab, index) in companyTabs"
							:key="index"
							class="tab"
							:class="{ active: tab === companyTab }"
							@click="switchToCompanyTab(tab)"
						>
							<p>{{ tab }}</p>
						</h5>
					</div>
					<div class="section-wrapper">
						<p class="search--error mt-2" v-if="companyFilter === 'empty'">No data found</p>
					</div>
					<template v-if="!companyFilter">
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
							:published="article.meta.published"
							:article="article"
							@bookmark="btnUpdateBookMarks({ type: 'company_insights', index: j, section: 'news', ...article }, $event)"
							@displayInsight="displaySearchItem('company_insights', article)"
						/>
					</template>
				</div>
				<div class="jobs-section" v-if="company_insights.jobs.length > 0">
					<div class="jobs-header flex flex__space-center">
						<h3 class="section-title">Open Jobs</h3>
						<div class="open-roles">
							<p class="roles-number">{{ company_insights.jobs.length }} Open roles</p>
						</div>
					</div>
					<div class="job flex flex__space-center" v-for="(job, i) in company_insights.jobs" :key="i">
						<h4 class="title">{{ job.role }}</h4>
						<div>
							<p class="location">{{ job.location }}</p>
							<p class="type">{{ job.employment_type }}</p>
						</div>
					</div>
				</div>
			</div>
		</main>
		<!-- Dislike Modal -->
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
						<textarea class="textarea" id="dislikeForm" name="dislikeForm" placeholder="Comment here..." v-model="otherComment">
						</textarea>
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

<script src="./insights.js"></script>
<style lang="scss" scoped src="./insights.scss"></style>

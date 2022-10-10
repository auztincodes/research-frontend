<template>
	<div class="card" @click="$emit('displayInsight')">
		<div class="card-wrapper">
			<h4 v-if="article.title" class="title">
				{{ article.title }}
			</h4>
			<q v-if="article.text" class="quote">{{ quote }}</q>

			<p class="content" v-if="article.meta.html" v-html="article.meta.html.snippet"></p>
			<div @click.stop="" class="details flex flex__item-center flex-spaced">
				<div class="article-details flex flex__item-center">
					<img class="gap" src="../../assets/icons/calendar.svg" alt="" />
					<a class="article-link" :href="article.url" target="_blank" rel="noopener noreferrer"
						><p>
							<template v-if="published">{{ published | moment('LL') }} |</template> {{ cleanUrl }}
						</p></a
					>
				</div>

				<div class="flex flex__item-center">
					<template>
						<svg
							class="mr-1 icon"
							@click="$emit('bookmark', !article.is_bookmarked ? 'add' : 'remove')"
							width="21"
							height="21"
							:fill="!article.is_bookmarked ? 'none' : 'black'"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M5.088 4.353c0-.92.747-1.667 1.667-1.667h8.333c.92 0 1.667.746 1.667 1.667v13.333l-5.833-2.916-5.834 2.916V4.353z"
								stroke="#333758"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</template>
					<template>
						<img
							class="icon"
							v-if="!article.is_disliked"
							@click="$emit('openModal')"
							src="../../assets/icons/dislike-icon.svg"
							svg-inline
							alt=""
						/>
						<img
							class="icon"
							v-else
							@click="$emit('removeDislike')"
							src="../../assets/icons/disliked-icon.svg"
							svg-inline
							alt=""
						/>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./insightCard.js"></script>
<style lang="scss" scoped>
@import './insightCard.scss';
</style>

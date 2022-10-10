<template>
	<main class="main container container--lg">
		<div class="aside__left" v-if="showAside">
			<div class="section section__loader">
				<div class="header item"></div>
				<div class="contact__details">
					<div class="text__initials item"></div>
					<div class="text__name__role">
						<div class="name item"></div>
						<div class="role item"></div>
					</div>
				</div>
				<div class="contact__details" v-for="contact in 3" :key="contact">
					<div class="">
						<div class="title item"></div>
						<div class="content item" v-for="item in 6" :key="item"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="searched__wrapper section__loader">
			<div class="section__wrapper-header">
				<div class="title item"></div>
				<div class="filter-sort">
					<div class="first item"></div>
					<div class="second item"></div>
				</div>
			</div>
			<div class="section__item" v-for="section in 3" :key="section">
				<div class="title item"></div>
				<div class="desc">
					<div class="desc-item item" v-for="item in 4" :key="item"></div>
				</div>
				<div class="link">
					<div class="globe item"></div>
					<div class="url item"></div>
				</div>
			</div>
		</div>
		<div class="searched__wrapper section__loader">
			<div class="section__wrapper-header">
				<div class="title item"></div>
				<div class="filter-sort">
					<div class="first item"></div>
					<div class="second item"></div>
				</div>
			</div>
			<div class="section__item" v-for="section in 3" :key="section">
				<div class="title item"></div>
				<div class="desc">
					<div class="desc-item item" v-for="item in 4" :key="item"></div>
				</div>
				<div class="link">
					<div class="globe item"></div>
					<div class="url item"></div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	props: {
		showAside: {
			default: true,
			type: Boolean
		}
	}
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
.main {
	display: flex;
}
.aside__left {
	width: 300px;
	padding-right: 1em;
	padding-top: 1em;
	margin: 0 auto;
	.section__loader {
		border-left: none;
		.header {
			width: 125px;
			height: 20px;
		}
		.contact__details {
			margin-top: 1em;
			display: flex;
			align-items: center;
			padding-bottom: 1em;
			border-bottom: 1px solid #eaebeb;
			.text__initials {
				border-radius: 50%;
				width: 40px;
				height: 40px;
			}
			.text__name__role {
				margin-left: 1em;
				.name {
					width: 52px;
					height: 16px;
					margin-bottom: 6px;
				}
				.role {
					width: 30px;
					height: 16px;
				}
			}
			.title {
				height: 15px;
				width: 115px;
				margin-bottom: 10px;
			}
			.content {
				width: 223px;
				height: 6px;
				margin-bottom: 11px;
			}
		}
	}
}
.section__loader {
	padding: 32px 24px 32px 24px;
	border-left: 1px solid #f2f2f2;
	.section__wrapper-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 28px;
		margin-top: 16px;
		padding-left: 24px;
		width: 450px;
		.title {
			height: 26px;
			width: 189px;
		}
		.filter-sort {
			display: flex;
			align-items: center;
			.first {
				width: 75px;
				height: 18px;
			}
			.second {
				width: 22px;
				height: 22px;
				margin-left: 34px;
				margin-right: 12px;
			}
		}
	}
	.section__item {
		max-width: 450px;
		padding: 1em 1.5em;
		.title {
			width: 402px;
			height: 15px;
		}
		.desc {
			margin: 20px 0 40px;
			.desc-item {
				height: 7px;
				width: 402px;
				margin-bottom: 11px;
			}
		}
		.link {
			display: flex;
			align-items: center;
			.globe {
				width: 20px;
				height: 20px;
				margin-right: 15px;
				border-radius: 50%;
			}
			.url {
				height: 6px;
				width: 402px;
			}
		}
	}
}
.item {
	background: linear-gradient(90deg, #f8f9fb, #e2e6f3, #f8f9fb, #e2e6f3);
	animation: skeleton 2s ease infinite;
	background-size: 300% 100%;
}
@-webkit-keyframes skeleton {
	0% {
		background-position: 100% 0;
	}

	100% {
		background-position: 0 0;
	}
}
@keyframes skeleton {
	0% {
		background-position: 100% 0;
	}

	100% {
		background-position: 0 0;
	}
}
</style>

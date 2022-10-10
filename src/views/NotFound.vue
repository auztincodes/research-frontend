<template>
	<div class="container">
		<header class="header">
			<img src="@/assets/icons/404.svg" alt="" />
		</header>
		<main class="content">
			<h4 class="content__title">Oops!!! page not found</h4>
			<p class="content__desc">Sorry, we can’t find the page that you are looking for. Kindly return to the home page.</p>
			<c-button size="small" buttonType="primary" @click="$router.push({ name: 'Search' })">Back to Home</c-button>
		</main>
	</div>
</template>

<script>
import CButton from '@/components/Button';
export default {
	components: {
		CButton
	}
};
</script>
<style lang="scss" scoped src="./auth/auth.scss"></style>

<style lang="scss" scoped>
.content {
	max-width: 465px;
	text-align: center;
	margin: 42px auto 0;
	&__title {
		font-weight: 400;
		font-size: 46px;
		line-height: 48px;
		letter-spacing: -0.008em;
	}
	&__desc {
		font-size: 16px;
		padding: 0 20px;
		line-height: 28px;
		margin: 24px 0;
		text-align: center;
		letter-spacing: -0.002em;
	}
}
</style>

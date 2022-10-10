<template>
	<div class="container">
		<header class="header">
			<logo />
		</header>
		<main class="main">
			<div class="auth">
				<div class="auth-header">
					<h3>Check Your Inbox</h3>
					<p>Password reset link has been sent to your inbox</p>
				</div>
				<div class="inbox">
					<img src="@/assets/icons/mailbox.svg" svg-inline />
				</div>
			</div>
		</main>
	</div>
</template>

<script>
import Logo from '@/components/Logo';
export default {
	name: 'check-inbox',
	components: {
		Logo
	}
};
</script>
<style lang="scss" scoped src="../auth.scss"></style>
<style lang="scss" scoped>
.inbox {
	display: flex;
	justify-content: center;
	margin-top: 63px;
}
</style>

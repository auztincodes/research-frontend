<template>
	<div class="container">
		<header class="header">
			<logo />
		</header>
		<main class="main">
			<div class="auth">
				<div class="auth-header">
					<h3>Forgot Password</h3>
					<p>Enter your email to reset password</p>
				</div>
				<form @submit.prevent="submit">
					<ValidationObserver v-slot="{ invalid }">
						<div class="auth-input">
							<text-input
								type="email"
								rules="required"
								labelVisible
								v-model="email"
								width="100%"
								name="Email Address"
								placeholder="yourmail@email.com"
							/>

							<c-button class="" submitType="submit" :disabled="invalid" size="full" buttonType="primary">
								<template v-if="!loading">Recover Password</template>
								<Loader v-else />
							</c-button>
							<div class="forgot-password text-center">
								<router-link to="/login">Return to Login</router-link>
							</div>
						</div>
					</ValidationObserver>
				</form>
			</div>
		</main>
	</div>
</template>

<script src="./forgot-password.js"></script>
<style lang="scss" scoped src="../auth.scss"></style>

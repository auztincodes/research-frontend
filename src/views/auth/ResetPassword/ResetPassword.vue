<template>
	<div class="container">
		<header class="header">
			<logo />
		</header>
		<main class="main">
			<div class="auth">
				<div class="auth-header">
					<h3>Reset Password</h3>
					<p>Enter new password to proceed</p>
				</div>
				<form @submit.prevent="changePassword">
					<ValidationObserver v-slot="{ invalid }">
						<div class="auth-input">
							<password-input
								type="password"
								v-model="form.password"
								rules="required"
								width="100%"
								name="New Password"
								:showPasswordBar="false"
								placeholder="Enter Password"
							/>
							<c-button class="" :disabled="invalid" size="full" buttonType="primary" submitType="submit">
								<template v-if="!loading">Reset Password</template>
								<Loader v-else />
							</c-button>
						</div>
					</ValidationObserver>
				</form>
			</div>
		</main>
	</div>
</template>

<script src="./reset-password.js"></script>
<style lang="scss" scoped src="../auth.scss"></style>

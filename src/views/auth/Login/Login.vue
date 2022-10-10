<template>
	<div class="container">
		<header class="header">
			<logo />
		</header>
		<main class="main">
			<div class="auth">
				<div class="auth-header">
					<h3>Login</h3>
					<p>Enter details to proceed</p>
				</div>
				<form @submit.prevent="submit">
					<ValidationObserver v-slot="{ invalid }">
						<div class="auth-input">
							<text-input
								type="email"
								rules="required"
								labelVisible
								v-model="form.email"
								width="100%"
								name="Email Address"
								placeholder="yourmail@email.com"
							/>
							<password-input
								type="password"
								v-model="form.password"
								rules="required"
								width="100%"
								name="Password"
								:showPasswordBar="false"
								placeholder="Enter Password"
							/>
							<div class="forgot-password">
								<router-link to="/forgot-password">Forgot Password?</router-link>
							</div>
							<c-button class="submit" submitType="submit" :disabled="invalid" size="full" buttonType="primary">
								<template v-if="!loading">Login</template>
								<Loader v-else />
							</c-button>
						</div>
					</ValidationObserver>
				</form>
			</div>
		</main>
	</div>
</template>

<script src="./login.js"></script>
<style lang="scss" scoped src="../auth.scss"></style>

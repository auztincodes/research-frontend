<template>
	<div class="container">
		<header class="header">
			<logo />
		</header>
		<main class="main">
			<div class="auth">
				<div class="auth-header">
					<h3>Admin Invite</h3>
					<p>Enter details to proceed</p>
				</div>
				<form @submit.prevent="submit">
					<ValidationObserver v-slot="{ invalid }">
						<div class="auth-input">
							<text-input
								type="text"
								rules="required"
								labelVisible
								v-model="form.first_name"
								width="100%"
								name="First Name"
								placeholder="John"
							/>
							<text-input
								type="text"
								rules="required"
								labelVisible
								v-model="form.last_name"
								width="100%"
								name="Last Name"
								placeholder="Stones"
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
							<c-button class="submit" :disabled="invalid" size="full" buttonType="primary" submitType="submit">
								<template v-if="!loading">Submit</template>
								<Loader v-else />
							</c-button>
						</div>
					</ValidationObserver>
				</form>
			</div>
		</main>
	</div>
</template>

<script src="./admin-invite.js"></script>
<style lang="scss" scoped src="../auth.scss"></style>

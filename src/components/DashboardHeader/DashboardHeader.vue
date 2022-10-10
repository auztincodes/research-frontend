<template>
	<div class="dashboard-header">
		<div class="user-details">
			<h4 class="user-details__name">{{ `${loggedInUser.first_name} ${loggedInUser.last_name}` }}</h4>
			<h4 class="user-details__role">{{ loggedInUser.role }}</h4>
		</div>
		<div>
			<toggle-dropdown itemPadding="0">
				<template #dropdown-wrapper>
					<div class="flex flex__item-center">
						<div class="topCircle">
							<p class="user__initials">
								{{ loggedInUser.first_name.charAt(0).toUpperCase() }}{{ loggedInUser.last_name.charAt(0).toUpperCase() }}
							</p>
						</div>
						<img src="@/assets/icons/arrow-dropdown-plane.svg" alt="drop down arrow" svg-inline />
					</div>
				</template>
				<template #dropdown-items>
					<li class="dropdown__item" @click="$router.push({ name: 'ContactResearch' })">Contacts</li>
					<li id="logout" class="dropdown__item" @click="logoutUser">Log out</li>
				</template>
			</toggle-dropdown>
		</div>
	</div>
</template>

<script src="./DashboardHeader.js"></script>

<style lang="scss" scoped>
@import './DashboardHeader.scss';
</style>

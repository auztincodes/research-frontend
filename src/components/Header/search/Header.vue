<template>
	<header>
		<nav class="navbar">
			<div class="nav-item logo">
				<logo />
			</div>
			<div class="nav__menu__right">
				<img
					class="search__icon__wrapper"
					@click="$router.push({ name: 'Search' })"
					src="@/assets/icons/search-icon.svg"
					svg-inline
				/>

				<div class="user__menu__wrapper">
					<v-toggle-dropdown class="user__dropdown__menu">
						<template #dropdown-wrapper>
							<img class="mr-1" src="@/assets/icons/user-icon.svg" svg-inline />
							<img src="@/assets/icons/carret-down.svg" svg-inline />
						</template>
						<template #dropdown-items>
							<li class="dropdown__item" @click="$router.push({ name: 'ApiPortal' })">API Keys</li>
							<li class="dropdown__item" @click="$router.push({ name: 'Bookmarks' })">Bookmarks</li>
							<li
								class="dropdown__item"
								v-if="loggedInUser.role !== 'user'"
								@click="$router.push({ path: '/dashboard/users' })"
							>
								Dashboard
							</li>
							<li class="dropdown__item" @click="gotoSettings">Settings</li>
							<li class="dropdown__item" @click="logoutUser">Logout</li>
						</template>
					</v-toggle-dropdown>
				</div>
			</div>
		</nav>
	</header>
</template>

<script>
import VToggleDropdown from '@/components/ToggleDropdown';
import Logo from '@/components/Logo';
import { mapMutations, mapGetters } from 'vuex';

export default {
	name: 'searchResultHeader',
	components: {
		VToggleDropdown,
		Logo
	},
	computed: {
		...mapGetters({
			loggedInUser: 'auth/getLoggedUser'
		})
	},
	methods: {
		...mapMutations({
			logout: 'auth/logout'
		}),
		gotoSettings() {
			this.showMoreSearchSettings = !this.showMoreSearchSettings;
			this.$router.push('/settings');
		},
		logoutUser() {
			this.logout();
			this.$router.push('/login');
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
.navbar {
	margin: 32px 0 85px;
	display: block;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.nav-item {
	&.logo {
		display: flex;
		align-items: center;
		&-text {
			line-height: 1.25;
			letter-spacing: -0.57px;
			font-size: 24px;
		}
	}
}
.nav__menu__right {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.search__icon__wrapper {
		margin-right: 25px;
		cursor: pointer;
	}
	.user__menu__wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 5px;
		.user__dropdown__menu {
			.dropdown__list-wrapper {
				top: 100%;
			}
		}
	}
}
</style>

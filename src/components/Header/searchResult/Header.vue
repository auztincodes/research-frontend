<template>
	<header class="header">
		<nav class="navbar">
			<div class="nav__back" @click="$router.push({ name: 'ContactResearch' })">
				<img class="icon" src="@/assets/icons/arrow-back.svg" svg-inline />
				<div class="text">Back to contact list</div>
			</div>
			<div class="nav__menu__right">
				<div class="research" @click="$router.push({ name: 'ContactResearch' })">Contact Research</div>
				<img
					class="search__icon__wrapper"
					src="@/assets/icons/search-icon.svg"
					@click="$router.push({ name: 'Search' })"
					svg-inline
				/>
				<!-- </div> -->
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
import { mapMutations, mapGetters } from 'vuex';

export default {
	name: 'searchResultHeader',
	components: {
		VToggleDropdown
	},
	computed: {
		...mapGetters({
			loggedInUser: 'auth/getLoggedUser'
		})
	},
	methods: {
		...mapMutations({
			logout: 'auth/logout',
			setLastSearchResult: 'auth/setLastSearchResult'
		}),
		gotoSettings() {
			this.showMoreSearchSettings = !this.showMoreSearchSettings;
			this.$router.push('/settings');
		},
		logoutUser() {
			const route = this.$router.currentRoute.fullPath;
			const email = this.loggedInUser.email;

			const substring = '/insights?rowId=';
			if (route.indexOf(substring) !== -1) {
				this.setLastSearchResult({ email, route });
				this.logout();
				this.$router.push('/login');
			} else {
				this.logout();
				this.$router.push('/login');
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
.header {
	position: sticky;
	top: 0;
	z-index: 2;
	background-color: #fff;
}
.navbar {
	display: flex;
	justify-content: space-between;
	padding: 1em;
	align-items: center;
	padding: 1em 3em;
	border-bottom: 1px solid #f2f2f2;
}
.nav__back {
	display: flex;
	align-items: center;
	cursor: pointer;
	.text {
		margin-left: 0.5em;
		font-family: Karla;
		font-style: normal;
		font-weight: normal;
		font-size: 15px;
		line-height: 18px;
		letter-spacing: -0.117188px;
		color: #394141;
	}
	.icon {
	}
}
.nav__menu__right {
	display: flex;
	// grid-template-columns: 1fr 1fr;
	align-items: center;
	.search__icon__wrapper {
		margin-right: 25px;
		cursor: pointer;
	}
}
.research {
	margin-right: 15px;
	cursor: pointer;
}
@include query(mobile, max) {
	.navbar {
		padding: 1em 2em;
	}
}
</style>

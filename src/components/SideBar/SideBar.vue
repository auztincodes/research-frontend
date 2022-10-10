<template>
	<aside class="sidebar">
		<div class="sidebar__header">
			<span>
				<img src="@/assets/icons/volley-logo-white.svg" alt="" />
			</span>
		</div>
		<div class="sidebar__tabs">
			<ul>
				<router-link
					active-class="active"
					tag="li"
					class="single-tab"
					custom
					:to="{ name: 'Users' }"
					v-slot="{ href, navigate, isExactActive }"
				>
					<a :class="{ active: isExactActive || activeTab === 'user' }" :href="href" @click="navigate">
						<span class="single-tab__icon">
							<img src="@/assets/icons/user-menu.svg" alt="" />
						</span>
						Users
					</a>
				</router-link>
				<router-link
					active-class="active"
					tag="li"
					class="single-tab"
					custom
					:to="{ name: 'Admin' }"
					v-slot="{ href, navigate, isExactActive }"
				>
					<a :class="{ active: isExactActive || activeTab === 'admin' }" :href="href" @click="navigate">
						<span class="single-tab__icon">
							<img src="@/assets/icons/admin-menu.svg" alt="" />
						</span>
						Admin Management
					</a>
				</router-link>
			</ul>
		</div>
		<!-- </div> -->
	</aside>
</template>

<script>
export default {
	data() {
		return {
			activeTab: ''
		};
	},
	created() {
		this.activeTab = this.$route.meta;
	},
	watch: {
		$route() {
			this.activeTab = this.$route.meta;
		}
	}
};
</script>

<style lang="scss" scoped>
@import './SideBar.scss';
</style>

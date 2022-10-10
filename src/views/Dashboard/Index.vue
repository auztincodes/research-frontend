<template>
	<div class="dashboard-wrapper">
		<SideBar />
		<div class="dashboard-body">
			<MainHeader />
			<router-view />
		</div>
	</div>
</template>

<script>
import SideBar from '@/components/SideBar';
import MainHeader from '@/components/DashboardHeader';

export default {
	name: 'Dashboard',
	components: {
		SideBar,
		MainHeader
	}
};
</script>

<style scoped>
.dashboard-body {
	margin-left: 248px;
	background-color: #ffffff;
	padding: 16px 32px;
}
</style>

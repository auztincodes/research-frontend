import Vue from 'vue';
import { noAuthOnly, requireUserAuth, requireAdminAuth } from '../utils/auth';
import VueRouter from 'vue-router';
import Search from '../views/Search/Search.vue';
import SearchResult from '../views/SearchResult/SearchResult.vue';
import Insights from '../views/Insights/Insights.vue';
import InsightItem from '../views/InsightItem/InsightItem.vue';
import SearchItem from '../views/SearchItem/SearchItem.vue';
import SettingsView from '../views/Settings/Settings.vue';
import ContactResearch from '../views/ContactResearch/ContactResearch.vue';
import Bookmarks from '../views/Bookmarks/Bookmarks.vue';

const NotFound = () => import(/* webpackChunkName: 'login' */ '../views/NotFound.vue');
const Login = () => import(/* webpackChunkName: 'login' */ '../views/auth/Login');
const ForgotPassword = () => import(/* webpackChunkName: 'login' */ '../views/auth/ForgotPassword');
const CheckInbox = () => import(/* webpackChunkName: 'login' */ '../views/auth/ForgotPassword/CheckInbox');
const ResetPassword = () => import(/* webpackChunkName: 'login' */ '../views/auth/ResetPassword');
const AdminInvite = () => import(/* webpackChunkName: 'login' */ '../views/auth/AdminInvite');
const Dashboard = () => import(/* webpackChunkName: 'login' */ '../views/Dashboard/Index.vue');
const Admin = () => import(/* webpackChunkName: 'login' */ '../views/Dashboard/Admin');
const Users = () => import(/* webpackChunkName: 'login' */ '../views/Dashboard/Users');
const User = () => import(/* webpackChunkName: 'login' */ '../views/Dashboard/User');
const Api = () => import(/* webpackChunkName: 'ApiPortal' */ '../views/ApiPortal');

Vue.use(VueRouter);

const routes = [
	{
		path: '*',
		name: 'not-found',
		component: NotFound
	},
	{
		path: '/dashboard',
		component: Dashboard,
		beforeEnter: requireAdminAuth,
		children: [
			{
				path: '',
				name: 'Admin',
				component: Admin
			},
			{
				path: 'users',
				name: 'Users',
				component: Users
			},
			{
				path: 'user/:userId?',
				name: 'User',
				component: User,
				meta: 'user'
			}
		]
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		beforeEnter: noAuthOnly
	},
	{
		path: '/forgot-password',
		name: 'ForgotPassword',
		component: ForgotPassword,
		beforeEnter: noAuthOnly
	},
	{
		path: '/check-inbox',
		name: 'CheckInbox',
		component: CheckInbox,
		beforeEnter: noAuthOnly
	},
	{
		path: '/reset-password',
		name: 'ResetPassword',
		component: ResetPassword,
		beforeEnter: noAuthOnly
	},
	{
		path: '/admin/invite',
		name: 'AdminInvite',
		component: AdminInvite,
		beforeEnter: noAuthOnly
	},
	{
		path: '/',
		name: 'Search',
		component: Search,
		beforeEnter: requireUserAuth,
		children: [
			{
				path: '/settings',
				name: 'SearchSettings',
				component: SettingsView,
				props: true,
				meta: {
					showMoreSearchSettings: true
				}
			}
		]
	},
	{
		path: '/search-result/:rowId?',
		name: 'SearchResult',
		component: SearchResult,
		beforeEnter: requireUserAuth
	},
	{
		path: '/insights',
		name: 'Insights',
		component: Insights,
		beforeEnter: requireUserAuth
	},
	{
		path: '/insight-item',
		name: 'InsightItem',
		component: InsightItem,
		beforeEnter: requireUserAuth
	},
	{
		path: '/search-item',
		name: 'SearchItem',
		component: SearchItem,
		beforeEnter: requireUserAuth
	},
	{
		path: '/contact-research',
		name: 'ContactResearch',
		component: ContactResearch,
		beforeEnter: requireUserAuth
	},
	{
		path: '/bookmarks/:rowId?',
		name: 'Bookmarks',
		component: Bookmarks,
		beforeEnter: requireUserAuth
	},
	{
		path: '/api-portal',
		name: 'ApiPortal',
		component: Api,
		beforeEnter: requireUserAuth
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	linkActiveClass: 'active'
});

export default router;

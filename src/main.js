import Vue from 'vue';
import App from './App.vue';
import jwtDecode from 'jwt-decode';
import VueSession from 'vue-session';
import router from './router';
import store from './store';
import axios from './services/axios-instance';
import { clearSession, setSession } from './utils/auth';
import { mapActions, mapMutations } from 'vuex';
const Paginate = require('vuejs-paginate');

const options = {
	persist: true
};

Vue.use(VueSession, options);
Vue.use(require('vue-moment'));
Vue.component('paginate', Paginate);
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	data() {
		return {
			userId: null
		};
	},
	created() {
		axios.interceptors.request.use(
			(config) => {
				this.validateSession();
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);
		this.validateSession();
	},
	watch: {
		isLoggedIn(value) {
			if (value) {
				this.startSession(this.loggedUser);
				this.userId = this.loggedUser.id;
			}
		}
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters['auth/isLoggedIn'];
		},
		loggedUser() {
			return this.$store.getters['auth/getLoggedUser'];
		},
		getApiKey() {
			return this.$store.getters['merchant_services/getApiKey'];
		}
	},
	methods: {
		...mapMutations({
			saveApiKey: 'merchant_services/saveApiKey'
		}),
		...mapActions({
			generateApiKey: 'auth/generateApiKey'
		}),

		async startSession(data) {
			this.$session.start();
			this.$session.set('user', data);
			this.$session.set('token', this.loggedUser.token);
			setSession(data);
			axios.defaults.headers.common.Authorization = `Bearer ${this.loggedUser.token}`;
		},
		/**
		 * Ends a user session and redirects to logs user out
		 */
		endSession() {
			this.$session.clear();
			this.$session.destroy();
			clearSession();
			delete axios.defaults.headers.common.Authorization;
			store.commit('auth/logout');
			setTimeout(() => {
				// redirect to login
				this.$router.push('/login');
				document.location.reload();
			}, 500);
		},
		/**
		 * Resumes user session
		 */
		resumeSession() {
			const token = this.$session.get('token');
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
		},
		/**
		 * Check for session still valid
		 */
		validateSession() {
			if (this.isLoggedIn) {
				try {
					const token = jwtDecode(this.loggedUser.token);
					const time = Date.now().valueOf() / 1000;
					if (token.exp < time) {
						this.endSession();
					} else this.resumeSession();
				} catch (error) {
					this.endSession();
					return error;
				}
				return true;
			}
			return true;
		}
	},
	render: (h) => h(App)
}).$mount('#app');

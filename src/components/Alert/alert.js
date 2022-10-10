import { mapGetters, mapActions, mapMutations } from 'vuex';
import AlertIcon from '../../components/AlertIcon';
import VButton from '../Button';
const CautionIcon = () => import('../../assets/icons/caution.svg').default;
const ErrorIcon = () => import('../../assets/icons/error.svg').default;
const InfoIcon = () => import('../../assets/icons/info.svg').default;
const SuccessIcon = () => import('../../assets/icons/success.svg').default;

export default {
	name: 'Alert',
	props: {
		iconType: {
			type: String
		},
		isGlobal: {
			type: Boolean,
			default: true
		},
		showAction: {
			type: Boolean,
			default: false
		},
		actionBtnType: {
			type: String,
			default: 'error'
		}
	},
	computed: {
		...mapGetters(['getAlert']),
		showAlertStatus() {
			return this.getAlert.showAlert;
		},
		alertType() {
			return this.iconType || this.getAlert.status;
		},
		containerModifierClass() {
			return `alert__container--${this.alertType}`;
		},
		alertModifierClass() {
			return `alert--${this.alertType}`;
		}
	},
	created() {
		this.getAlert.showAlert && this.resetAlert();
	},
	methods: {
		...mapMutations(['resetAlert']),
		...mapActions(['showAlert']),
		closeAlert() {
			this.getAlert.showAlert && this.resetAlert();
		}
	},
	components: {
		CautionIcon,
		ErrorIcon,
		InfoIcon,
		SuccessIcon,
		AlertIcon,
		VButton
	}
};

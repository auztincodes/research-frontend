import Tabs from './';
import Tab from './Tab.vue';
export default {
	title: 'Library/Tabs',
	component: Tabs
};

export const Navbar = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { Tabs, Tab },
	template: `<tabs v-bind="$props">
    <tab title="Manual Search" :selected="true">
    <li class="dropdown__item">
    Profile
    </li>
    </tab>
    <tab title="Import Contacts">
        <li class="dropdown__item">
                Profile
        </li>
        <li class="dropdown__item">
            Logout
        </li>
    </tab>
</tabs>`
});

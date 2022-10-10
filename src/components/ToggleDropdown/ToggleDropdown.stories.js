import ToggleDropdown from './';

export default {
	title: 'Library/ToggleDropdown',
	component: ToggleDropdown
};

export const Navbar = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { ToggleDropdown },
	template: `<toggle-dropdown v-bind="$props">
    <template #dropdown-wrapper>
        <svg width="17" height="3">
            <g fill="#D5D5D5" fill-rule="evenodd">
                <circle cx="1.5" cy="1.5" r="1.5" />
                <circle cx="8.5" cy="1.5" r="1.5" />
                <circle cx="15.5" cy="1.5" r="1.5" />
            </g>
        </svg>
    </template>
    <template #dropdown-items>
        <li class="dropdown__item">
                Profile
        </li>
        <li class="dropdown__item">
            Logout
        </li>
    </template>
</toggle-dropdown>`
});

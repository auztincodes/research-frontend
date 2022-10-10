<template>
	<div>
		<div class="page-header">
			<h2 class="title">Users</h2>
			<v-button class="submit" size="large" buttonType="primary" @click="toggleModalClass('createUser')"> Create User </v-button>
		</div>
		<div v-if="!usersLoading" class="search-group">
			<h4 v-if="users" id="totalUsers">{{ users.length }} Users</h4>
			<div class="search-section">
				<!-- <form action=""> -->
				<TextInput
					class="mb-0"
					type="text"
					placeholder="Search"
					v-model="searchQuery"
					:icon="{ type: 'search' }"
					width="509px"
					@clear="clearSearch"
				/>
				<!-- </form> -->
				<span class="ml-1">
					<v-button size="small" buttonType="outline" @click="toggleModalClass('filter')">
						Filter
						<img class="filter-icon" src="@/assets/icons/filter-icon.svg" svg-inline />
					</v-button>
				</span>
			</div>
		</div>

		<div>
			<v-table :loading="usersLoading" :tableHeaders="tableHeaders" :tableData="users" theme="contact__research" @rowClick="showUser">
				<template name="table-row" slot-scope="{ item }">
					<td class="table__row-item">{{ item.last_name }} {{ item.first_name }}</td>
					<td class="table__row-item">{{ item.email }}</td>
					<td class="table__row-item">{{ item.researches_performed }}/{{ item.monthly_research }}</td>
					<td class="table__row-item status">
						<status-tag :status="item.status === 'active' ? 'active' : item.status === 'inactive' ? 'inactive' : 'pending'"
							>{{ item.status }}
						</status-tag>
					</td>
					<td class="table__row-item">
						<template v-if="item.last_research_date"
							>{{ item.last_research_date | moment('MMMM D, YYYY') }} |
							<span class="time">{{ item.last_research_date | moment(' h:mm:ss a') }}</span></template
						>
						<template v-else>-</template>
					</td>
					<td class="table__row-item dropdown" @click.stop>
						<toggle-dropdown>
							<template #dropdown-wrapper>
								<img src="@/assets/icons/menu3dot.svg" svg-inline />
							</template>
							<template #dropdown-items>
								<li class="dropdown__item" @click="showUser(item)">View User</li>
								<li class="dropdown__item" @click="openEditModal({ ...item })">Edit Info</li>
								<li v-if="item.status === 'active'" class="dropdown__item" @click="openSuspendModal(item)">Suspend</li>
								<li v-if="item.status !== 'active'" class="dropdown__item" @click="openActivateModal(item)">Activate</li>
								<li v-if="item.status === 'active'" class="dropdown__item" @click="openDeactivateModal(item)">
									Deactivate
								</li>
							</template>
						</toggle-dropdown>
					</td>
				</template>
			</v-table>
			<div class="table__pagination__wrapper" v-if="!usersLoading">
				<div class="title__left">
					<span>Showing Page</span>
					<span>
						{{ (currentPage - 1) * 10 + 1 }} - <template v-if="nextPage !== null">{{ currentPage * 10 }}</template>
						<template v-else>{{ count }}</template>
					</span>
					<span>of</span>
					<span>{{ count }}</span>
				</div>

				<paginate
					:page-count="total"
					:click-handler="clickCallback"
					:prev-text="'Prev'"
					:next-text="'Next'"
					:container-class="'pagination__list'"
					:page-class="'pagination__list-item'"
				>
				</paginate>
			</div>

			<div v-if="users && users.length < 1">
				<div class="emptyState">
					<img src="@/assets/icons/empty-state-image.svg" svg-inline />
					<p class="emptyState-text">No user record found</p>
				</div>
			</div>
		</div>

		<!-- create user modal -->
		<modal position="right" v-if="createUser" :toggleClass="toggleClass" @close="toggleModalClass('createUser')">
			<template #title>
				<h3>Create User</h3>
			</template>
			<template #body>
				<form action="">
					<ValidationObserver v-slot="{}">
						<div class="auth-input">
							<div class="flex">
								<text-input
									rules="required"
									labelVisible
									labelColor="gray"
									v-model="form.first_name"
									width="204px"
									name="First Name"
									placeholder="John"
								/>
								<text-input
									rules="required"
									labelVisible
									v-model="form.last_name"
									width="204px"
									labelColor="gray"
									name="Last Name"
									placeholder="Doe"
								/>
							</div>

							<text-input
								rules="required"
								labelVisible
								v-model="form.email"
								width="100%"
								labelColor="gray"
								name="Email Address"
								placeholder="johndoe@email.com"
							/>

							<div class="flex">
								<text-input
									type="text"
									rules="required"
									labelVisible
									v-model="form.organisation"
									width="204px"
									labelColor="gray"
									name="Organisation"
									placeholder="Microsoft"
								/>
								<text-input
									type="number"
									rules="required"
									labelVisible
									labelColor="gray"
									v-model="form.monthly_research"
									width="204px"
									name="No. Research/month"
									placeholder="200"
								/>
							</div>
							<div class="flex">
								<text-input
									type="text"
									rules="required"
									labelVisible
									labelColor="gray"
									v-model="form.profession"
									width="204px"
									name="Profession"
									placeholder="Product"
								/>
								<div class="form-group">
									<label class="select-label" for="admin">Role</label>
									<select class="select-input" v-model="form.role" width="204px" name="adminRole" id="adminRole">
										<option value="user">User</option>
										<option value="admin">Admin</option>
										<option value="superAdmin">Super Admin</option>
									</select>
								</div>
							</div>
							<password-input
								type="password"
								v-model="form.password"
								labelColor="gray"
								rules="required"
								width="100%"
								name="Password"
								:showPasswordBar="false"
								placeholder="Enter Password"
							/>
							<div class="flex-end mb-2">
								<v-button class="submit" size="large" buttonType="primary" @click="registerUser">
									<template v-if="!loading">Create Account</template>
									<Loader v-else />
								</v-button>
							</div>
						</div>
					</ValidationObserver>
				</form>
			</template>
		</modal>
		<!-- Filter modal -->
		<modal position="right" v-if="filter" :toggleClass="toggleClass" @close="toggleModalClass('filter')">
			<template #title>
				<h3>Filter</h3>
			</template>
			<template #body>
				<form action="">
					<ValidationObserver v-slot="{}">
						<div class="auth-input">
							<text-input labelVisible width="100%" name="Name" placeholder="John" v-model="filterData" />

							<RadioBtn id="statusType" :options="statusType" name="status" v-model="statusOption" />

							<div class="flex-end flex__item-center">
								<div class="clear-filter" @click="clearFilter()">Clear Filter</div>
								<v-button
									class="submit"
									size="large"
									buttonType="primary"
									@click="searchPage({ q: filterData, status: statusOption })"
								>
									<template v-if="!loading">Apply Search</template>
									<Loader v-else />
								</v-button>
							</div>
						</div>
					</ValidationObserver>
				</form>
			</template>
		</modal>
		<!-- Edit modal -->
		<modal position="right" v-if="showEditModal" :toggleClass="toggleClass" @close="toggleModalClass('showEditModal')">
			<template #title>
				<h3>Edit</h3>
			</template>
			<template #body>
				<form @submit.prevent="">
					<ValidationObserver v-slot="{}" color="#ff0000">
						<div class="auth-input">
							<div class="flex flex-spaced">
								<text-input
									rules="required"
									labelVisible
									labelColor="gray"
									v-model="userInfo.first_name"
									width="204px"
									name="First Name"
									placeholder="John"
								/>
								<text-input
									rules="required"
									labelVisible
									labelColor="gray"
									v-model="userInfo.last_name"
									width="204px"
									name="Last Name"
									placeholder="Doe"
								/>
							</div>

							<text-input
								type="email"
								rules="required"
								labelVisible
								:disabled="true"
								labelColor="gray"
								v-model="userInfo.email"
								width="100%"
								name="Email Address"
								placeholder="johndoe@email.com"
							/>
							<div class="flex flex-spaced">
								<text-input
									type="text"
									rules="required"
									labelVisible
									labelColor="gray"
									v-model="userInfo.organisation"
									width="204px"
									name="Organisation"
									placeholder="Microsoft"
								/>
								<text-input
									rules="required"
									labelVisible
									labelColor="gray"
									v-model.number="userInfo.monthly_research"
									width="204px"
									name="No. Research/month"
									placeholder="200"
								/>
							</div>
							<div class="flex flex-spaced">
								<text-input
									type="text"
									rules="required"
									labelVisible
									labelColor="gray"
									v-model="userInfo.profession"
									width="204px"
									name="Profession"
									placeholder="Product"
								/>
								<div class="form-group">
									<label class="select-label" for="admin">Role</label>
									<select class="select-input" v-model="userInfo.role" width="204px" name="adminRole" id="adminRole">
										<option value="user">User</option>
										<option value="admin">Admin</option>
										<option value="superAdmin">Super Admin</option>
									</select>
								</div>
							</div>
							<div class="flex flex__end">
								<v-button class="submit" size="large" buttonType="primary" @click="editUser" ref="editUser">
									<template v-if="!loading">Save Changes</template>
									<Loader v-else />
								</v-button>
							</div>
						</div>
					</ValidationObserver>
				</form>
			</template>
		</modal>
		<!-- Deactivate Modal -->
		<modal
			position="center"
			v-if="deactivateModal"
			:toggleClass="toggleClass"
			@close="toggleModalClass('deactivateModal')"
			maxWidth="400px"
		>
			<template #title>
				<h4 class="modal__header-title">Deactivate User</h4>
			</template>
			<template #body>
				<div class="modal__content">
					<p class="modal__content-text">
						Kindly confirm that you want to deactivate this user
						<span class="name"> ({{ contactToModify.first_name }} {{ contactToModify.last_name }}) </span>.
					</p>
					<div class="modal__content-btn">
						<div class="cancel" @click="toggleModalClass('deactivateModal')">Cancel</div>
						<v-button class="config__btn" buttonType="warning" size="modal" @click="deactivate">
							<template v-if="!loading">Deactivate</template>
							<Loader v-else />
						</v-button>
					</div>
				</div>
			</template>
		</modal>
		<!-- Activate Modal -->
		<modal
			position="center"
			v-if="activateModal"
			:toggleClass="toggleClass"
			@close="toggleModalClass('activateModal')"
			maxWidth="400px"
		>
			<template #title>
				<h4 class="modal__header-title">Activate User</h4>
			</template>
			<template #body>
				<div class="modal__content">
					<p class="modal__content-text">
						Kindly confirm that you want to activate this user
						<span class="name"> ({{ contactToModify.first_name }} {{ contactToModify.last_name }}) </span>.
					</p>
					<div class="modal__content-btn">
						<div class="cancel" @click="toggleModalClass('activateModal')">Cancel</div>
						<v-button class="config__btn" buttonType="warning" size="modal" @click="activate">
							<template v-if="!loading">Activate</template>
							<Loader v-else />
						</v-button>
					</div>
				</div>
			</template>
		</modal>
		<!-- Suspend Modal -->
		<modal position="center" v-if="suspendModal" :toggleClass="toggleClass" @close="toggleModalClass('suspendModal')" maxWidth="400px">
			<template #title>
				<h4 class="modal__header-title">Suspend User</h4>
			</template>
			<template #body>
				<div class="modal__content">
					<p class="modal__content-text">
						Kindly confirm that you want to suspend this user
						<span class="name"> ({{ contactToModify.first_name }} {{ contactToModify.last_name }}) </span>.
					</p>
					<div class="modal__content-btn">
						<div class="cancel" @click="toggleModalClass('suspendModal')">Cancel</div>
						<v-button class="config__btn" buttonType="warning" size="modal" @click="suspend">
							<template v-if="!loading">Suspend</template>
							<Loader v-else />
						</v-button>
					</div>
				</div>
			</template>
		</modal>
	</div>
</template>

<script src="./users.js"></script>

<style lang="scss" scoped>
@import './Users.scss';
</style>

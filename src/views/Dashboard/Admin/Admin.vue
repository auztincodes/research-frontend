<template>
	<div>
		<div class="page-header">
			<h2 class="title">Admin Management</h2>
			<v-button class="submit" size="large" buttonType="primary" @click="toggleModalClass('sendInvites')">
				<div class="flex">
					<span class="add-icon">
						<img src="@/assets/icons/add-icon.svg" alt="add admin icon" svg-inline />
					</span>
					<p>Send Invite</p>
				</div>
			</v-button>
		</div>
		<div v-if="!adminLoading" class="search-group">
			<h4 v-if="admins">{{ admins.length }} Admins</h4>
			<div class="search-section">
				<TextInput
					class="mb-0"
					type="text"
					placeholder="Search"
					v-model="searchQuery"
					:icon="{ type: 'search' }"
					width="509px"
					@clear="clearSearch"
				/>
				<span class="mx-1"> </span>
			</div>
		</div>
		<div>
			<v-table :loading="adminLoading" :tableHeaders="tableHeaders" :tableData="admins" theme="contact__research">
				<template name="table-row" slot-scope="{ item }">
					<td class="table__row-item">
						<div class="flex flex__item-center">
							<div class="detail__circle">
								<p class="detail__initials" v-if="item.first_name">
									{{ item.first_name.charAt(0).toUpperCase() }}{{ item.last_name.charAt(0).toUpperCase() }}
								</p>
							</div>
							<div>
								<p class="table-content">{{ item.first_name }} {{ item.last_name }}</p>
							</div>
						</div>
					</td>
					<td class="table__row-item">{{ item.email }}</td>
					<td class="table__row-item">{{ item.role }}</td>
					<td class="table__row-item status">
						<status-tag :status="item.status === 'active' ? 'active' : item.status === 'inactive' ? 'inactive' : 'pending'"
							>{{ item.status }}
						</status-tag>
					</td>
					<td class="table__row-item">
						<template v-if="item.updatedAt">
							{{ item.updatedAt | moment('MMMM D, YYYY') }} |
							<span class="time">{{ item.updatedAt | moment(' h:mm:ss a') }}</span>
						</template>
						<template v-else>-</template>
					</td>
					<td class="">
						<toggle-dropdown itemPadding="0">
							<template #dropdown-wrapper>
								<img src="@/assets/icons/menu3dot.svg" alt="menu icon" svg-inline />
							</template>
							<template #dropdown-items>
								<li class="dropdown__item" @click="openEditModal({ ...item })">Edit Info</li>
								<template v-if="loggedInUser && loggedInUser.role === 'superadmin'">
									<li v-if="item.status === 'active'" class="dropdown__item" @click="openSuspendModal(item)">Suspend</li>
									<li v-if="item.status !== 'active'" class="dropdown__item" @click="openActivateModal(item)">
										Activate
									</li>
									<li v-if="item.status === 'active'" class="dropdown__item" @click="openDeactivateModal(item)">
										Deactivate
									</li>
								</template>
							</template>
						</toggle-dropdown>
					</td>
				</template>
			</v-table>

			<div v-if="admins && admins.length < 1">
				<div class="emptyState">
					<img src="@/assets/icons/empty-state-image.svg" alt="empty table icon" svg-inline />
					<p class="emptyState-text">No user record found</p>
					<p class="emptyState-subtext">Click on the button to to Upload Contact</p>
					<v-button size="large" buttonType="primary">Upload Contact</v-button>
				</div>
			</div>
		</div>
		<div class="table__pagination__wrapper" v-if="!adminLoading">
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

		<modal position="right" v-if="sendInvites" :toggleClass="toggleClass" @close="toggleModalClass('sendInvites')">
			<template #title>
				<h3>Admin Invite</h3>
			</template>
			<template #body>
				<p class="modal-text">Enter a registered email address to send admin invite</p>
				<div>
					<ValidationObserver v-slot="{}">
						<form @submit.prevent="inviteAdmin" class="auth-input">
							<label class="form-label form-group" for="">Email</label>
							<div class="email-field">
								<span v-for="(email, index) in emailList" :key="index">
									<InputTag @close="deleteEmail(index)">{{ email }} </InputTag>
								</span>

								<input
									v-if="emailList.length < 1"
									placeholder="johndoe@example.com"
									class="inputField"
									type="email"
									@keyup.enter="addEmail"
									v-model="emailInput"
								/>
								<input v-else class="inputField" type="email" @keyup.enter="addEmail" v-model="emailInput" />
							</div>

							<div class="flex flex__end" id="inviteAdmin">
								<v-button class="submit" size="large" submitType="submit" buttonType="primary" ref="inviteAdmin">
									<template v-if="!loading">Send Invite</template>
									<Loader v-else />
								</v-button>
							</div>
						</form>
					</ValidationObserver>
				</div>
			</template>
		</modal>

		<modal position="right" v-if="showEditModal" :toggleClass="toggleClass" @close="toggleModalClass('showEditModal')">
			<template #title>
				<h3>Edit Info</h3>
			</template>
			<template #body>
				<form @submit.prevent="editAdmin">
					<div class="auth-input">
						<div class="flex flex-spaced">
							<text-input
								labelVisible
								rules="required"
								labelColor="gray"
								v-model="adminInfo.first_name"
								width="204px"
								name="First Name"
								placeholder="Ronald"
							/>
							<text-input
								labelVisible
								rules="required"
								labelColor="gray"
								v-model="adminInfo.last_name"
								width="204px"
								name="Last Name"
								placeholder="Richards"
							/>
						</div>
						<div class="flex flex-spaced">
							<text-input
								labelVisible
								rules="required"
								labelColor="gray"
								v-model="adminInfo.organisation"
								width="204px"
								name="Organisation"
								placeholder="Microsoft"
							/>
							<text-input
								labelVisible
								rules="required"
								labelColor="gray"
								v-model="adminInfo.monthly_research"
								width="204px"
								name="No. Research/Month"
								placeholder="200"
							/>
						</div>
						<div class="flex flex-spaced">
							<text-input
								type="text"
								rules="required"
								labelVisible
								labelColor="gray"
								v-model="adminInfo.profession"
								width="204px"
								name="Profession"
								placeholder="Product"
							/>
							<div class="form-group">
								<label class="select-label" for="admin">Role</label>
								<select class="select-input" v-model="adminInfo.role" width="204px" name="adminRole" id="adminRole">
									<option value="user">User</option>
									<option value="admin">Admin</option>
									<option value="superadmin">Super Admin</option>
								</select>
							</div>
						</div>

						<div class="flex flex-end">
							<v-button class="submit" size="large" buttonType="primary" submitType="submit" ref="editAdmin">
								<template v-if="!loading">Save Changes</template>
								<Loader v-else />
							</v-button>
						</div>
					</div>
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
				<h4 class="modal__header-title">Deactivate Admin</h4>
			</template>
			<template #body>
				<div class="modal__content">
					<p class="modal__content-text">
						Kindly confirm that you want to deactivate this admin
						<span class="name"> ({{ adminToModify.first_name }} {{ adminToModify.last_name }}) </span>.
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
				<h4 class="modal__header-title">Activate Admin</h4>
			</template>
			<template #body>
				<div class="modal__content">
					<p class="modal__content-text">
						Kindly confirm that you want to activate this admin
						<span class="name"> ({{ adminToModify.first_name }} {{ adminToModify.last_name }}) </span>.
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
				<h4 class="modal__header-title">Suspend Admin</h4>
			</template>
			<template #body>
				<div class="modal__content">
					<p class="modal__content-text">
						Kindly confirm that you want to suspend this admin
						<span class="name"> ({{ adminToModify.first_name }} {{ adminToModify.last_name }}) </span>.
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

<script src="./admin.js"></script>

<style lang="scss" scoped>
@import './Admin.scss';
</style>

<template>
	<div class="container container--lg">
		<v-header />
		<config-data
			v-if="openConfigPage"
			@closeConfig="openConfigPage = false"
			:headers="csvHeaders"
			:dataFields="dataFields"
			@submitImportCSV="submitImportCSV"
		/>
		<main class="main-section">
			<div class="contact__research__menu">
				<div class="text__title">
					<h2>Contact Research</h2>
				</div>
				<div class="action__group">
					<div class="btn__wrapper">
						<v-button :disabled="checkedContacts.length === 0" class="btn__export__csv" @click="exportCSV">
							<template v-if="!exportLoading">Export CSV</template>
							<Loader v-else />
						</v-button>
					</div>
					<div class="btn__wrapper">
						<file-upload
							:drop="false"
							ref="upload"
							:extensions="extensions"
							:accept="accept"
							@input-file="inputFile"
							v-model="files"
						>
							<v-button class="btn__import__contact">Import Contacts</v-button>
						</file-upload>
					</div>
				</div>
			</div>
			<div class="mt-2">
				<v-table
					:tableHeaders="tableHeaders"
					:tableData="history"
					theme="contact__research"
					:loading="pageLoading"
					@checkAll="checkAll"
				>
					<template name="table-row" slot-scope="{ item }" class="pu">
						<td class="table__row-item">
							<input
								type="checkbox"
								:value="item.rowId"
								v-model="checkedContacts"
								:disabled="item.status.statusCode === 'IN_PROGRESS' || item.status.statesCode === 'IN_PROGRESS'"
							/>
						</td>
						<td class="table__row-item" @click="clickResearch(item)">
							<div class="table__td__name">
								<div class="initials__logo">
									{{ getInitials(item.full_name) }}
								</div>
								<div class="name__email__wrapper">
									<div class="text__name">{{ item.full_name }}</div>
									<div class="text__email">{{ item.email }}</div>
								</div>
							</div>
						</td>
						<td class="table__row-item" @click="clickResearch(item)">
							{{ item.company }}
						</td>
						<td class="table__row-item" @click="clickResearch(item)">
							<template v-if="!item.role">-</template>
							<template v-else
								><p class="text__title">{{ item.role }}</p></template
							>
						</td>
						<td class="table__row-item row-link" @click="clickResearch(item)">
							<template v-if="!item.linkedin"><p class="table__td__link">-</p></template>
							<template v-else
								><a class="table__td__link" :href="item.linkedin" target="_blank">
									<img src="@/assets/icons/link.svg" svg-inline /> </a
							></template>
						</td>
						<td class="table__row-item" @click="clickResearch(item)">
							<template v-if="item.research_score === 0.1">-</template>
							<template v-else>{{ (item.research_score * 100).toFixed(2) }}%</template>
						</td>
						<td class="table__row-item" @click="clickResearch(item)">
							{{ item.updatedAt | moment('from', 'now') }}
						</td>
						<td class="table__row-item" @click="clickResearch(item)">
							<div class="table__td__status">
								<span class="status_done" v-if="item.status.statusCode === 'READY' || item.status.statusCode === 'DONE'">
									<span class="white__circle">
										<span class="pin"></span>
									</span>
									<span class="text">{{ item.status.message }}</span>
								</span>
								<span class="status_pending" v-else>
									<span class="white__circle">
										<span class="pin"></span>
									</span>
									<span class="text">{{ item.status.message }}</span>
								</span>
							</div>
						</td>
						<td class="table__row-item dropdown">
							<!-- menu3dot -->
							<div class="user__menu__wrapper">
								<v-toggle-dropdown class="user__dropdown__menu">
									<template #dropdown-wrapper>
										<img src="@/assets/icons/menu3dot.svg" svg-inline />
									</template>
									<template #dropdown-items>
										<li class="dropdown__item" @click="openDeleteModal(item.rowId, item.full_name)">Delete</li>
										<li class="dropdown__item" @click="RefreshResearch(item.rowId)">Refresh</li>
									</template>
								</v-toggle-dropdown>
							</div>
						</td>
					</template>
				</v-table>
				<div class="table__pagination__wrapper" v-if="!pageLoading && history && history.length > 0">
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
				<div v-if="history && history.length < 1">
					<div class="emptyState">
						<img src="@/assets/icons/empty-state-image.svg" svg-inline />
						<p class="emptyState-text">No research record found</p>
					</div>
				</div>
			</div>
		</main>
		<v-modal v-if="showModal" position="center" :toggleClass="toggleClass" @close="toggleModal" maxWidth="400px">
			<template #title>
				<h4 class="modal__header-title">Delete Research</h4>
			</template>
			<template #body>
				<div class="modal__content">
					<p class="modal__content-text">
						Kindly confirm that you want to delete this research <span class="name">({{ contactToDelete.full_name }})</span>.
					</p>
					<div class="modal__content-btn">
						<div class="cancel" @click="toggleModal">Cancel</div>
						<v-button class="config__btn" buttonType="warning" size="modal" @click="deleteResearch">Delete</v-button>
					</div>
				</div>
			</template>
		</v-modal>
	</div>
</template>

<script src="./contactResearch.js"></script>
<style lang="scss" scoped src="./contactresearch.scss"></style>
<style lang="scss">
.table--contact__research {
	tbody {
		.table__row {
			border-bottom: 1px solid #bac2c9;
			cursor: pointer;
			&-item {
				white-space: nowrap;
				overflow: hidden;
				max-width: 195px;
				text-overflow: ellipsis;
				&.dropdown {
					overflow: unset;
					padding: 0.5rem;
				}
			}
		}
		.disable-row {
			cursor: not-allowed;
		}
	}
}
.pagination__list {
	display: flex;
	align-items: center;
	li {
		margin-left: 0.5em;
		font-size: 16px;

		a {
			color: #333758;
		}
		&.active {
			background: rgba(47, 46, 128, 0.1);
			border-radius: 2px;
			padding: 5px 10px;
		}
		&.disabled {
			a {
				cursor: not-allowed;
			}
		}
	}
}
.file-uploads.file-uploads-html4 input,
.file-uploads.file-uploads-html5 label {
	cursor: pointer !important;
}
</style>

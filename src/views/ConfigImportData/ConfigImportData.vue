<template>
	<div class="more__settings__modal__wrapper">
		<div class="more__settings__modal__header">
			<div class="more__settings__modal__header__btn__wrapper">
				<v-button class="config__btn__close" @click="$emit('closeConfig')">
					<div class="btn__content__wrapper">
						<span class="icon pr-1">
							<img src="@/assets/icons/close-sign.svg" class="ml-1" svg-inline />
						</span>
						<span class="text">Close</span>
					</div>
				</v-button>
			</div>
		</div>
		<div class="more__settings__modal__content">
			<div class="table__wrapper my-4">
				<div class="table">
					<h4 class="settings-header">Configure Data Fields</h4>
					<table class="table">
						<tbody>
							<tr class="table__row" v-for="(fields, i) in dataFields" :key="i">
								<td class="table__row-item">
									{{ fields.mainKey }}
								</td>
								<td class="table__row-item item-text">{{ fields.placeholder }}</td>
								<td class="table__row-item">
									<div class="form-group">
										<select class="select-input" width="300px" v-model="fields.csvKey">
											<option v-for="(header, j) in headers" :value="header" :key="j">{{ header }}</option>
										</select>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="flex flex-end mt-2">
						<v-button class="config__btn__close" @click="$emit('submitImportCSV')" ref="settingsBtn">
							<div class="btn__content__wrapper">
								<Loader v-if="loading" />
								<span v-else class="text">Apply</span>
							</div>
						</v-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./config-import-data.js"></script>
<style lang="scss" scoped src="./config-import-data.scss"></style>

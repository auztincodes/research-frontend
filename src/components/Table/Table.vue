<template>
	<div class="table__wrapper">
		<div class="table__loading" v-if="loading">
			<div class="table__loading-header"></div>
			<div class="table__loading-row" v-for="i in 4" :key="i">
				<div class="table__loading-item" v-for="j in 7" :key="j"></div>
			</div>
		</div>
		<table class="table" :class="`table--${theme}`" v-else>
			<c-table-header
				:class="`table__header--${theme}`"
				:headers="tableHeaders"
				@sortTable="sortData"
				@change="$emit('checkAll', $event)"
			/>
			<tbody>
				<tr
					class="table__row"
					@click="$emit('rowClick', item)"
					:class="{
						'disable-row':
							(item.status && item.status.statusCode === 'IN_PROGRESS') ||
							(item.status && item.status.statesCode === 'IN_PROGRESS') ||
							(item.status && item.status.statusCode === 'NO_RESULT')
					}"
					v-for="(item, index) in sortedData"
					:key="index"
				>
					<slot slot:table-row :item="item"></slot>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script src="./table.js"></script>
<style lang="scss" src="./table.scss"></style>

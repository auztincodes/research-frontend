<template>
	<thead class="table__header">
		<tr>
			<th
				class="table__header-item"
				:class="header.align ? `table--${header.align}` : null"
				v-for="header in headers"
				:key="header.name"
			>
				{{ header.name }}
				<template v-if="header.elementSlot">
					<input class="check-input" type="checkbox" @change="$emit('change', $event)" />
				</template>
				<span class="table__header-icon" @click="$emit('sortTable', header.sortHeader)" v-if="header.sortable">
					<svg width="13" height="9" xmlns="http://www.w3.org/2000/svg">
						<g transform="translate(-1 -3)" fill="none" fill-rule="evenodd">
							<path d="M0 0h15v15H0z" />
							<rect
								fill="#333758"
								opacity=".3"
								transform="rotate(-180 3.75 6.875)"
								x="3.125"
								y="3.125"
								width="1.25"
								height="7.5"
								rx=".625"
							/>
							<path
								d="M5.183 8.933a.625.625 0 01.884.884l-1.875 1.875a.625.625 0 01-.884 0L1.433 9.817a.625.625 0 01.884-.884l1.433 1.433 1.433-1.433z"
								fill="#333758"
								fill-rule="nonzero"
							/>
							<rect
								fill="#333758"
								opacity=".3"
								transform="matrix(-1 0 0 1 22.5 0)"
								x="10.625"
								y="4.375"
								width="1.25"
								height="7.5"
								rx=".625"
							/>
							<path
								d="M12.683 6.067a.625.625 0 10.884-.884l-1.875-1.875a.625.625 0 00-.884 0L8.933 5.183a.625.625 0 00.884.884l1.433-1.433 1.433 1.433z"
								fill="#333758"
								fill-rule="nonzero"
							/>
						</g>
					</svg>
				</span>
			</th>
		</tr>
	</thead>
</template>

<script src="./table-header.js"></script>
<style scoped>
.check-input {
	margin-left: 7px;
}
</style>

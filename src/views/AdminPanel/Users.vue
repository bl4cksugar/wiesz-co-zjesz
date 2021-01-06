<template>
	<v-container class="box mx-0" fluid fill-height>
		<v-col
			sm="2"
			style="min-height:100vh; background:#272727 "
			class="d-flex justify-center align-center "
		>
			<side-menu></side-menu>
		</v-col>
		<v-col sm="10">
			<v-card>
				<v-card-title>
					Users
					<v-spacer></v-spacer>
					<v-text-field
						v-model="search"
						append-icon="fas fa-search"
						label="Search"
						single-line
						hide-details
					></v-text-field>
				</v-card-title>
				<v-data-table
					:headers="headers"
					:items="users"
					:search="search"
					:options.sync="options"
					:server-items-length="totalSurnames"
					:loading="loading"
					class="elevation-1"
				></v-data-table>
			</v-card>
		</v-col>
	</v-container>
</template>

<script>
import SideMenu from "../../components/SideMenu.vue";
export default {
	components: { SideMenu },
	data() {
		return {
			search: "",
			headers: [
				{
					text: "ID",
					align: "left",
					sortable: false,
					value: "number"
				},

				{ text: "nickname", value: "content" },
				{ text: "isBanned", value: "boolean" },
				{ text: "isDeleted", value: "boolean" }
			],
			users: []
		};
	}
};
</script>

<style scoped></style>

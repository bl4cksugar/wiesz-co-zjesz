<template>
	<v-container class="box mx-0" fluid fill-height>
		<v-col
			sm="2"
			style="min-height:100vh; background:#272727 "
			class="d-flex justify-center align-start mt-10"
		>
			<side-menu></side-menu>
		</v-col>
		<v-col sm="10" style="min-height:100vh;">
			<v-card class="data">
				<v-dialog v-model="dialogDelete" max-width="500px">
					<v-card>
						<v-card-title class="headline"
							>Are you sure you want to delete this
							item?</v-card-title
						>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								color="blue darken-1"
								text
								@click="closeDelete"
								>Cancel</v-btn
							>
							<v-btn
								color="blue darken-1"
								text
								@click="deleteItemConfirm"
								>OK</v-btn
							>
							<v-spacer></v-spacer>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<v-data-table
					:headers="headers"
					:items="users"
					:search="search"
					:server-items-length="pagination.total"
					:page.sync="pagination.currentPage"
					:items-per-page="pagination.perPage"
					:loading="loading"
					class="elevation-1"
					@page-count="pagination.pageCount = $event"
					hide-default-footer
				>
					<template v-slot:[`item.isActive`]="{ item }">
						<v-checkbox disabled v-model="item.isActive" />
					</template>
					<template v-slot:[`item.isBanned`]="{ item }">
						<v-checkbox disabled v-model="item.isBanned" />
					</template>
					<template v-slot:top>
						<v-toolbar flat color="white">
							<v-toolbar-title>Users</v-toolbar-title>
							<v-divider class="mx-4" inset vertical></v-divider>
							<v-spacer></v-spacer>
							<!-- <div class="col-md-4">
								<v-text-field
									v-model="search"
									append-icon="fas fa-search"
									label="Search"
									single-line
									hide-details
								></v-text-field>
							</div>
							<div>
								<v-btn
									color="indigo"
									dark
									class="ml-3"
									@click="getUsers()"
								>
									<span>Search</span>
								</v-btn>
							</div> -->
						</v-toolbar>
					</template>

					<template v-slot:[`item.actions`]="{ item }">
						<v-btn
							v-if="item.isActive"
							class="mx-2"
							small
							depressed
							fab
							dark
							color="red"
							@click="deleteItem(item.id)"
						>
							<v-icon dark small>mdi-delete</v-icon>
						</v-btn>
						<v-btn
							v-if="!item.isBanned"
							class="mx-2"
							small
							depressed
							fab
							dark
							color="orange"
							@click="blockItem(item.id)"
						>
							<v-icon dark small>mdi-block-helper</v-icon>
						</v-btn>
						<v-btn
							v-else
							class="mx-2"
							small
							depressed
							fab
							dark
							color="grey"
							@click="unblockItem(item.id)"
						>
							<v-icon dark small>mdi-block-helper</v-icon>
						</v-btn>
					</template>
				</v-data-table>
				<div
					class="text-center pt-2 d-flex justify-space-between align-center"
				>
					<v-pagination
						v-model="pagination.currentPage"
						:length="pagination.pageCount"
					></v-pagination>
					<div class="col-4">
						<v-select
							:items="pagination.perPageOptions"
							v-model="pagination.perPage"
							label="Items per page"
						></v-select>
					</div>
				</div>
			</v-card>
		</v-col>
	</v-container>
</template>

<script>
import SideMenu from "../../components/SideMenu";
export default {
	data() {
		return {
			pagination: {
				perPage: 5,
				currentPage: 1,
				perPageOptions: [5, 10],
				total: 1,
				pageCount: 1
			},
			dialogDelete: false,
			toDeleteId: null,
			loading: false,
			search: "",
			headers: [
				{
					text: "ID",
					align: "left",
					sortable: false,

					value: "id"
				},

				{
					text: "Nickname",
					value: "profile.nickname",
					sortable: false
				},
				{ text: "Email", value: "email", sortable: false },
				{ text: "IsActive", value: "isActive", sortable: false },
				{ text: "IsBanned", value: "isBanned", sortable: false },
				{ text: "Actions", value: "actions", sortable: false }
			],
			users: []
		};
	},
	components: { SideMenu },
	computed: {
		perPage() {
			return this.pagination.perPage;
		},
		currentPage() {
			return this.pagination.currentPage;
		}
	},

	created() {
		this.getUsers();
	},
	watch: {
		dialogDelete(val) {
			val || this.closeDelete();
		},
		currentPage() {
			this.getUsers();
		},
		perPage() {
			this.getUsers();
		}
	},

	methods: {
		async blockItem(id) {
			const result = await this.$user.banUser(id);
			if (result.success) {
				this.getUsers();
			}
		},
		async unblockItem(id) {
			const result = await this.$user.unbanUser(id);
			if (result.success) {
				this.getUsers();
			}
		},

		deleteItem(item) {
			this.toDeleteId = item;
			this.dialogDelete = true;
		},

		async deleteItemConfirm() {
			console.log(this.toDeleteId);
			const result = await this.$user.deleteUser(this.toDeleteId);
			if (result.success) {
				this.getUsers();
				this.closeDelete();
			}
		},

		closeDelete() {
			this.dialogDelete = false;
			this.$nextTick(() => {
				this.toDeleteId = null;
			});
		},

		async getUsers() {
			this.loading = true;
			const result = await this.$user.getUsers({
				page: this.pagination.currentPage,
				pageSize: this.pagination.perPage,
				searchQuery: this.search
			});
			if (result.success) {
				this.users = result.data.results;
				this.pagination.total = result.data.count;
			}
			this.loading = false;
		}
	}
};
</script>

<style scoped>
.data {
	margin-top: 45px;
}
</style>

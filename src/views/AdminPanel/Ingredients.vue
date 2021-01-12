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
					:items="ingredients"
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
							<v-toolbar-title>Ingredients</v-toolbar-title>
							<v-divider class="mx-4" inset vertical></v-divider>
							<v-spacer></v-spacer>
							<div class="col-md-4">
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
									@click="getIngredients()"
								>
									<span>Search</span>
								</v-btn>
							</div>
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
				perPageOptions: [5, 10, 25, 50],
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

				{ text: "Nickname", value: "nickname", sortable: false },
				{ text: "Email", value: "email", sortable: false },
				{ text: "IsActive", value: "isActive", sortable: false },
				{ text: "IsBanned", value: "isBanned", sortable: false },
				{ text: "Actions", value: "actions", sortable: false }
			],
			ingredients: []
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
		this.getIngredients();
	},
	watch: {
		dialogDelete(val) {
			val || this.closeDelete();
		},
		currentPage() {
			this.getIngredients();
		},
		perPage() {
			this.getIngredients();
		}
	},

	methods: {
		deleteItem(item) {
			this.toDeleteId = item.id;
			this.dialogDelete = true;
		},

		async deleteItemConfirm() {
			const result = await this.$ingredient.deleteIngredient(
				this.toDeleteId
			);
			if (result.success) {
				this.getIngredients();
				this.closeDelete();
			}
		},

		closeDelete() {
			this.dialogDelete = false;
			this.$nextTick(() => {
				this.toDeleteId = null;
			});
		},

		async getIngredients() {
			this.loading = true;
			const result = await this.$ingredient.getIngredients({
				page: this.pagination.currentPage,
				pageSize: this.pagination.perPage,
				searchQuery: this.search
			});
			if (result.success) {
				this.ingredients = result.data.results;
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

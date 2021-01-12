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
				<v-dialog v-model="dialog" max-width="500px">
					<v-card>
						<v-card-title>
							<span class="headline">{{ formTitle }}</span>
						</v-card-title>

						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12">
										<v-simple-checkbox
											v-model="editedItem.title"
											label="isActive"
										></v-simple-checkbox>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="close"
								>Cancel</v-btn
							>
							<v-btn color="blue darken-1" text @click="save"
								>Save</v-btn
							>
						</v-card-actions>
					</v-card>
				</v-dialog>
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
					:server-items-length="totalUsers"
					:loading="loading"
					class="elevation-1"
				>
					<template v-slot:[`item.isActive`]="{ item }">
						<v-simple-checkbox>{{
							item.isActive
								? "mdi-checkbox-marked"
								: "mdi-checkbox-blank-outline"
						}}</v-simple-checkbox>
					</template>
					<template v-slot:[`item.isBanned`]="{ item }">
						<v-simple-checkbox>{{
							item.isBanned
								? "mdi-checkbox-marked"
								: "mdi-checkbox-blank-outline"
						}}</v-simple-checkbox>
					</template>
					<template v-slot:top>
						<v-toolbar flat color="white">
							<v-toolbar-title>Users</v-toolbar-title>
							<v-divider class="mx-4" inset vertical></v-divider>
							<v-spacer></v-spacer>
							<v-text-field
								v-model="search"
								append-icon="fas fa-search"
								label="Search"
								single-line
								hide-details
							></v-text-field>
						</v-toolbar>
						<v-alert v-if="alert" :type="alert.type">{{
							alert.content
						}}</v-alert>
					</template>

					<template v-slot:[`item.actions`]="{ item }">
						<v-btn
							class="mx-2"
							small
							depressed
							fab
							dark
							color="green"
							@click="editItem(item)"
						>
							<v-icon dark small>mdi-pencil</v-icon>
						</v-btn>
						<v-btn
							class="mx-2"
							small
							depressed
							fab
							dark
							color="red"
							@click="deleteItem(item)"
						>
							<v-icon dark small>mdi-delete</v-icon>
						</v-btn>
						<v-btn
							class="mx-2"
							small
							depressed
							fab
							dark
							color="orange"
							@click="blockItem(item)"
						>
							<v-icon dark small>mdi-block-helper</v-icon>
						</v-btn>
					</template>
					<template v-slot:no-data>NO DATA</template>
				</v-data-table>
			</v-card>
		</v-col>
	</v-container>
</template>

<script>
import SideMenu from "../../components/SideMenu";
export default {
	data() {
		return {
			dialog: false,
			dialogDelete: false,
			loading: false,
			alert: null,
			search: "",

			headers: [
				{
					text: "ID",
					align: "left",
					sortable: false,

					value: "id"
				},

				{ text: "nickname", value: "nickname" },
				{ text: "email", value: "email" },
				{ text: "iActive", value: "isActive" },
				{ text: "isBanned", value: "isBanned" },
				{ text: "Actions", value: "actions", sortable: false }
			],
			users: [
				{
					id: 1,
					nickname: "janek12",
					email: "janek12@example.com",
					iActive: true,
					isBanned: true,
					user: 2
				}
			],
			totalUsers: 1,
			editedIndex: -1,
			editedItem: {
				nickname: "",
				mail: 0,
				isActive: false,
				isBanned: false
			},
			defaultItem: {
				nickname: "",
				mail: 0,
				isActive: false,
				isBanned: false
			}
		};
	},
	components: { SideMenu },
	computed: {
		formTitle() {
			return this.editedIndex === -1 ? "New Item" : "Edit Item";
		}
	},

	watch: {
		dialog(val) {
			val || this.close();
		},
		dialogDelete(val) {
			val || this.closeDelete();
		}
	},

	created() {},

	methods: {
		editItem(item) {
			this.editedIndex = this.users.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},

		deleteItem(item) {
			this.editedIndex = this.users.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},

		deleteItemConfirm() {
			this.users.splice(this.editedIndex, 1);
			this.closeDelete();
		},

		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		closeDelete() {
			this.dialogDelete = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.users[this.editedIndex], this.editedItem);
			} else {
				this.users.push(this.editedItem);
			}
			this.close();
		}
	}
};
</script>

<style scoped>
.data {
	margin-top: 45px;
}
</style>

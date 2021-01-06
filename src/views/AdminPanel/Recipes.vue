<template>
	<v-container class="box mx-0" fluid fill-height>
		<v-col
			sm="2"
			style="min-height:100vh; background:#272727 "
			class="d-flex justify-center align-start mt-10"
		>
			<side-menu></side-menu>
		</v-col>
		<v-col sm="10">
			<v-card>
				<v-dialog v-model="dialog" max-width="500px">
					<v-card>
						<v-card-title>
							<span class="headline">{{ formTitle }}</span>
						</v-card-title>

						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12">
										<v-text-field
											v-model="editedItem.title"
											label="Title"
										></v-text-field>
										<v-text-field
											v-model="editedItem.description"
											label="Description"
										></v-text-field>
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
					:items="recipes"
					:search="search"
					:server-items-length="totalRecipes"
					:loading="loading"
					class="elevation-1"
				>
					<template v-slot:top>
						<v-toolbar flat color="white">
							<v-toolbar-title>Recipes</v-toolbar-title>
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

				{ text: "Title", value: "title" },
				{ text: "Description", value: "description" },
				{ text: "Calories", value: "calories" },
				{ text: "Time", value: "time" },
				{ text: "Ingredients", value: "ingredients" },
				{ text: "User", value: "user" },
				{ text: "Actions", value: "actions", sortable: false }
			],
			recipes: [
				{
					id: 1,
					title: "Title",
					description: "asdasd",
					calories: 100,
					time: 160,
					ingredients: ["jajko", "mleko"],
					user: 1
				},
				{
					id: 2,
					title: "Title",
					description: "asdasd",
					calories: 100,
					time: 160,
					ingredients: ["jajko", "mleko"],
					user: 1
				}
			],
			totalRecipes: 2,
			editedIndex: -1,
			editedItem: {
				name: "",
				surname: 0,
				date: 0,
				mail: 0,
				boolean: false
			},
			defaultItem: {
				name: "",
				surname: 0,
				date: 0,
				mail: 0,
				boolean: false
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
			this.editedIndex = this.recipes.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},

		deleteItem(item) {
			this.editedIndex = this.recipes.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},

		deleteItemConfirm() {
			this.recipes.splice(this.editedIndex, 1);
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
				Object.assign(this.recipes[this.editedIndex], this.editedItem);
			} else {
				this.recipes.push(this.editedItem);
			}
			this.close();
		}
	}
};
</script>

<style scoped></style>

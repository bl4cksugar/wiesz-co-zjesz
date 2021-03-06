<template>
	<v-container
		id="recipe"
		class="profile-page d-flex justify-center align-center flex-column"
	>
		<div class="d-flex col-10 col-md-6 flex-column flex-md-row">
			<v-dialog v-model="dialogDelete" max-width="500px">
				<v-card>
					<v-card-title class="headline"
						>Are you sure you want to delete this
						item?</v-card-title
					>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="closeDelete"
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
			<v-card style="width:100%" v-if="recipe !== null">
				<div class="d-flex flex-column">
					<div class="d-flex flex-column flex-md-row">
						<div
							class="col-12 col-md-4 d-flex align-center justify-center"
						>
							<v-img
								v-if="recipe.photo"
								:src="recipe.photo"
								aspect-ratio="1"
								class="grey lighten-2"
							>
								<template v-slot:placeholder>
									<v-row
										class="fill-height ma-0"
										align="center"
										justify="center"
									>
										<v-progress-circular
											indeterminate
											color="grey lighten-5"
										></v-progress-circular>
									</v-row>
								</template>
							</v-img>
						</div>
						<div
							class="col-12 col-md-8 d-flex flex-row flex-wrap flex-md-column"
						>
							<div>
								<div class="d-flex justify-space-between ml-5">
									<h2 style="font-family:Merriweather;">
										{{ recipe.title }}
									</h2>

									<div class="d-flex align-center  ">
										<edit-recipe
											style="justify-end"
											v-if="isAuthor"
											:recipe="recipe"
										></edit-recipe>
										<v-btn
											:disabled="loading"
											v-if="isAuthor || isAdmin"
											@click="deleteItem()"
											text
											icon
											color="red"
										>
											<v-icon>fas fa-times</v-icon>
										</v-btn>
									</div>
								</div>
								<div class="d-flex">
									<v-rating
										v-if="canJudge"
										empty-icon="mdi-star-outline"
										full-icon="mdi-star"
										half-icon="mdi-star-half-full"
										hover
										:readonly="loading"
										v-model="grade"
										length="5"
										size="32"
									></v-rating>
									<v-rating
										v-else
										empty-icon="mdi-star-outline"
										full-icon="mdi-star"
										half-icon="mdi-star-half-full"
										hover
										readonly
										v-model="overall"
										length="5"
										size="32"
									></v-rating>

									<v-btn
										:disabled="loading"
										v-if="!canJudge && isLogged"
										class="ma-2"
										@click="removeGrade()"
										text
										icon
										color="red"
									>
										<v-icon>mdi-delete-forever</v-icon>
									</v-btn>
								</div>

								<small
									class="text--secondary text-uppercase d-flex ml-5"
									style="font-family:Montserrat; "
								>
									<p class="mr-5">
										{{
											`${overall ? overall : 0} (${
												recipe.grades.length
											})`
										}}
									</p>

									<p class="mb-1 mr-5">
										{{ `${recipe.calories} kcal` }}
									</p>

									<p>
										{{ `${recipe.preparingTime} minutes` }}
									</p>
								</small>
								<v-list class="pt-0">
									<v-list-item class="grow">
										<v-list-item-content class="pb-0">
											<v-list-item-title>
												Ingredients:
											</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
									<v-list-item
										class="text--secondary "
										style="font-family:Montserrat; "
										dense
										v-for="ingredient in recipe.ingredients"
										:key="ingredient.id"
									>
										<v-list-item-content>
											<v-list-item-title>
												{{
													`- ${ingredient.ingredient.title}: ${ingredient.quantity}` +
														"  g"
												}}
											</v-list-item-title>
										</v-list-item-content>
									</v-list-item></v-list
								>
							</div>
						</div>
					</div>
					<v-divider></v-divider>
					<div class="col-12">
						<v-list-item class="grow">
							<v-list-item-content class="py-0">
								<v-list-item-title>
									Description:
								</v-list-item-title>

								{{ recipe.description }}
							</v-list-item-content>
						</v-list-item>
					</div>
				</div>
				<v-card-actions>
					<v-list-item class="grow">
						<v-list-item-content>
							<v-list-item-title>{{
								`
								by ${recipe.owner.profile.nickname}`
							}}</v-list-item-title>
						</v-list-item-content>

						<v-row align="center" justify="end" v-if="isLogged">
							<v-btn
								:disabled="loading"
								class="ma-2"
								@click="like()"
								text
								icon
								color="red"
							>
								<v-icon class="mr-1" v-if="!isLiked">
									mdi-heart-outline
								</v-icon>
								<v-icon class="mr-1" v-else>
									mdi-heart
								</v-icon>
							</v-btn>
						</v-row>
					</v-list-item>
				</v-card-actions>
				<div class="px-5">
					<h4 style="font-family:Merriweather;">
						Comments
					</h4>
					<v-list>
						<v-divider></v-divider>
						<v-list-item
							dense
							v-for="comment in recipe.comments"
							:key="comment.id"
						>
							<v-list-item-content>
								<v-list-item-title>
									<div
										class="d-flex justify-space-between flex-column flex-md-row flex-wrap"
									>
										<div class="col-12 d-flex justify-end">
											<v-btn
												text
												x-small
												@click="
													deleteComment(comment.id)
												"
												v-if="
													isAdmin ||
														comment.author.id ===
															getUserId
												"
											>
												x</v-btn
											>
										</div>

										<div class="col-8 text-wrap">
											{{
												comment.author.profile.nickname
											}}
										</div>
										<div class="col-4 d-flex justify-end">
											<small>{{
												new Date(
													new Date(
														comment.timeStamp
													).setHours(
														new Date(
															comment.timeStamp
														).getHours() -
															new Date(
																comment.timeStamp
															).getTimezoneOffset() /
																60
													)
												).toLocaleString()
											}}</small>
										</div>
									</div>
								</v-list-item-title>
								<p style="font-size:12px">
									{{ comment.text }}
									<v-divider class="mt-2"></v-divider>
								</p>
							</v-list-item-content>
						</v-list-item>
					</v-list>
					<v-textarea
						v-if="isLogged"
						solo
						:rules="[rules.required]"
						label="Type comment here..."
						v-model="comment"
					></v-textarea>
					<v-btn
						:disabled="loading"
						@click="sendComment"
						v-if="isLogged"
						block
						class="mb-5"
						color="#3f51b5"
						dark
						>COMMENT</v-btn
					>
				</div>
			</v-card>
		</div>
	</v-container>
</template>

<script>
import validation from "../mixins/validation";
import { mapGetters } from "vuex";
import EditRecipe from "../components/Recipe/EditRecipe.vue";

export default {
	name: "Recipe",
	data() {
		return {
			loading: false,
			recipe: null,
			comment: "",
			grade: 0,
			dialogDelete: false,
			titles: [
				{
					id: 1,
					icon: "mdi-silverware-fork-knife",
					title: "My Recipes",
					config: { isMain: true, isFavorite: false }
				},
				{
					id: 2,
					icon: "mdi-heart",
					title: "Favorite Recipes",
					config: { isMain: false, isFavorite: true }
				}
			]
		};
	},
	components: {
		EditRecipe
	},
	mounted() {
		const { id } = this.$route.params;
		if (id) {
			document.getElementById("recipe").scrollIntoView({
				behavior: "smooth"
			});
			this.getRecipe(id);
		} else {
			this.$router.push({ name: "Home" });
		}
	},
	computed: {
		...mapGetters(["getUserId", "isLogged", "isAdmin"]),
		overall() {
			let result = 0;
			this.recipe.grades.forEach((item) => {
				result += item.value;
			});
			return result / this.recipe.grades.length.toFixed(1);
		},
		canJudge() {
			return (
				!this.recipe.grades.find(
					(item) => item.authorId === this.getUserId
				) && this.isLogged
			);
		},
		isAuthor() {
			return this.recipe.ownerId === this.getUserId;
		},
		isLiked() {
			return this.recipe.fans.find((item) => {
				return item.user.id === this.getUserId;
			});
		}
	},
	watch: {
		grade(newVal) {
			if (newVal !== 0) {
				this.addGrade();
			}
		},
		dialogDelete(val) {
			val || this.closeDelete();
		}
	},
	methods: {
		async getRecipe(id) {
			const { data } = await this.$recipe.getRecipe(id);
			this.recipe = data;
		},
		async addGrade() {
			this.loading = true;
			const result = await this.$grade.addGrade({
				value: this.grade,
				recipeId: this.recipe.id
			});
			if (result.success) {
				this.getRecipe(this.recipe.id);
				this.grade = 0;
			}
			this.loading = false;
		},
		async removeRecipe() {},
		async editRecipe() {},
		async removeGrade() {
			this.loading = true;
			const grade = this.recipe.grades.find(
				(item) => item.authorId === this.getUserId
			);
			if (grade) {
				const result = await this.$grade.deleteGrade(grade.id);
				if (result.success) this.getRecipe(this.recipe.id);
			}
			this.loading = false;
		},
		async sendComment() {
			if (this.comment.length > 0) {
				this.loading = true;

				const result = await this.$comment.addComment({
					text: this.comment,
					recipeId: this.recipe.id
				});
				if (result.success) {
					this.getRecipe(this.recipe.id);
					this.comment = "";
				}

				this.loading = false;
			}
		},
		async like() {
			const result = await this.$recipe.likeRecipe(this.recipe.id);
			if (result.success) {
				this.getRecipe(this.recipe.id);
			}
		},
		deleteItem() {
			this.dialogDelete = true;
		},
		async deleteComment(id) {
			const result = await this.$comment.deleteComment(id);
			if (result.success) this.getRecipe(this.recipe.id);
		},

		async deleteItemConfirm() {
			const result = await this.$recipe.deleteRecipe(this.recipe.id);
			if (result.success) {
				this.$router.back();
			}
		},

		closeDelete() {
			this.dialogDelete = false;
			this.$nextTick(() => {});
		}
	},
	mixins: [validation]
};
</script>
<style>
.profile-page {
	padding-top: 90px;
	min-height: 85vh;
}
.profileAvatar {
	min-width: 150px !important;
	min-height: 150px !important;
}
</style>

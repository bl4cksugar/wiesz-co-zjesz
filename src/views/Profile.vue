<template>
	<v-container
		class="profile-page d-flex justify-center align-center flex-column"
	>
		<div class="d-flex col-10 col-md-6 flex-column flex-md-row">
			<div class="col-12 col-md-4 d-flex align-center justify-center">
				<v-avatar color="indigo" class="profileAvatar"
					><v-icon dark>
						mdi-account-circle
					</v-icon></v-avatar
				>
			</div>
			<div
				class="col-12 col-md-8 d-flex align-center justify-space-between flex-row flex-wrap"
			>
				<div>
					<h2 style="font-family:Merriweather;">
						{{ user.nickname }}
					</h2>
					<small
						class="text--secondary text-uppercase"
						style="font-family:Montserrat; "
					>
						<strong>my basic metabolism:</strong>
						{{ `${user.ppm} kcal` }}
					</small>
				</div>
				<div class="d-flex flex-column flex-md-row">
					<ppm class="mx-2"></ppm>
					<delete-modal class="mx-2"></delete-modal>
				</div>
			</div>
		</div>
		<div class="d-flex col-12 flex-column justify-center align-center">
			<v-tabs
				v-model="tab"
				color="indigo accent-4"
				class="d-flex justify-center"
				icons-and-text
			>
				<v-tab
					v-for="tab in titles"
					:key="tab.id"
					:href="`#tab-${tab.id}`"
				>
					{{ tab.title }}
					<v-icon>{{ tab.icon }}</v-icon>
				</v-tab>
			</v-tabs>
			<div class="col-10 col-md-8 d-flex flex-row">
				<v-tabs-items v-model="tab" class="col-8">
					<v-tab-item
						v-for="tab in titles"
						:key="tab.id"
						:value="'tab-' + tab.id"
					>
						<span style="font-family:Merriweather; font-size:30px;">
						</span>
						<recipes-list
							:config="tab.config"
							:refresh="refresh"
						></recipes-list>
					</v-tab-item>
				</v-tabs-items>
			</div>
		</div>
	</v-container>
</template>

<script>
import Ppm from "../components/Profile/Ppm";
import RecipesList from "../components/Profile/RecipesList";
import DeleteModal from "../components/Profile/DeleteModal.vue";
import { mapGetters } from "vuex";

export default {
	name: "Profile",
	data() {
		return {
			ppm: 1630,
			tab: null,
			titles: [
				{
					id: 1,
					icon: "mdi-silverware-fork-knife",
					title: "My Recipes",
					config: { isMine: true, isFavorite: false }
				},
				{
					id: 2,
					icon: "mdi-heart",
					title: "Favorite Recipes",
					config: { isMine: false, isFavorite: true }
				}
			],
			config: null,
			refresh: false
		};
	},
	watch: {
		tab() {
			this.refresh = !this.refresh;
		}
	},
	created() {
		this.config = this.titles[0].config;
	},
	computed: {
		...mapGetters(["user"])
	},
	components: {
		RecipesList,
		Ppm,
		DeleteModal
	}
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

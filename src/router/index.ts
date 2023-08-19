import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("../views/HomeView.vue")
		},
		{
			path: "/about",
			name: "about",
			component: () => import("../views/AboutView.vue")
		},
		{
			path: "/complete-lady",
			name: "complete-lady",
			component: () => import("../views/CompleteLadyView.vue")
		},
		{
			path: "/draggable-list",
			name: "draggable-list",
			component: () => import("../views/DraggableListView.vue")
		}
	]
})

export default router

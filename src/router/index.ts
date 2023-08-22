import {createRouter, createWebHistory} from "vue-router"

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
    },
    {
      path: "/file-uploader",
      name: "file-uploader",
      component: () => import("../views/FileUploaderView.vue")
    },
    {
      path: "/puzzle",
      name: "puzzle",
      component: () => import("../views/PuzzleView.vue")
    },
    {
      path: "/generate-story",
      name: "generate-story",
      component: () => import("../views/GenerateStoryView.vue")
    }
  ]
})

export default router

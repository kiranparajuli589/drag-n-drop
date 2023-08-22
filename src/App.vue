<script setup lang="ts">
import {links} from "./constants"
import {useRouter} from "vue-router"

const router = useRouter()

const toHome = () => {
  router.push({name: 'home'})
}
</script>
<template>
  <main>
    <nav class="app-bar">
      <div class="brand" @click="toHome()">Drag-n-Drop</div>
      <div class="links">
        <template
            v-for="(link, index) in links"
            :key="index"
        >
          <router-link
              v-if="link.name !== 'Home'"
              :to="{name: link.to}"
                       active-class="active-link"
          >
            {{ link.name }}
          </router-link>
        </template>
      </div>
    </nav>
    <div class="content">
      <RouterView/>
    </div>
    <footer>
      <p>
        Made with ❤️ by <a href="https://www.linkedin.com/in/kiranparajuli589/">Kiran Parajuli</a>
      </p>
    </footer>
  </main>
</template>
<style lang="sass">
main
  max-width: 800px
  margin: 0 auto

.content
  padding-block: 1rem
  padding-bottom: 4rem

.app-bar
  display: flex
  justify-content: space-between
  align-items: center
  padding: 0 1rem
  height: 48px
  border-bottom: 1px solid black

  .brand
    font-size: 1.5rem
    font-weight: bold
    cursor: pointer

    background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff)
    background-clip: initial
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent

  .links
    display: flex
    gap: 1rem
    justify-content: space-between
    align-items: center

    a
      color: #000
      text-decoration: none

      &:hover
        color: #119611

      &.active-link
        color: #119611
        border-bottom: 2px solid #119611

footer
  text-align: center
  position: fixed
  bottom: 0
  width: 800px
  margin: 0 auto
  background-color: grey
  font-size: .875rem
  padding-block: .4rem
  color: #eee

  a
    color: #eee

    &:hover
      color: #fff

@media (max-width: 800px)
  .content
    padding-inline: 1rem

@media (max-width: 600px)
  .app-bar
    padding-block: .5rem
    height: 100%
    flex-direction: column
    gap: 1rem
    justify-items: start
    align-items: start

    .links
      flex-direction: column
      justify-items: start
      align-items: start
</style>

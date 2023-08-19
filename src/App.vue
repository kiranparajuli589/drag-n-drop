<script setup lang="ts">
import {links} from "./constants"
</script>
<template>
  <main>
    <nav class="app-bar">
      <div class="brand">Drag n Drop</div>
      <div class="links">
        <router-link v-for="(link, index) in links"
           :key="index"
           :to="{name: link.to}"
           active-class="active-link"
        >
          {{ link.name }}
        </router-link>
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
.app-bar
  display: flex
  justify-content: space-between
  align-items: center
  padding: 0 1rem
  background-color: #333
  height: 48px
  color: #fff

  .brand
    font-size: 1.5rem
    font-weight: bold

  .links
    display: flex
    gap: 1rem
    justify-content: space-between
    align-items: center

    a
      color: #fff
      text-decoration: none

      &:hover
        color: #ccc

      &.active-link
        color: #ccc
        border-bottom: 2px solid #ccc

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

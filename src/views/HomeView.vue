<script setup lang="ts">
import {links} from "../constants"

const linksWithoutHome = links.filter((link) => link.name !== "Home")
</script>
<template>
  <div class="home">
    <div class="site-title">Drag-n-Drop</div>
    <div class="site-subtitle">
      An exploration of the HTML5 Drag and Drop API with the beautiful Vue.js
    </div>
    <div class="card-wrapper center-content">
      <div class="card center-content"
           v-for="link in linksWithoutHome"
           :key="link.name"
           @click="$router.push({ name: link.to })"
      >
        <p>
          {{ link.name }}
        </p>
      </div>
    </div>
  </div>
</template>
<style lang=sass>
.center-content
  display: flex
  justify-content: center
  align-items: center

.home
  width: 100%
  padding: 1rem

  .site-title
    font-size: clamp(40px, 5vw, 75px)
    font-weight: 700
    text-align: center
    margin-bottom: .5rem

    background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff)
    background-clip: initial
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent

  .site-subtitle
    text-align: center
    margin-bottom: 3rem


  .card-wrapper
    flex-wrap: wrap
    gap: 1rem

  .card
    max-width: 300px
    width: 150px
    height: 100px
    padding: 1rem
    border: 1px solid #ccc
    border-radius: 4px
    cursor: pointer

    &:hover
      box-shadow: 0 0 10px 0 #ccc

      p
        color: #4caf50
        text-decoration: underline
</style>

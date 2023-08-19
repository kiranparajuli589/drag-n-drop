<script setup lang="ts">
import { links } from "../constants"
const linksWithoutHome = links.filter((link) => link.name !== "Home")
</script>
<template>
	<div class="home center-content">
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

  .card-wrapper
    flex-wrap: wrap
    gap: 1rem

  .card
    max-width: 300px
    width: 150
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
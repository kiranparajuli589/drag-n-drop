<script setup lang="ts">
import { computed, reactive, ref } from "vue"

const getAssetUrl = (name: string) => {
	return new URL(`../assets/lady/${name}`, import.meta.url).href
}

interface Component {
	name: string
	image: string
}

const canvas = ref<HTMLElement>()
const componentsDiv = ref<HTMLElement>()
const summary = ref<string[]>([])

const dragComplete = computed(() => {
	return summary.value.length === components.length
})
const zeroDrag = computed(() => {
	return summary.value.length === 0
})

const components: Component[] = reactive([
	{ name: "hair", image: getAssetUrl("hair.png") },
	{ name: "left-eye", image: getAssetUrl("eye.png") },
	{ name: "right-eye", image: getAssetUrl("eye.png") },
	{ name: "nose", image: getAssetUrl("nose.png") },
	{ name: "mouth", image: getAssetUrl("mouth.png") },
	{ name: "necklace", image: getAssetUrl("necklace.png") },
])

const dragStart = (event: DragEvent) => {
	const target = event.target as HTMLImageElement
	if (event.dataTransfer) {
		event.dataTransfer.setData("text/plain", target.alt)
		event.dataTransfer.effectAllowed = "move"
	}
}

const dragOverHandler = (event: DragEvent) => {
	event.preventDefault()
	if (event.dataTransfer) {
		event.dataTransfer.dropEffect = "move"
	}
}

const dropHandler = (event: DragEvent) => {
	event.preventDefault()
	if (event.dataTransfer) {
		const draggedAlt = event.dataTransfer.getData("text/plain")
		const el = document.querySelector(`img[alt="${draggedAlt}"]`)
		canvas.value?.append(el as Node)
	}
}

const dragEnd = (event: DragEvent) => {
	event.preventDefault()
	const draggedEl = event.target as HTMLImageElement
	let name = draggedEl.alt
	if (name.includes("-")) {
		name = name.split("-")
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ")
	} else {
		name = name.charAt(0).toUpperCase() + name.slice(1)
	}
	summary.value.push(`You added "${name}" to the canvas`)
}

const resetDrag = () => {
	summary.value = []
	canvas.value?.querySelectorAll("img").forEach(el => {
		componentsDiv.value?.append(el)
	})
}
</script>

<template>
	<main class="home">
		<nav>
			<h1>Complete Lady</h1>
			<p>
				Drag and drop the components to the canvas to complete the lady.
			</p>
		</nav>
		<section class="editor">
			<div class="menu">
				<div class="components" ref="componentsDiv">
					<img v-for="(component, index) in components"
						:key="index"
						class="component"
						draggable="true"
						@dragstart="dragStart"
						:id="component.name"
						:src="component.image"
						:alt="component.name"
						@dragend="dragEnd"
					/>
				</div>

				<template v-if="dragComplete">
					<p class="cheers">Cheers! You have completed the lady.</p>
					<button class="reset" @click="resetDrag">Reset</button>
				</template>
				<template v-if="!zeroDrag && !dragComplete">
					<br>
					<hr><br>
				</template>

				<h2 v-if="!zeroDrag">Summary</h2>
				<ul>
					<li v-for="(item, index) in summary" :key="index">{{ item }}</li>
				</ul>
			</div>
			<div ref="canvas"
				class="canvas"
				@dragover="dragOverHandler"
				@drop="dropHandler"
			/>
		</section>
	</main>
</template>
<style lang="sass">
.home
  padding: 1rem
  nav
    margin-bottom: 1rem
    border-bottom: 1px solid #ccc
  .editor
    display: flex
    .menu
      width: 40%
      .cheers
        font-size: 1.5rem
        font-weight: bold
        color: #4caf50
        margin-bottom: 1rem
      .reset
        margin-bottom: 1rem
        padding: .5rem 1rem
      ul>li
        margin-left: 1rem
      .components
        display: flex
        flex-wrap: wrap
        gap: .5rem
        justify-items: start
        .component
          height: 50px
          aspect-ratio: 1
          border: 1px solid #ccc
          user-select: none
          cursor: copy
          img
            width: 100%
            height: 100%
    .canvas
      width: 60%
      border: 1px solid #ccc
      height: 70vh
      position: relative
      #mouth, #nose, #left-eye, #right-eye, #hair, #necklace
        position: absolute
      #mouth
        height: 2.8rem
        width: 3.5rem
        top: 37.5%
        left: 44.4%
        z-index: 3
      #nose
        height: 3.8rem
        width: 3rem
        top: 28%
        left: 45.1%
        z-index: 2
      #left-eye, #right-eye
        height: 1.8rem
        width: 2.8rem
        top: 25%
        z-index: 3
      #left-eye
        left: 38%
      #right-eye
        left: 52%
      #hair
        left: 8%
        height: 28rem
        z-index: 1
      #necklace
        z-index: 2
        height: 10rem
        width: 12rem
        top: 52%
        left: 32%

</style>

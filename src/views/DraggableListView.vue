<template>
  <div class="draggable">
    <div class="head">
      <h1>Draggable List</h1>
      <p>
        Drag and drop the items between or within the lists.
      </p>
    </div>
    <div class="cols">
      <div class="list left"
           @dragover="dragOverHandler"
           @drop="dropHandler"
      >
        <h2>Left List</h2>
        <div class="list-item"
             v-for="(item, index) in leftList"
             :key="index"
             draggable="true"
             @dragstart="dragStart"
             @dragend="dragEnd"
        >
          {{ item }}
        </div>
      </div>
      <div class="list right"
           @dragover="dragOverHandler"
           @drop="dropHandler"
      >
        <h2>Right List</h2>
        <div class="list-item"
             v-for="(item, index) in rightList"
             :key="index"
             draggable="true"
             @dragstart="dragStart"
             @dragend="dragEnd"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const leftList = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]
const rightList = ["Item 6", "Item 7", "Item 8", "Item 9", "Item 10"]

const dragStart = (e: DragEvent) => {
  const target = e.target as HTMLDivElement
  target.classList.add("dragging")

  if (e.dataTransfer) {
    e.dataTransfer.setData("text/plain", target.innerText)
    e.dataTransfer.effectAllowed = "move"
  }
}

const dragEnd = (e: DragEvent) => {
  const target = e.target as HTMLDivElement
  target.classList.remove("dragging")
}

const dragOverHandler = (e: DragEvent) => {
  e.preventDefault()
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = "move"

    let container = e.target as HTMLElement
    if (container.classList.contains("list-item")) {
      container = container.parentElement as HTMLElement
    }

    const afterListItem = getAfterListItem(container, e.clientY)
    const listItemBeingDragged = document.querySelector(".list-item.dragging")

    if (afterListItem) {
      container.insertBefore(listItemBeingDragged, afterListItem)
    } else {
      container.append(listItemBeingDragged)
    }
  }
}


const getAfterListItem = (container: HTMLElement, y: number): HTMLElement => {
  const listItems = [...container.querySelectorAll(".list-item:not(.dragging)")]
  return listItems.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return {offset, element: child}
    } else {
      return closest
    }
  }, {offset: Number.NEGATIVE_INFINITY}).element as HTMLElement
}

const dropHandler = (e: DragEvent) => {
  e.preventDefault()
}
</script>
<style lang="sass">
.draggable
  .head
    padding-bottom: 1rem
  .cols
    display: flex
    gap: 1rem
    .list
      max-width: 300px
      width: 300px
      padding: 1rem
      border: 1px solid #ccc
      border-radius: 4px
      .list-item
        border: 1px solid #ccc
        border-radius: 4px
        padding: 1rem
        margin-top: 1rem
      .list-item.dragging
        opacity: .5
        background-color: #ccc
        cursor: grabbing

@media (max-width: 600px)
  .draggable
    .cols
      flex-wrap: wrap
      .list
        width: 100%
        max-width: 100%
</style>

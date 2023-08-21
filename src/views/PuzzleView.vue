<template>
  <div class="puzzle">
    <div class="head">
      <h1>Puzzle</h1>
      <p>
        Drag the pieces to the right place to reveal the image!
      </p>
      <br>
      <button class="reset" @click="populatePuzzlePiecesArray">Reset</button>
    </div>
    <div class="playground">
      <div class="piece"
         v-for="(piece, index) in puzzlePieces"
         :class="'piece-' + (index + 1)"
         :key="piece"
      >
        {{ piece }}
      </div>
      <div class="piece empty-piece piece-9" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, ref, reactive, nextTick} from 'vue';

const isCompleted = ref(false)
const puzzlePieces: number[] = reactive([])

onMounted(() => {
  populatePuzzlePiecesArray()
})

const populatePuzzlePiecesArray = () => {
  puzzlePieces.length = 0

  for (let i = 1; i <= 8; i++) {
    const random: number = Math.floor(Math.random() * 8) + 1
    if (!puzzlePieces.includes(random)) {
      puzzlePieces.push(random)
    } else {
      i--
    }
  }
  nextTick(() => {
    initializeDragAndDrop()
  })
}

const allowedDrag = [
  {empty: 1, allowed: [2, 4]},
  {empty: 2, allowed: [1, 3, 5]},
  {empty: 3, allowed: [2, 6]},
  {empty: 4, allowed: [1, 5, 7]},
  {empty: 5, allowed: [2, 4, 6, 8]},
  {empty: 6, allowed: [3, 5, 9]},
  {empty: 7, allowed: [4, 8]},
  {empty: 8, allowed: [5, 7, 9]},
  {empty: 9, allowed: [6, 8]}
]

const removeEventsFromAllPieces = () => {
  const allPieces = document.querySelectorAll('.piece')
  allPieces.forEach(piece => {
    piece.removeAttribute('draggable')
    piece.removeEventListener('dragstart', onDragStart)
    piece.removeEventListener('dragend', onDragEnd)
    piece.removeEventListener('drop', onDragDrop)
  })
}

const addEventsToReleventPieces = () => {
  const emptyPiece: Element = document.querySelector('.empty-piece')
  const emptyPieceIndex = getIndex(emptyPiece.className)
  const dragAllowedPieces = allowedDrag.find(piece => piece.empty === emptyPieceIndex).allowed

  dragAllowedPieces.forEach(piece => {
    const pieceEl = document.querySelector(`.piece-${piece}`)
    pieceEl.setAttribute('draggable', 'true')
    pieceEl.addEventListener('dragstart', onDragStart)
    pieceEl.addEventListener('dragend', onDragEnd)
  })

  emptyPiece.addEventListener('dragover', onDragOver)
  emptyPiece.addEventListener('drop', onDragDrop)
}

const initializeDragAndDrop = () => {
  checkIfPuzzleIsComplete()
  if (isCompleted.value) return

  removeEventsFromAllPieces()
  addEventsToReleventPieces()
}

const onDragStart = (event: DragEvent) => {
  const target = event.target as Element
  target.classList.add('dragging')
  if (event.dataTransfer) {
    event.dataTransfer.setData("text/plain", target.className)
    event.dataTransfer.effectAllowed = "move"
  }
}

const onDragEnd = (event: DragEvent) => {
  event.preventDefault()
  const target = event.target as Element
  target.classList.remove('dragging')
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move"
  }
}

const getIndex = (classListString: string):number => {
  const pieceIndexRegex = /\d/.exec(classListString)
  return pieceIndexRegex ? Number(pieceIndexRegex[0]) : 0
}

const onDragDrop = (event: DragEvent) => {
  event.preventDefault()
  const emptyPiece = event.target as Element

  if (event.dataTransfer) {
    const draggedPieceClass = event.dataTransfer.getData("text/plain")

    const draggedPieceIndex = getIndex(draggedPieceClass)
    const emptyPieceIndex = getIndex(emptyPiece.className)

    if (draggedPieceIndex) {
      const draggedPiece = document.querySelector(`.piece-${draggedPieceIndex}`)
      if (draggedPiece) {
        emptyPiece.className = 'piece piece-' + emptyPieceIndex
        draggedPiece.className = 'piece empty-piece piece-' + draggedPieceIndex

        emptyPiece.innerHTML = draggedPiece.innerHTML
        draggedPiece.innerHTML = ''

        nextTick(() => {
          initializeDragAndDrop()
        })
      }
    }
  }
}

const checkIfPuzzleIsComplete = () => {
  const allPieces = document.querySelectorAll('.piece')
  const attemptedSolution = []
  allPieces.forEach(piece => {
    attemptedSolution.push(piece.innerHTML)
  })

  const actualSolution = ['1', '2', '3', '4', '5', '6', '7', '8', '']
  if (attemptedSolution.join('') === actualSolution.join('')) {
    alert('You solved the puzzle!')
    isCompleted.value = true
  }
  isCompleted.value = false
}
</script>
<style scoped lang=sass>
.puzzle
  .head
    margin-bottom: 1rem

  .playground
    display: flex
    flex-wrap: wrap
    justify-content: start
    width: 300px
    height: 300px
    outline: 1px solid #000

    .piece
      width: 100px
      height: 100px
      border: 1px solid #000
      display: flex
      justify-content: center
      align-items: center
      font-size: 2rem
      user-select: none

    .piece.dragging
      opacity: .5
    .piece[draggable="true"]
      cursor: move
  .reset
    padding: .5rem 1rem
</style>

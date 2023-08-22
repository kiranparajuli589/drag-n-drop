<template>
  <div class="puzzle">
    <div class="head">
      <h1>Puzzle</h1>
      <p>
        Drag the pieces to the right place to reveal the image!
      </p>
      <br>
      <button class="reset" @click="populatePuzzlePiecesArray">Reset</button>
      <br><br>
      <label for="cell-count-select">Select Dimensions: </label>
      <select v-model="cellCount" class="cell-count-select"
              id="cell-count-select"
              @change="populatePuzzlePiecesArray"
      >
        <option value="9">3x3</option>
        <option value="25">5x5</option>
        <option value="49">7x7</option>
      </select>
    </div>
    <div class="playground"
      :style="`width: ${Math.sqrt(cellCount) * 100}px`"
    >
      <div class="piece"
           v-for="(piece, index) in puzzlePieces"
           :class="'piece-' + (index + 1)"
           :key="piece"
      >
        {{ piece }}
      </div>
      <div class="piece empty-piece"
        :class="'piece-' + cellCount"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, ref, reactive, nextTick} from 'vue';

interface AllowedDrag {
  empty: number,
  allowed: number[]
}

const cellCount = ref<number>(25)
const isCompleted = ref<boolean>(false)
const allowedDrag: AllowedDrag[] = reactive([])
const puzzlePieces: number[] = reactive([])

onMounted(() => {
  populatePuzzlePiecesArray()
})

const populatePuzzlePiecesArray = () => {
  puzzlePieces.length = 0
  const limit  = cellCount.value - 1

  for (let i = 1; i <= limit; i++) {
    const random: number = Math.floor(Math.random() * limit) + 1
    if (!puzzlePieces.includes(random)) {
      puzzlePieces.push(random)
    } else {
      i--
    }
  }

  nextTick(async () => {
    await generateAllowedDrag(cellCount.value)
    await initializeDragAndDrop()
  })
}

const generateAllowedDrag = (cellCount: number) => {
  allowedDrag.length = 0
  const gridSize = Math.sqrt(cellCount);

  for (let i = 1; i <= cellCount; i++) {
    const allowed = [];

    // Calculate row and column of current cell
    const row = Math.floor((i - 1) / gridSize);
    const col = (i - 1) % gridSize;

    // Calculate allowed positions based on neighboring cells
    if (row - 1 >= 0) allowed.push(i - gridSize);
    if (row + 1 < gridSize) allowed.push(i + gridSize);
    if (col - 1 >= 0) allowed.push(i - 1);
    if (col + 1 < gridSize) allowed.push(i + 1);

    allowedDrag.push({empty: i, allowed});
  }
}

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

const getIndex = (classListString: string): number => {
  const pieceIndexRegex = /\d+/.exec(classListString)
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

  const actualSolution = []
  for (let i = 1; i <= cellCount.value - 1; i++) {
    actualSolution.push(i.toString())
  }
  actualSolution.push('')

  if (arraysEqual(attemptedSolution, actualSolution)) {
    alert('You solved the puzzle!')
    isCompleted.value = true
  }
  isCompleted.value = false
}

function arraysEqual(a:string[], b:string[]) {
  if (a === b) return true;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
</script>
<style scoped lang=sass>
.puzzle
  .head
    margin-bottom: 1rem
    .reset
      padding: .5rem 1rem
    select
      padding: .3rem

  .playground
    display: flex
    flex-wrap: wrap
    justify-content: start
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

</style>

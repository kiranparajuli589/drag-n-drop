<template>
  <div class="file-uploader">
    <div class="head">
      <h1>File Uploader</h1>
      <p>
        Drag files here from finder or explorer
      </p>
    </div>
    <div id="upload-area"
      @dragenter="onDragEnter"
      @dragover="onDragOver"
      @drop="onDrop"
    >
        DROP FILES HERE FROM FINDER OR EXPLORER
    </div>
  </div>
</template>
<script setup lang="ts">
const onDragEnter = (event: DragEvent) => {
  event.preventDefault();
  const uploadArea = document.getElementById('upload-area') as HTMLElement;
  uploadArea.textContent = '';
  event.stopPropagation();
}

const onDragOver = (event: DragEvent) => {
  event.stopPropagation();
  event.preventDefault();
}
const doDrop = (event: DragEvent) => {
  if (event.dataTransfer) {
    var dt = event.dataTransfer;
    var files = dt.files;

    var count = files.length;

    output("File Count: " + count + "\n");

    for (var i = 0; i < files.length; i++) {

      const fileObj = {
        lastModified: files[i].lastModified,
        name: files[i].name,
        size: files[i].size / 1000 + 'kb',
        type: files[i].type,
      }

      output(
        " File " + i + ":\n" +
        "  Name: " + fileObj.name + "\n" +
        "  Size: " + fileObj.size + "\n" +
        "  Type: " + fileObj.type + "\n" +
        "  Last Modified Date: " + new Date(fileObj.lastModified) + "\n"
      )
    }
  }
}

const onDrop = (event: DragEvent) => {
  event.stopPropagation(); event.preventDefault();
  doDrop(event);
}

const output = (text:string) => {
  const uploadArea = document.getElementById('upload-area') as HTMLElement;
  uploadArea.textContent += text;
}
</script>
<style lang="sass">
.file-uploader
  #upload-area
    min-height: 200px
    white-space: pre
    border: 1px solid black
</style>

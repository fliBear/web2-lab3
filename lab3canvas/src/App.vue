<template>
  <div class="container">
    <canvas id="game-canvas" v-on:click="clickCanvas" class="canvas"></canvas>
  </div>
</template>

<script>
import component, {getRandomNumber} from "./util/component.js";
export default {
  data: function() {
    return {
      myGamePiece: null,
      myGameArea: null,
      context: null,
      canvas: null,
      frameNo: null,
      interval: null,
      myGamePiece: null,
      width: 500,
      height: 300,
      componentDim: 30,
      pieces: [],
      componentNum: null
    }
  },
  methods: {
    init: function () {
      this.canvas = document.getElementById("game-canvas");
      this.context = this.canvas.getContext("2d");
      let piecesNum = getRandomNumber(1, 5);
      for (let i = 0; i < piecesNum; i++) {
        this.pieces.push(new component(this.componentDim, this.componentDim, "red", this.width, this.height, undefined, this.context));
      }
      this.componentNum = this.pieces.length
      this.updateAreaText();
      this.start();
    },
    start: function () {
      this.canvas.id = "myGameCanvas";
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.frameNo = 0;
      this.interval = setInterval(this.updateGameArea, 20);
    },
    stop: function () {
      clearInterval(this.interval);
    },
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    updateAreaText: function() {
      this.context.font = "20px Georgia";
      let text = `Broj komponenti: ${this.componentNum}`;
      this.context.fillText(text, this.width - this.context.measureText(text).width - 5, 20);
      text = `Broj pogođenih: ${this.componentNum - this.pieces.length}`;
      this.context.fillText(text, this.width - this.context.measureText(text).width - 5, 50);
    },
    updateGameArea: function() {
      this.clear();
      for(let piece of this.pieces) {
        piece.newPos();
        piece.update();
      }
      this.updateAreaText();
    },
    clickCanvas: function (event) {
      let eject = -1;
      for(let i = 0; i < this.pieces.length; i++) {
        let piece = this.pieces[i];
        //Left of component
        if(piece.x > event.clientX) {
          continue;
        }
        //Above of component
        if(piece.y > event.clientY) {
          continue;
        }
        //Left of component
        if(piece.x + this.componentDim < event.clientX) {
          continue;
        }
        //Bellow component
        if(piece.y + this.componentDim < event.clientY) {
          continue;
        } 
        eject = i;
        break;
      }
      if(eject != -1) {
        this.pieces.splice(eject, 1);
      }
    }
  },
  mounted: function () {
    this.init();
  }
}
</script>

<style scoped>
canvas {
  border: 1px solid #000000;
  background-color: #f1f1f1;
}

.countainer {
  margin: 0;
  padding: 0;
}

.canvas {
  margin: 0;
  padding: 0;
}

</style>

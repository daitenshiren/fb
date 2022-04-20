<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-btn icon="mode_edit" color="primary" @click="allowDraw = !allowDraw" />
        <k-stage
          ref="stage"
          @mousedown="mousedownHandler"
          @mousemove="mousemoveHandler"
          @mouseup="mouseupHandler"
          :config="configKonva"
        >
          <k-layer ref="stageLayer">
            <k-rect
              @dragstart="handleDragStart"
              @dragend="handleDragEnd"
              v-for="(rec, index) in recs"
              :key="index"
              :config="{
                x: Math.min(rec.startPointX, rec.startPointX + rec.width),
                y: Math.min(rec.startPointY, rec.startPointY + rec.height),
                width: Math.abs(rec.width),
                height: Math.abs(rec.height),
                fill: 'lightblue',
                stroke: 'black',
                strokeWidth: 3,
                draggable: true,
              }"
            />
          </k-layer>
        </k-stage>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
  const width = window.innerWidth;
  const height = window.innerHeight;

  export default {
    name: 'Test',
    data() {
      return {
        rect: null,
        allowDraw: false,
        isDrawing: false,
        isDragging: false,
        configKonva: {
          width: width,
          height: height
        },
        recs: []
        /*configCircle: {
          x: 300,
          y: 300,
          radius: 70,
          fill: "red",
          stroke: "black",
          strokeWidth: 4,
          draggable: true,
        }*/
      };
    },
    methods: {
      handleDragStart() {
        this.isDragging = true;
      },
      handleDragEnd() {
        this.isDragging = false;
      },
      mousedownHandler (event) {
        const pos = this.$refs.stage.getNode().getPointerPosition();

        if (this.allowDraw) {
          this.isDrawing = true;

          this.setRecs([
            ...this.recs,
            { startPointX: pos.x, startPointY: pos.y, width: 0, height: 0 },
          ]);
        }
      },
      setRecs(element) {
        if (this.allowDraw) {
          this.recs = element;
        }
      },
      mousemoveHandler () {
        // no drawing - skipping
        if (!this.isDrawing) {
          return;
        }
        // console.log(event);
        const point = this.$refs.stage.getNode().getPointerPosition();
        // handle  rectangle part
        let curRec = this.recs[this.recs.length - 1];
        curRec.width = point.x - curRec.startPointX;
        curRec.height = point.y - curRec.startPointY;
      },
      mouseupHandler () {
        if (this.allowDraw) {
          this.isDrawing = false;
        }
      },
    }
  }
</script>

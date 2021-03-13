<template>
  <div id="app" class="app">
    <div class="app__container">
      <div class="app__header">
        <h1>Toy Robot Challenge</h1>
        <p>
          The 'Z' key is to rotate the robot anti-clockwise and 'X' for
          clockwise. Press the 'M' key to move forward.
        </p>
        <p>
          To begin click the button below.
        </p>
        <button class="app__btn" @click="handleGo">
          {{ renderButtonText }}
        </button>
      </div>
      <ul class="app__notification-list">
        <li class="app__notification-item">
          <strong>Current X Position:</strong> <span>{{ state.posX }}</span>
        </li>
        <li class="app__notification-item">
          <strong>Current Y Position:</strong> <span>{{ state.posY }}</span>
        </li>
        <li class="app__notification-item">
          <strong>Facing:</strong> <span>{{ state.facing }}</span>
        </li>
      </ul>
      <div class="app__grid">
        <div v-for="index in 25" :key="index" class="app__grid-tile" />
        <img
          class="app__robot"
          :style="{
            bottom: `${state.posY * 100}px`,
            left: `${state.posX * 100}px`,
            transform: `rotate(${state.rotation}deg)`,
          }"
          src="./assets/robot-a-3d.png"
          alt="Robot"
        />
      </div>
      <div class="app__footer">
        <button class="app__btn" @click="handleFinish">
          End game
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from '@vue/composition-api'

const NORTH = 'NORTH'
const EAST = 'EAST'
const SOUTH = 'SOUTH'
const WEST = 'WEST'

export default {
  name: 'App',
  setup() {
    const state = reactive({
      gameActive: false,
      facing: NORTH,
      posX: 0,
      posY: 0,
      rotation: 0,
    })

    const renderButtonText = computed(() =>
      state.gameActive ? 'Restart' : 'Start!'
    )

    const handleGo = () => {
      event.target.blur()

      if (!state.gameActive) {
        bindEvents()
      }

      state.gameActive = true
      state.rotation = 0

      place(0, 0, NORTH)
    }

    const bindEvents = () => {
      document.addEventListener('keyup', keyBoardHandler)
    }

    const keyBoardHandler = event => {
      // M move forwards
      if (event.code === 'KeyM') {
        handleMove()
      }

      // X rotate clockwise
      if (event.code === 'KeyX') {
        if (state.rotation === 360) {
          state.rotation = 0
        }

        state.rotation += 90

        setCompass()
      }

      // Z rotate anti-clockwise
      if (event.code === 'KeyZ') {
        console.log(event)

        if (state.rotation === -360) {
          state.rotation = 0
        }

        state.rotation -= 90

        setCompass()
      }
    }

    const setCompass = () => {
      switch (state.rotation) {
        case 0:
        case 360:
        case -360:
          state.facing = NORTH
          break
        case 90:
        case -270:
          state.facing = EAST
          break
        case 180:
        case -180:
          state.facing = SOUTH
          break
        case 270:
        case -90:
          state.facing = WEST
          break
      }
    }

    const handleFinish = () => {
      state.gameActive = false
      document.removeEventListener('keyup', keyBoardHandler)
    }

    const handleMove = () => {
      if (
        (state.facing === NORTH && state.posY === 4) ||
        (state.facing === SOUTH && state.posY === 0) ||
        (state.facing === EAST && state.posX === 4) ||
        (state.facing === WEST && state.posX === 0)
      ) {
        return
      }

      let moveX = state.posX
      let moveY = state.posY

      if (state.facing === NORTH) {
        moveY += 1
      }

      if (state.facing === SOUTH) {
        moveY -= 1
      }

      if (state.facing === EAST) {
        moveX += 1
      }

      if (state.facing === WEST) {
        moveX -= 1
      }

      place(moveX, moveY)
    }

    const place = (x, y, facing = state.facing) => {
      state.facing = facing
      state.posX = x
      state.posY = y
    }

    return {
      state,
      renderButtonText,
      handleGo,
      handleFinish,
    }
  },
}
</script>

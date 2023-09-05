<script setup lang="ts">
defineProps<{ src: string }>();
import { PinchGesture, Vector2 } from "@use-gesture/vanilla";
const img = ref() as Ref<HTMLElement>;

const center = ref<Vector2>([0, 0]);
const scale = ref(1);

let pinchGesture: PinchGesture;

const resetGestures = () => {
  // reset
  scale.value = 1;
  center.value = [0, 0];
  pinchGesture?.destroy();

  // init
  pinchGesture = new PinchGesture(img.value, (state) => {
    if (!state.pinching) {
      resetGestures();
      return;
    }
    scale.value = state.offset[0];
  });
};

onMounted(() => resetGestures());
</script>

<template>
  <img
    ref="img"
    class="object-contain"
    :src="src"
    alt=""
    :style="{
      transform: `scale(${scale}) translate(${center[0]}px, ${center[1]}px)`,
    }"
  />
</template>

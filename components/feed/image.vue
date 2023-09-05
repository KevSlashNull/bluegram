<script setup lang="ts">
const props = defineProps<{ postId: string; src: string }>();
import { getImageSizes } from "~/lib/image-cache";
const dimension = computed(() => getImageSizes(props.postId)[0]);
</script>

<template>
  <img
    class="rounded-b-xl z-10"
    :src="src"
    :height="dimension?.height"
    :width="dimension?.width"
    alt=""
  />
</template>

<style scoped>
img {
  transition: 0.2s ease-in-out all;
}

img:not(.hidden) {
  opacity: 1;
  transform: scale(1);
}

.hidden {
  opacity: 0;
  transform: scale(0.8);
}
</style>

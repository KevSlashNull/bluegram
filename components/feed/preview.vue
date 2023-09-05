<script setup lang="ts">
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

defineProps<{
  actor: ProfileView;
  indexedAt: Date;
  imageUrl: string;
  postCid: string;
}>();
defineEmits<{ (event: "close"): void }>();

const mounted = ref(false);
onMounted(() => {
  setTimeout(() => {
    mounted.value = true;
  }, 10);
});
</script>

<template>
  <div
    class="overlay"
    @contextmenu="(e) => e.preventDefault()"
    @click="
      (e) => {
        e.preventDefault();
        $emit('close');
      }
    "
  >
    <div
      class="container z-10 flex flex-col justify-center items-center mx-auto"
      :class="{ mounted: mounted }"
    >
      <post-author-header
        class="z-10 w-full rounded-t-xl"
        :indexed-at="indexedAt"
        :actor="actor"
      />
      <feed-image :src="imageUrl" :post-id="postCid" />
    </div>
    <div class="blur" />
    <div class="blur" />
    <div class="blur" />
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
}

.container.mounted {
  transform: scale(1);
}

.container {
  max-width: 80%;
  height: 100%;
  transform: scale(0.9);
  transition: 0.08s ease-in-out all;
}

.container img {
  max-width: 100%;
}

.blur {
  position: absolute;
  backdrop-filter: blur(2px);
  z-index: 2;
  top: -50px;
  left: -50px;
  right: -50px;
  bottom: -50px;
}
</style>

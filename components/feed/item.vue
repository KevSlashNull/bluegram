<script setup lang="ts">
import type { AppBskyFeedDefs } from "@atproto/api";
import { ViewImage } from "@atproto/api/dist/client/types/app/bsky/embed/images";
import { addImage as trackImageDimensions } from "~/lib/image-cache";

const props = defineProps<{
  post: AppBskyFeedDefs.PostView;
  warn: boolean;
  lazy: boolean;
}>();
const $emit = defineEmits(["click", "open", "close"]);

const openDate = ref(0);
const open = ref(false);

function startTouch() {
  const date = Date.now();
  openDate.value = date;
  setTimeout(() => {
    if (openDate.value === date) {
      open.value = true;
      $emit("open");
    }
  }, 200);
}

function makeMove(e: TouchEvent) {
  if (open.value) {
    e.preventDefault();
    return;
  }
  const touch = e.touches[0];
  if (!touch) return;
  const total = Math.abs(touch.clientX) + Math.abs(touch.clientY);

  if (total > 7) {
    openDate.value = 0;
  }
}

function endTouch() {
  openDate.value = 0;
  open.value = false;
  $emit("close");
}

function handleClick(e: Event) {
  if (open.value) {
    e.preventDefault();
  }
  $emit("click");
}

const images = computed<ViewImage[]>(
  () => (props.post.embed?.images as any) || []
);

onMounted(() => {
  trackImageDimensions(
    props.post.cid,
    images.value.map((r: any) => r.thumb)
  );
});
</script>

<template>
  <div
    class="post flex aspect-square relative overflow-hidden"
    :data-id="post.cid"
    :loading="lazy ? 'lazy' : ''"
    @touchstart="startTouch"
    @touchmove="makeMove"
    @touchend="endTouch"
    @touchcancel="endTouch"
    @contextmenu="(e) => e.preventDefault()"
    @click="handleClick"
  >
    <icon-image v-if="images.length > 1" class="absolute top-2 right-2" />
    <img :class="{ 'blur-lg': warn }" :src="images[0].thumb" alt="" />
  </div>
  <feed-preview
    v-if="open"
    :actor="post.author"
    :indexed-at="new Date(post.indexedAt)"
    :image-url="images[0].thumb"
    :post-cid="post.cid"
  />
</template>

<style scoped>
.post img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
</style>

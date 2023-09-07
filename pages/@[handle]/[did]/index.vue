<script setup lang="ts">
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { getImageSizes } from "~/lib/image-cache";
import { agent } from "~/lib/session";
const { data: actor } = await agent.getProfile({
  actor: String(useRoute().params.handle),
});
const uri = computed(() => {
  const { did } = useRoute().params;
  return `at://${actor.did}/app.bsky.feed.post/${did}`;
});
const { data } = await agent.getPostThread({
  uri: uri.value,
});
const post = computed(() => data.thread.post) as ComputedRef<
  PostView | undefined
>;
const likeId = ref(post.value?.viewer?.like);
if (data.thread.notFound) {
  throw createError({
    message: "Post not found",
    statusCode: 404,
    fatal: true,
  });
}
const isLiking = ref(false);
async function like() {
  if (isLiking.value) return;
  isLiking.value = true;
  if (likeId.value) {
    await agent.deleteLike(likeId.value);
    likeId.value = undefined;
  } else {
    const result = await agent.like(uri.value, String(post.value?.cid));
    likeId.value = result.uri;
  }
  isLiking.value = false;
}
const dimensions = computed(() => getImageSizes(String(post.value?.cid)));
const likeCount = computed(() => {
  const otherLikes = post.value?.likeCount || 0;
  const likes = otherLikes + +Boolean(likeId.value);

  const formatter = new Intl.NumberFormat(navigator.language);
  return formatter.format(likes);
});
</script>

<template>
  <div v-if="!post || data.thread.blocked">Blocked post.</div>
  <div v-else>
    <post-author-header :actor="actor" :indexed-at="new Date(post.indexedAt)" />
    <div class="images">
      <post-image
        v-for="({ fullsize }, index) in post.embed?.images"
        :src="fullsize"
        :height="(dimensions[index] || {}).height"
        :width="(dimensions[index] || {}).width"
      />
    </div>
    <div class="flex px-4 py-4 gap-2">
      <button @click="like">
        <icon-heart :class="{ 'fill-red-600 text-red-600': likeId }" />
      </button>
      {{ likeCount }}
    </div>

    <bsky-rich-text
      v-if="typeof (post.record as any)?.text === 'string'"
      class="px-4 pb-6"
      :text="(post.record as any).text"
      :facets="(post.record as any).facets"
    />
  </div>
</template>

<style scoped>
.images {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
}
</style>

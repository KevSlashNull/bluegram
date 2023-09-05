<script setup lang="ts">
import { agent } from "~/lib/session";
import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

const props = defineProps<{ uri: string }>();

const posts = ref<FeedViewPost[]>([]);
const lastCursor = ref<string>();

async function loadPosts() {
  const response = await agent.app.bsky.feed.getFeed({
    feed: props.uri,
    cursor: lastCursor.value,
  });
  lastCursor.value = response.data.cursor;
  posts.value = [...posts.value, ...response.data.feed];
}

async function loadMore() {
  await loadPosts();
}

watch(
  () => props.uri,
  async () => {
    posts.value = [];
    lastCursor.value = "";
    await loadPosts();
  }
);

await loadPosts();
</script>

<template>
  <feed-dumb-list :posts="posts" @more="loadMore" />
</template>

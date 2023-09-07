<script setup lang="ts">
import { getFeedLoader } from "~/lib/feed-loader";

const props = defineProps<{ uri: string }>();

const feedList = ref(await getFeedLoader(props.uri));

watch(
  () => props.uri,
  async () => {
    feedList.value = (await getFeedLoader(props.uri)) as any;
  }
);
</script>

<template>
  <feed-dumb-list :posts="feedList.posts" @more="() => feedList.loadMore()" />
</template>

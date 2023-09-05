<script setup lang="ts">
import { agent } from "~/lib/session";

const preferences = await usePreferences().then((r) => r.value);
const { feeds } = await agent.app.bsky.feed
  .getFeedGenerators({
    feeds: preferences.feeds.pinned || [],
  })
  .then((r) => r.data);

const selectedUri = useState<string>("currentFeed", () => feeds[0].uri);
</script>

<template>
  <feed-selector
    :feeds="feeds"
    :selected-uri="selectedUri"
    @select="(uri) => (selectedUri = uri)"
  />
  <feed-list :uri="selectedUri" />
</template>

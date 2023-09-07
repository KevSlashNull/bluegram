<script setup lang="ts">
import { agent } from "~/lib/session";

const preferences = await usePreferences().then((r) => r.value);
const { feeds } = await agent.app.bsky.feed
  .getFeedGenerators({
    feeds:
      (preferences.feeds.pinned?.length
        ? preferences.feeds.pinned
        : preferences.feeds.saved) || [],
  })
  .then((r) => r.data);

const selectedUri = useState<string>("currentFeed", () => feeds[0]?.uri);
</script>

<template>
  <feed-selector
    :feeds="feeds"
    :selected-uri="selectedUri"
    @select="(uri) => (selectedUri = uri)"
  />
  <feed-list v-if="selectedUri" :uri="selectedUri" />
  <div
    v-else
    class="py-8 flex flex-col items-center text-center max-w-[90%] mx-auto"
  >
    <h2 class="text-lg font-bold mb-1">No feed available?</h2>
    <p class="mb-5">
      In your Bluesky client, go to the <b>My Feeds</b> menu and pin one or more
      feeds. Alternatively, try Bluesky’s Discover feed.
    </p>
    <button
      class="bg-blue-700 w-max px-3 py-1.5 rounded-lg"
      @click="
        selectedUri =
          'at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot'
      "
    >
      Try the Discover feed
    </button>
  </div>
</template>

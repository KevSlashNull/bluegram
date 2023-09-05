<script setup lang="ts">
import { agent } from "~/lib/session";
const { data: actor } = await agent.getProfile({
  actor: String(useRoute().params.handle),
});

const { feed } = await agent
  .getAuthorFeed({
    actor: actor.did,
    filter: "posts_with_media",
  })
  .then((r) => r.data);
</script>
<template>
  <div>
    <div class="mb-3">
      <div class="flex px-5 py-1 items-center gap-3">
        <img
          class="rounded-full"
          :src="actor.avatar"
          height="64"
          width="64"
          alt=""
        />
        <div>
          <h2 class="text-lg font-bold truncate">{{ actor.displayName }}</h2>
          <h3 class="text-muted">
            @{{ actor.handle.replace(/.bsky.social$/, "") }}
          </h3>
        </div>
      </div>
      <div v-if="actor.description" class="px-5 py-1">
        <bsky-rich-text :text="actor.description" />
      </div>
    </div>
    <feed-dumb-list :posts="feed" />
  </div>
</template>

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

const stats = computed(() =>
  [
    [actor.followersCount, "followers"],
    [actor.followsCount, "follows"],
  ].filter((item) => (item[0] as any) >= 0)
);
</script>
<template>
  <div>
    <div class="mb-3">
      <div class="flex px-5 py-1 items-center gap-3">
        <img
          class="rounded-full"
          :src="actor.avatar"
          height="80"
          width="80"
          alt=""
        />
        <div class="truncate">
          <h2 class="text-lg font-bold truncate">{{ actor.displayName }}</h2>
          <h3 class="text-muted">
            @{{ actor.handle.replace(/.bsky.social$/, "") }}
          </h3>
          <div class="flex text-sm text-muted gap-1">
            <template v-for="([value, stat], index) in stats" :key="stat">
              <span
                >{{ value }}
                {{ value === 1 ? String(stat).replace(/s$/, "") : stat }}</span
              >
              <template v-if="index !== stats.length - 1">&middot;</template>
            </template>
          </div>
        </div>
      </div>
      <div v-if="actor.description" class="px-5 pt-2 pb-1">
        <bsky-rich-text :text="actor.description" />
      </div>
    </div>
    <feed-dumb-list :posts="feed" />
  </div>
</template>

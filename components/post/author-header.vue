<script setup lang="ts">
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

defineProps<{ actor: ProfileView; indexedAt: Date }>();
</script>

<template>
  <div class="w-full px-5 py-3 bg-gray-900">
    <div class="flex items-center w-full gap-2">
      <nuxt-link class="flex-shrink-0" :href="`/@${actor.handle}`">
        <img
          class="rounded-full"
          :src="actor.avatar"
          height="18"
          width="18"
          alt=""
        />
      </nuxt-link>
      <nuxt-link
        class="flex items-baseline gap-1 truncate"
        :href="`/@${actor.handle}`"
      >
        <span class="text-sm font-bold truncate">{{
          actor.displayName || actor.handle.replace(/.bsky.social$/, "")
        }}</span>
        <span class="text-sm text-muted truncate" v-if="actor.displayName"
          >@{{ actor.handle.replace(/.bsky.social$/, "") }}</span
        >
      </nuxt-link>
      <post-relative-date class="ml-auto flex-shrink-0" :date="indexedAt" />
    </div>
  </div>
</template>

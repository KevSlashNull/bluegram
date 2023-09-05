<script setup lang="ts">
import { GeneratorView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

defineProps<{ feeds: GeneratorView[]; selectedUri: string }>();
defineEmits<{ (event: "select", cid: string): void }>();
</script>
<template>
  <ul class="flex px-1 gap-1 font-bold overflow-auto">
    <li v-for="feed in feeds" :key="feed.cid">
      <button
        class="pb-2 px-2"
        :class="{ 'border-b border-blue-700': selectedUri === feed.uri }"
        @click="$emit('select', feed.uri)"
      >
        {{ feed.displayName }}
      </button>
    </li>
  </ul>
</template>

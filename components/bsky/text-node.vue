<script lang="ts" setup>
/**
 * Taken from https://github.com/strideynet/bsky-furry-feed
 * Copyright (c) 2023 Noah Stride under MIT License
 */
import type { RichTextSegment } from "@atproto/api";

defineProps<{ segment: RichTextSegment }>();
</script>

<template>
  <nuxt-link
    v-if="segment.isLink()"
    class="underline hover:no-underline text-blue-500"
    :href="segment.link?.uri"
    target="_blank"
  >
    {{ segment.text }}
  </nuxt-link>

  <nuxt-link
    v-else-if="segment.isMention()"
    class="underline hover:no-underline text-blue-500"
    :href="`/@${segment.mention?.did || segment.text.replace(/^@/, '')}`"
  >
    {{ segment.text.replace(/.bsky.social$/, "") }}
  </nuxt-link>
  <span v-else class="whitespace-pre-line">{{ segment.text }}</span>
</template>

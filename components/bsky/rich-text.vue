<script lang="ts" setup>
/**
 * Taken from https://github.com/strideynet/bsky-furry-feed
 * Copyright (c) 2023 Noah Stride under MIT License
 */

import * as atproto from "@atproto/api";
import { agent } from "~/lib/session";

const props = defineProps<{ text: string; facets?: atproto.Facet[] }>();

const segments = ref();

const updateDescription = async () => {
  const richTextProps: atproto.RichTextProps = {
    text: props.text,
    facets: props.facets,
  };
  const richText = new atproto.RichText(richTextProps, {
    cleanNewlines: true,
  });
  if (!richTextProps.facets) {
    await richText.detectFacets(agent);
  }
  segments.value = [...richText.segments()];
};

onMounted(updateDescription);
watch(() => props.text, updateDescription);
</script>
<template>
  <div>
    <bsky-text-node
      v-for="(segment, index) in segments"
      :key="index"
      :segment="segment"
    />
    <div v-if="!segments" class="whitespace-pre-line">
      {{ text }}
    </div>
  </div>
</template>

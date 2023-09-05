<script setup lang="ts">
const props = defineProps<{ date: Date }>();

const relative = computed(() => {
  const diff = Date.now() - props.date.getTime();

  if (diff < 1000) {
    return "now";
  } else if (diff < 1000 * 60) {
    return `${Math.round(diff / 1000)}s`;
  } else if (diff < 1000 * 60 * 60) {
    return `${Math.round(diff / 1000 / 60)}m`;
  } else if (diff < 1000 * 60 * 60 * 24) {
    return `${Math.round(diff / 1000 / 60 / 60)}h`;
  } else if (diff < 1000 * 60 * 60 * 24 * 365) {
    return `${Math.round(diff / 1000 / 60 / 60 / 24)}d`;
  }

  return `${Math.round(diff / 1000 / 60 / 60 / 24 / 365)}y`;
});
</script>

<template>
  <span class="text-xs text-muted">{{ relative }}</span>
</template>

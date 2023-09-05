<script setup lang="ts">
import { agent } from "~/lib/session";

const { data: user } = await agent.getProfile({
  actor: String(agent.session?.did),
});
</script>

<template>
  <header
    class="max-w-[500px] mx-auto"
    style="padding: 1rem 1.25rem; display: flex"
  >
    <nuxt-link href="/">
      <h1>Bluegram</h1>
    </nuxt-link>
    <nuxt-link class="ml-auto" :href="`/@${user.handle}`">
      <img class="rounded-full h-[32px] w-[32px]" :src="user.avatar" alt="" />
    </nuxt-link>
  </header>
  <main class="max-w-[500px] mx-auto">
    <slot />
  </main>
</template>

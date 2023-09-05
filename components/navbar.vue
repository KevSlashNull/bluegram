<script setup lang="ts">
import { agent, logout } from "~/lib/session";

const { data: user } = await agent.getProfile({
  actor: String(agent.session?.did),
});

function doLogout() {
  if (confirm("Log out of Bluegram?")) {
    logout();
    window.location.reload();
  }
}
</script>

<template>
  <header
    class="max-w-[500px] mx-auto flex gap-4"
    style="padding: 1rem 1.25rem; display: flex"
  >
    <nuxt-link href="/">
      <h1>Bluegram</h1>
    </nuxt-link>
    <button class="ml-auto" @click="doLogout">
      <icon-logout />
    </button>
    <nuxt-link :href="`/@${user.handle}`">
      <img class="rounded-full h-[32px] w-[32px]" :src="user.avatar" alt="" />
    </nuxt-link>
  </header>
</template>

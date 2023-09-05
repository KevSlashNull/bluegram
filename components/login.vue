<script setup lang="ts">
import { login } from "~/lib/session";

const identifier = ref("");
const password = ref("");
const error = ref("");

async function doLogin() {
  error.value = "";
  const ok = await login(identifier.value, password.value);
  if (!ok) {
    error.value = "Invalid identifier and password combination.";
    return;
  }

  window.location.reload();
}
</script>

<template>
  <div class="w-full h-full mx-auto fixed top-[15%]">
    <div
      class="flex flex-col gap-5 items-center justify-center max-w-[500px] mx-auto"
    >
      {{ error }}

      <h1 class="text-4xl">Bluegram</h1>

      <div class="form-element">
        <label for="identifier">Identifier</label>
        <input type="text" id="identifier" v-model="identifier" />
      </div>

      <div class="form-element">
        <label for="password">App password</label>
        <input type="password" id="password" v-model="password" />
      </div>

      <button class="mb-52 bg-blue-600 py-1 px-4 rounded-lg" @click="doLogin">
        Login
      </button>

      <div class="flex gap-2 text-muted">
        <nuxt-link
          class="text-blue-600"
          target="_blank"
          href="https://github.com/KevSlashNull/bluegram"
        >
          Source
        </nuxt-link>
        &middot;
        <nuxt-link
          class="text-blue-600"
          target="_blank"
          href="https://github.com/KevSlashNull/bluegram/blob/main/LICENSE"
        >
          License
        </nuxt-link>
      </div>
      <span class="text-muted text-sm max-w-[80%] text-center">
        All personal data used in Bluegram is either stored on your device or in
        your Bluesky server.
      </span>
    </div>
  </div>
</template>

<style scoped>
.form-element {
  @apply flex flex-col w-[80%];
}

input {
  @apply bg-gray-900 px-2 py-1 rounded-lg;
}
</style>

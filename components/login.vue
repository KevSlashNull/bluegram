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
  <div
    class="flex gap-5 flex-col items-center justify-center w-full h-full fixed"
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

    <a href="https://github.com/kevslashnull/bluegram"></a>
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

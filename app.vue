<script setup lang="ts">
import { checkLogin } from "~/lib/session";

const loggedIn = await checkLogin();

useHead({
  title: "Bluegram",
  bodyAttrs: {
    class: "bg-gray-950 text-white",
  },
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      href: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&family=Sedgwick+Ave+Display&display=swap",
      rel: "stylesheet",
    },
  ],
  meta: [
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
    },
  ],
});
</script>

<template>
  <layout v-if="loggedIn">
    <nuxt-page />
  </layout>
  <login v-else />
</template>

<script setup lang="ts">
import { BskyLabelPreference } from "@atproto/api";
import {
  FeedViewPost,
  PostView,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { useContentLabels } from "~/composables/usePreferences";

defineProps<{ posts: FeedViewPost[] }>();
const $emit = defineEmits(["more"]);

function goToPost(post: PostView) {
  const id = post.uri.replace(/^.+\/(\w+)/, "$1");
  useRouter().push(`/@${post.author.handle}/${id}`);
}

const observerElement = ref() as Ref<HTMLElement>;

let lastObserve = 0;

onMounted(() => {
  const observer = new IntersectionObserver(() => {
    if (Date.now() - lastObserve < 1000) return;
    lastObserve = Date.now();
    $emit("more");
  });
  observer.observe(observerElement.value);
});

const labels = await useContentLabels();

function checkLabels(post: PostView): BskyLabelPreference {
  if (!post.labels) return "show";

  const postLabels = post.labels.map((label) => label.val);

  let highestLabel: BskyLabelPreference = "show";

  for (let postLabel of postLabels) {
    // what????
    if (postLabel === "sexual") {
      postLabel = "suggestive";
    } else if (postLabel === "porn") {
      postLabel = "nsfw";
    }

    const label = labels.value[postLabel];
    if (!label) continue;

    if (label === "hide") {
      return "hide";
    }

    if (label === "warn") {
      highestLabel = "warn";
    }
  }

  return highestLabel;
}

const blur = ref(true);
</script>

<template>
  <div class="feed relative">
    <feed-item
      v-for="({ post }, index) in posts
        .filter(
          ({ post }) => post.embed?.$type === 'app.bsky.embed.images#view'
        )
        .filter(({ post }) => ['show', 'warn'].includes(checkLabels(post)))"
      :key="post.cid"
      :post="post"
      :warn="checkLabels(post) === 'warn' && blur"
      :lazy="index > 20"
      @open="blur = false"
      @close="blur = true"
      @click="goToPost(post)"
    />
    <div class="observer" ref="observerElement"></div>
  </div>
</template>

<style scoped>
.observer {
  position: absolute;
  bottom: 50rem;
  width: 100%;
}
.feed {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 100vw;
  gap: 2px;
}
</style>

import { BskyLabelPreference, BskyPreferences } from "@atproto/api";
import { agent } from "~/lib/session";

type PreferenceKey =
  | "nsfw"
  | "hate"
  | "nudity"
  | "suggestive"
  | "gore"
  | "spam"
  | "impersonation";

export default async function usePreferences(): Promise<Ref<BskyPreferences>> {
  const preferences = useState<BskyPreferences>("preferences");

  if (!preferences.value) {
    preferences.value = await agent.getPreferences();
  }

  return preferences;
}

export async function useContentLabels(): Promise<
  Ref<Record<PreferenceKey | string, BskyLabelPreference>>
> {
  const preferences = await usePreferences();

  return computed(() => preferences.value.contentLabels);
}

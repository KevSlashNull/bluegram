import { AtpSessionData, BskyAgent } from "@atproto/api";

export const agent = new BskyAgent({
  service: "https://bsky.social",
});

const LOCAL_STORAGE_KEY = "bluegram-session";

export async function checkLogin(): Promise<boolean> {
  if (hasSession() && !agent.session) {
    await loadSession();
  }

  if (!agent.session) return false;

  return agent
    .getProfile({
      actor: agent.session.did,
    })
    .then((r) => r.success)
    .catch(() => false);
}

export async function login(
  identifier: string,
  password: string
): Promise<boolean> {
  const { success } = await agent
    .login({ identifier, password })
    .catch(() => ({ success: false }));

  if (!success) {
    return false;
  }

  storeSession();

  return true;
}

function storeSession(): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(agent.session));
}

function hasSession(): boolean {
  return Boolean(localStorage.getItem(LOCAL_STORAGE_KEY));
}

async function loadSession(): Promise<void> {
  const session = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "null");

  if (session) {
    await agent.resumeSession(session as AtpSessionData).catch(() => {});
  }
}

export function logout() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

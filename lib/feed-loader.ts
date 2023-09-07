import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { agent } from "./session";

export class FeedLoader {
  private initialized: boolean = false;
  private postSegments: FeedViewPost[][] = [];
  private cursor: string | undefined;

  constructor(private feedUri: string) {}

  async initialize() {
    if (this.initialized) return;
    this.initialized = true;

    await this.loadMore();
  }

  async loadMore() {
    const { data } = await agent.app.bsky.feed.getFeed({
      feed: this.feedUri,
      cursor: this.cursor,
    });
    this.cursor = data.cursor;
    this.postSegments = [...this.postSegments, data.feed];
    console.log(this.postSegments.length);
  }

  get posts() {
    return this.postSegments.flat();
  }
}

const allLists: Record<string, FeedLoader> = {};

export async function getFeedLoader(feedUri: string): Promise<FeedLoader> {
  let list = allLists[feedUri];
  if (!list) {
    list = allLists[feedUri] = new FeedLoader(feedUri);
    await list.initialize();
  }
  return list;
}

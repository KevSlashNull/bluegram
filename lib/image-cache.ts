type Dimension = { height: number; width: number };
const images: Record<string, Dimension[]> = {};

export async function addImage(postId: string, sources: string[]) {
  images[postId] = await Promise.all(sources.map(getDimension));
}

async function getDimension(url: string): Promise<Dimension> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve({ height: image.height, width: image.width });
    };
    image.src = url;
    setTimeout(() => {
      reject("image took too long to load");
    }, 5000);
  });
}

export function getImageSizes(postId: string): Dimension[] {
  return images[postId] || [];
}

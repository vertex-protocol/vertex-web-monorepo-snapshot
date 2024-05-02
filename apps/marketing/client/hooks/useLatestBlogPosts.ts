import { useQuery } from '@tanstack/react-query';
import GhostContentAPI from '@tryghost/content-api';

export interface BlogPost {
  title: string;
  image: string;
  description: string;
  url: string;
  date: string;
}

const ghostSdk = new GhostContentAPI({
  key: '6a394aa93fd71536df363fcc72',
  url: 'https://blog-vertex-protocol.ghost.io',
  version: 'v5.0',
});

export function useLatestBlogPosts(limit: number = 5) {
  return useQuery({
    queryKey: ['latestBlogPosts', limit],
    queryFn: async () => {
      const baseResp = await ghostSdk.posts.browse({ limit });
      return baseResp.map((post): BlogPost => {
        return {
          title: post.title ?? '',
          description:
            post.excerpt ?? post.meta_description ?? post.og_description ?? '',
          image: post.feature_image ?? '',
          url: post.url ?? '',
          date: post.updated_at ?? '0',
        };
      });
    },
  });
}

// Mock data for testing without API
export const mockVideos = [
  {
    id: '1',
    title: 'Understanding React 19 New Features',
    thumbnailUrl: 'https://via.placeholder.com/320x180',
    channelName: 'React Masters',
    viewCount: 42000,
    duration: '10:28',
    publishedAt: '2025-04-15T12:00:00Z',
    source: 'YouTube' as const
  },
  {
    id: '2',
    title: 'Live Coding Session: Building a Media App',
    thumbnailUrl: 'https://via.placeholder.com/320x180',
    channelName: 'CodeStreamer',
    viewCount: 15600,
    duration: '1:45:30',
    publishedAt: '2025-04-20T15:00:00Z',
    source: 'Twitch' as const
  },
  {
    id: '3',
    title: 'Advanced TypeScript Patterns for Media Applications',
    thumbnailUrl: 'https://via.placeholder.com/320x180',
    channelName: 'TypeScript Guru',
    viewCount: 28500,
    duration: '23:45',
    publishedAt: '2025-04-18T09:30:00Z',
    source: 'YouTube' as const
  }
];
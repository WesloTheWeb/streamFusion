import { DemoVideo } from "../../interfaces";

export const getDemoVideos = (): DemoVideo[] => [
    {
        id: 'big-buck-bunny',
        title: 'Big Buck Bunny (HLS Adaptive Streaming)',
        thumbnailUrl: 'https://peach.blender.org/wp-content/uploads/bbb-splash.png',
        channelName: 'Demo Media',
        viewCount: 1500000,
        duration: '9:56',
        publishedAt: '2022-04-15T14:30:00Z',
        source: 'Demo',
        streamUrl: 'https://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8',
        streamType: 'hls'
    },
    {
        id: 'tears-of-steel',
        title: 'Tears of Steel (DASH Streaming)',
        thumbnailUrl: 'https://mango.blender.org/wp-content/uploads/2013/05/01_thom_celia_bridge.jpg',
        channelName: 'Demo Media',
        viewCount: 982000,
        duration: '12:14',
        publishedAt: '2022-05-20T10:15:00Z',
        source: 'Demo',
        streamUrl: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.mpd',
        streamType: 'dash'
    },
    {
        id: 'elephants-dream',
        title: 'Elephants Dream (HLS Stream)',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Elephants_Dream.jpg',
        channelName: 'Demo Media',
        viewCount: 782000,
        duration: '10:53',
        publishedAt: '2022-03-10T08:20:00Z',
        source: 'Demo',
        streamUrl: 'https://d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8',
        streamType: 'hls'
    },
    {
        id: 'angel-one-dash',
        title: 'Angel One (DASH Streaming)',
        thumbnailUrl: 'https://storage.googleapis.com/shaka-demo-assets/thumbnails/angel-one.jpg',
        channelName: 'Shaka Demo',
        viewCount: 1200000,
        duration: '3:25',
        publishedAt: '2023-01-10T09:00:00Z',
        source: 'Demo',
        streamUrl: 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
        streamType: 'dash'
      },
];
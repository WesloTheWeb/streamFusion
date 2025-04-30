import { VideoSource } from "../apis/types";

export interface VideoItem {
    id: string;
    title: string;
    thumbnailUrl: string;
    channelName: string;
    viewCount?: number;
    duration?: string;
    publishedAt?: string;
    source: VideoSource;
};

export interface DemoVideo {
    id: string;
    title: string;
    thumbnailUrl: string;
    channelName: string;
    viewCount: number;
    duration: string;
    publishedAt: string;
    source: 'Demo';
    streamUrl: string;
    streamType: 'hls' | 'dash' | 'mp4';
};
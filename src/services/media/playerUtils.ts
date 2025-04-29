export const detectStreamType = (src: string) => {
    const isHlsSource = src.includes('.m3u8');
    const isDashSource = src.includes('.mpd');

    if (isHlsSource) return 'hls';
    if (isDashSource) return 'dash';
    return 'mp4';
};

export const getSourceType = (streamType: string) => {
    switch (streamType) {
        case 'hls':
            return 'application/x-mpegURL';
        case 'dash':
            return 'application/dash+xml';
        default:
            return 'video/mp4';
    };
};
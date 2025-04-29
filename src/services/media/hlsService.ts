import Hls from 'hls.js';

export const initializeHls = (
    videoElement: HTMLVideoElement,
    source: string,
    onError: (message: string) => void
) => {
    const hls = new Hls({
        maxBufferLength: 30,
        maxMaxBufferLength: 60
    });

    hls.attachMedia(videoElement);
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(source);
    });

    hls.on(Hls.Events.ERROR, (_event: any, data: any) => {
        console.error('HLS Error:', data);
        if (data.fatal) {
            switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                    hls.startLoad();
                    break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                    hls.recoverMediaError();
                    break;
                default:
                    hls.destroy();
                    onError('HLS playback error');
                    break;
            };
        };
    });

    return hls;
};

export const isHlsSupported = () => Hls.isSupported();
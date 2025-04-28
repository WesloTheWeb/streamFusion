const shaka = require('shaka-player');

export const initializeShaka = (
    videoElement: HTMLVideoElement,
    source: string,
    onError: (message: string) => void
) => {
    shaka.polyfill.installAll();

    if (shaka.Player.isBrowserSupported()) {
        const player = new shaka.Player(videoElement);

        player.configure({
            streaming: {
                bufferingGoal: 60,
                rebufferingGoal: 2
            }
        });

        player.addEventListener('error', (event: any) => {
            console.error('Shaka Error:', event);
            onError('Video streaming error');
        });

        player.load(source).catch((error: any) => {
            console.error('Shaka player error:', error);
            onError('Failed to load video');
        });

        return player;
    } else {
        onError('Your browser does not support DASH playback');
        return null;
    };
};

export const isShakaSupported = () => {
    shaka.polyfill.installAll();
    return shaka.Player.isBrowserSupported();
};
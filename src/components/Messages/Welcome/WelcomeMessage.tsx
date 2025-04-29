import { PlayCircle, Tv } from 'lucide-react';
import classes from './WelcomeMessage.module.scss';

const {
  welcomeContainer,
  welcomeContent,
  welcomeTitle,
  welcomeDescription,
  featureGrid,
  featureCard,
  featureIcon,
  featureTitle,
  featureText,
  youtubeFeature,
  twitchFeature
} = classes;

// No longer need the props since we removed platform selection
const WelcomeMessage = () => {
  return (
    <div className={welcomeContainer}>
      <section className={welcomeContent}>
        <h1 className={welcomeTitle}>Welcome to StreamFusion</h1>
        <p className={welcomeDescription}>
          Your all-in-one platform for discovering and watching content across popular streaming services.
          Search for videos, enjoy high-quality playback, and seamlessly switch between platforms.
        </p>
        <section className={featureGrid}>
          <section className={`${featureCard} ${youtubeFeature}`}>
            <div className={featureIcon}>
              <PlayCircle size={36} />
            </div>
            <h3 className={featureTitle}>YouTube Integration</h3>
            <p className={featureText}>
              Search and watch videos from YouTube with advanced playback controls and adaptive streaming quality.
            </p>
          </section>
          <section className={`${featureCard} ${twitchFeature}`}>
            <div className={featureIcon}>
              <Tv size={36} />
            </div>
            <h3 className={featureTitle}>Twitch Integration (Coming Soon)</h3>
            <p className={featureText}>
              Discover Twitch content with our seamless integration. Watch streams and videos with our custom player.
            </p>
          </section>
        </section>
      </section>
    </div>
  );
};

export default WelcomeMessage;
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import FloatingChatbot from '@site/src/components/FloatingChatbot';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroTextContainer}>
            <Heading as="h1" className={clsx('hero__title', styles.hero__title)}>
              Build the Future of Robotics
            </Heading>
            <p className={clsx('hero__subtitle', styles.hero__subtitle)}>
              Master AI-powered robotics from simulation to deployment
            </p>
          </div>
          <div className={styles.buttons}>
            <Link
              className={styles.heroButton}
              to="/docs/module-1-robotic-nervous-system/ros2-fundamentals">
              Start Learning
              <span className={styles.buttonArrow}>→</span>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.gridFloaters}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className={styles.gridFloat} style={{animationDelay: `${-i * 5}s`}} />
        ))}
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Build the Future of Robotics"
      description="Master AI-powered robotics from simulation to deployment">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      <FloatingChatbot />
    </Layout>
  );
}
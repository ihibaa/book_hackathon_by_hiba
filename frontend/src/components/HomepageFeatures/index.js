import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    id: 1,
    title: 'ROS 2 Core & Distributed Systems',
    subtitle: 'Robotic Nervous System',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: 'Master ROS 2 fundamentals for scalable robotic architectures. Learn node communication and service orchestration.',
    tags: ['ROS 2', 'DDS', 'Nodes'],
    duration: '6 Weeks',
    level: 'Beginner'
  },
  {
    id: 2,
    title: 'Simulation & Digital Twins',
    subtitle: 'Virtual Testing Environment',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: 'Create simulations with Gazebo and RViz. Develop digital twins for safe testing and validation.',
    tags: ['Gazebo', 'RViz', 'URDF'],
    duration: '8 Weeks',
    level: 'Intermediate'
  },
  {
    id: 3,
    title: 'AI Perception & Navigation',
    subtitle: 'Intelligent Robot Brain',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: 'Implement computer vision and SLAM using NVIDIA Isaac ROS. Build AI-powered perception systems.',
    tags: ['Computer Vision', 'SLAM', 'Navigation'],
    duration: '10 Weeks',
    level: 'Advanced'
  },
];

function Feature({id, Svg, title, subtitle, description, tags, duration, level}) {
  return (
    <div className={clsx('col col--4', styles.featureCard)}>
      <div className={styles.cardHeader}>
        <span className={styles.featureNumber}>0{id}</span>
        <div className={styles.levelBadge}>{level}</div>
      </div>
      
      <div className={styles.iconContainer}>
        <Svg className={styles.featureSvg} role="img" />
      </div>
      
      <div className={styles.contentContainer}>
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureSubtitle}>{subtitle}</p>
        <p className={styles.featureDescription}>{description}</p>
        
        <div className={styles.cardFooter}>
          <div className={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <div className={styles.durationTag}>{duration}</div>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>Robotics Curriculum</Heading>
          <p className={styles.sectionSubtitle}>
            From foundational concepts to advanced AI integration
          </p>
        </div>
        
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.id} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
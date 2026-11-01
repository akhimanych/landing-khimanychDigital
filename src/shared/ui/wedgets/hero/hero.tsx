import { AnimatedK } from '@/shared/ui/wedgets/animatedK/animatedK';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        {/* Здесь будет текст первого экрана */}
      </div>

      <div className={styles.visual}>
        <AnimatedK />
      </div>
    </section>
  );
}
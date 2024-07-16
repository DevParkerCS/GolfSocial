import styles from "./LandingPage.module.scss";
import LandingRecents from "./components/LandingRecents/LandingRecents";
import Nav from "../../components/Nav/Nav";

function LandingPage() {
  return (
    <div className={styles.landingWrapper}>
      <Nav />
      <HeroSection />
      <LandingRecents />
    </div>
  );
}

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroTxt}>
        <h1 className={styles.heroTitle}>Welcome To The GolfHub</h1>
        <h2 className={styles.heroSubtitle}>Where Golf Happens!</h2>
      </div>
    </section>
  );
};

export default LandingPage;

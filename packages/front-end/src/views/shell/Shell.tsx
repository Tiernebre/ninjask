import styles from "./Shell.module.scss";
import { SmartAlerts } from "@tiernebre/kecleon";
import { Header, Footer, SessionRefresher } from "../../components";
import { Routes } from "..";

/**
 * Shell should be the direct child of the App component and all of its
 * necessary wrapping provider elements. This is where the true business
 * logic of Ninjask begins.
 */
export const Shell = (): JSX.Element => {
  return (
    <section className={styles.container}>
      <SessionRefresher>
        <SmartAlerts />
        <Header />
        <main className={styles.content}>
          <Routes />
        </main>
        <Footer />
      </SessionRefresher>
    </section>
  );
};

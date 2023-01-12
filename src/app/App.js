import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import { Layout } from "./components/Layout";

const App = () => {
  return (
    <section className={styles.app}>
      <main className={styles.main}>
        <Layout>
          <Outlet />
        </Layout>
      </main>
    </section>
  );
};

export { App };

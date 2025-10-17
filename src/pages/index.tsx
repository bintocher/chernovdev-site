import clsx from 'clsx';
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>

    </header>
  );
}

export default function Home(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="ChernovDev: ваш гид по Qlik Sense. Полезные статьи, документация, решения для BI, блог разработчика. Узнайте все о Qlik от экспертов сообщества.">

      <HomepageHeader />
      <div style={{ textAlign: 'center' }}>Авторы проекта
      <table style={{ width: '600px', height: '250px', border: '0px', margin: '0 auto' }}>
        <tr>
          <td style={{ textAlign: 'center' }}>
            <a href="https://github.com/bintocher">
              <img src="https://github.com/bintocher.png" width="100;" alt="bintocher" />
              <br />
              <sub><b>Chernov Stanislav</b></sub>
            </a>
          </td>
          <td style={{ textAlign: 'center' }}>
            <a href="https://github.com/MrMaffer">
              <img src="https://github.com/MrMaffer.png" width="100;" alt="MrMaffer" />
              <br />
              <sub><b>Maksim Mikheikin</b></sub>
            </a>
          </td>
          <td style={{ textAlign: 'center' }}>
            <a href="https://github.com/Andrej9173">
              <img src="https://github.com/Andrej9173.png" width="100;" alt="Andrej9173" />
              <br />
              <sub><b>Andrey Yundin</b></sub>
            </a>
          </td>
          <td style={{ textAlign: 'center' }}>
            <a href="https://github.com/GalinaErshova">
              <img src="https://github.com/GalinaErshova.png" width="100;" alt="GalinaErshova" />
              <br />
              <sub><b>Galina Ershova</b></sub>
            </a>
          </td>

          <td style={{ textAlign: 'center' }}>
            <a href="https://github.com/MaksimMolokov">
              <img src="https://github.com/MaksimMolokov.png" width="100;" alt="MaksimMolokov" />
              <br />
              <sub><b>Maksim Molokov</b></sub>
            </a>
          </td>
        </tr>
        </table></div>
      <main>
        <HomepageFeatures />

      </main>
    </Layout>
  );
}

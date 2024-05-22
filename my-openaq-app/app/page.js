// pages/index.js
import Head from 'next/head';
import AirQualityGraph from './PMgraph';

export default function Home() {
  return (
    <div>
      <Head>
        <title>helloooo</title>
      </Head>
      <main>
        <h1>Air Quality in UB</h1>
        <AirQualityGraph />
      </main>
    </div>
  );
}

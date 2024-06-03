import Head from 'next/head';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Canada Test Prep</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/canadatestprep/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="stylesheet" href="/canadatestprep/styles.css" />
        <link rel="icon" href="/canadatestprep/favicon.png" />
      </Head>
      <h1>Welcome to Canada Test Prep PWA</h1>
      <Link href="/quiz">
        <a>Start Quiz</a>
      </Link>
    </div>
  );
}

export default Home;
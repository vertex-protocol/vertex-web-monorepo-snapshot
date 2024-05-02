import { BlitzPointsPage } from 'client/pages/BlitzPoints/BlitzPointsPage';
import { clientEnv } from 'common/environment/clientEnv';
import type { NextPage } from 'next';

export async function getStaticProps() {
  const isBlitzBrand = clientEnv.base.brandName === 'blitz';
  if (!isBlitzBrand) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}

const PointsNextPage: NextPage = () => {
  return <BlitzPointsPage />;
};

export default PointsNextPage;

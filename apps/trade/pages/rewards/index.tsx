import { VertexRewardsPage } from 'client/pages/VertexRewards/VertexRewardsPage';
import { clientEnv } from 'common/environment/clientEnv';
import type { NextPage } from 'next';

export async function getStaticProps() {
  const isVertexBrand = clientEnv.base.brandName === 'vertex';
  if (!isVertexBrand) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}

const RewardsNextPage: NextPage = () => {
  return <VertexRewardsPage />;
};

export default RewardsNextPage;

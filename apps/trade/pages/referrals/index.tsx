import { useRedirectOnInvalidChain } from 'client/modules/app/hooks/useRedirectOnInvalidChain';
import { ARB_CHAIN_IDS } from 'client/modules/chainSpecificContent/consts/chainIds';
import { VertexReferralsPage } from 'client/pages/VertexReferrals/VertexReferralsPage';
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

const Referrals: NextPage = () => {
  useRedirectOnInvalidChain(ARB_CHAIN_IDS);

  return <VertexReferralsPage />;
};

export default Referrals;

import { useRedirectOnInvalidChain } from 'client/modules/app/hooks/useRedirectOnInvalidChain';
import { ARB_CHAIN_IDS } from 'client/modules/chainSpecificContent/consts/chainIds';
import { VertexTokenPage } from 'client/pages/VertexToken/VertexTokenPage';
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

const VrtxNextPage: NextPage = () => {
  useRedirectOnInvalidChain(ARB_CHAIN_IDS);

  return <VertexTokenPage />;
};

export default VrtxNextPage;

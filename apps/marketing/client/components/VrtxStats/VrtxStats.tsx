'use client';

// import { ExternalLink } from "client/components/Link/Link";
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { useStakingData } from 'client/components/VrtxStats/useStakingData';
import DashboardIcon from 'client/icons/DashboardIcon';
import StakingIcon from 'client/icons/StakingIcon';
import { motion, Variants } from 'framer-motion';

// import { LINKS } from "config/links";

interface Props {
  containerVariants: Variants;
  itemVariants: Variants;
}

export function VrtxStats({ containerVariants, itemVariants }: Props) {
  const { data: stakingData } = useStakingData();

  const formattedApr = formatNumber(stakingData?.apr, {
    formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
  });
  const formattedTotalRewardsDistributed = formatNumber(
    stakingData?.totalRewardsDistributed,
    {
      formatSpecifier: PresetNumberFormatSpecifier.NUMBER_SI_3SF,
    },
  );
  const formattedLastDistributionAmount = formatNumber(
    stakingData?.lastDistributionAmount,
    {
      formatSpecifier: PresetNumberFormatSpecifier.NUMBER_SI_3SF,
    },
  );

  return (
    <motion.div variants={containerVariants} className="text-body-gray mb-16">
      <motion.h3 variants={itemVariants} className="text-body-15 mb-1">
        Staking APR
      </motion.h3>
      <motion.div
        variants={containerVariants}
        className="flex flex-col justify-between gap-y-8 xl:grid xl:grid-cols-2 xl:gap-x-6"
      >
        <motion.div
          variants={containerVariants}
          className="flex items-center gap-x-4"
        >
          <motion.p
            variants={itemVariants}
            className="text-header-2 md:text-header-1 text-header-linear font-radioGrotesk"
          >
            {formattedApr}
          </motion.p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          className="flex flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-center sm:gap-4 xl:gap-8"
        >
          <motion.div
            variants={containerVariants}
            className="flex flex-col gap-2 md:gap-1"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-x-1"
            >
              <p className="text-body-13 w-24 text-white">
                {formattedTotalRewardsDistributed} USDC
              </p>
              <p className="text-body-13">
                Distributed to stakers since launch
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-x-1"
            >
              <p className="text-body-13 w-24 text-white">
                {formattedLastDistributionAmount} USDC
              </p>
              <p className="text-body-13">7d Distribution</p>
            </motion.div>
          </motion.div>
          <motion.div
            variants={containerVariants}
            className="flex flex-col gap-2 md:gap-1"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2"
            >
              <StakingIcon className="h-3.5 text-white" />
              <p className="text-body-13 sm:pl-0">Rewards compounded weekly</p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2"
            >
              <DashboardIcon className="text-body-dark-gray h-3.5" />
              <p className="text-body-13 text-body-dark-gray sm:pl-0">
                Dashboard coming soon
              </p>
              {/* @TODO: Add external link */}
              {/* <ExternalLink
                className="text-white text-body-13"
                href={LINKS.viewStakingDashboard}
              >
                View Staking dashboard
              </ExternalLink> */}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

import { NFTCard, StatCard } from '@/components/Cards/Cards';
import GoBack from '@/components/GoBack';
import NotFound from '@/components/NotFound';
import {
  GetLinkStatsByAliasReturnTypes,
  GET_LINK_STATS_BY_ALIAS
} from '@/services/link';
import { signedRequest } from '@/utils/api/signedRequest';
import { formatDate } from '@/utils/formatDate';
import Icons from '@/utils/icons';
import { LoadingOverlay, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import apiRoutes from 'routes/api';
import useSWR from 'swr';
import ClicksByCountry from './ClicksByCountry';
import DeviceTypes from './DeviceTypes';
import ReferringWebsites from './ReferringWebsites';

const AliasStats = () => {
  const router = useRouter();
  const alias = router?.query?.alias;

  const { data, error, isLoading } = useSWR<{
    data: { data: { results: GetLinkStatsByAliasReturnTypes } };
  }>(alias ? `/alias/${alias}` : null, () =>
    signedRequest({
      type: 'post',
      url: apiRoutes.profile.links,
      data: {
        type: GET_LINK_STATS_BY_ALIAS,
        alias: alias ?? '',
      },
    })
  );

  const results = data?.data?.data?.results;

  if (!data && isLoading) {
    return <LoadingOverlay visible={true} />;
  }

  if (!results?.link) {
    return (
      <>
        <GoBack />
        <NotFound>
          <Text align="center" weight={700}>
            We couldn't find any information on {alias}
          </Text>
          <Text align="center">
            Make sure you are trying to access link information that exists.
          </Text>
        </NotFound>
      </>
    );
  }

  return (
    <div>
      <GoBack />

      <div className="flex flex-col md:flex-row flex-wrap gap-8 mb-16">
        <div>
          <NFTCard />
        </div>
        <div className="mb-4 flex flex-col gap-4">
          <Title>{alias} link information</Title>
          <Text>
            <strong>Target: </strong>
            <a href={results?.link?.target} target="_blank">
              {results?.link?.target}
            </a>
          </Text>
          <Text className="flex items-center gap-4">
            <strong>Is tracking clicks: </strong>
            {results?.link?.trackMetrics ? (
              <Icons.Check className="text-green-500" />
            ) : (
              <Icons.Times className="text-red-500" />
            )}
          </Text>
          <Text className="flex items-center gap-4">
            <strong>Does accept ads: </strong>
            {results?.link?.doesAcceptAds ? (
              <Icons.Check className="text-green-500" />
            ) : (
              <Icons.Times className="text-red-500" />
            )}
          </Text>
          <Text>
            <strong>Date Created: </strong>
            {formatDate(results?.link?.date_created as Date)}
          </Text>
          <Text>
            <strong>NFT ID: </strong>
            #1
          </Text>
        </div>
      </div>

      <div className="mb-24">
        <Title className="mb-4">Overview</Title>
        <Text className="mb-4">
          <strong>Title: </strong>
          {results?.link.title || '...'}
        </Text>
        <Text className="mb-4">
          <strong>Description: </strong>
          {results?.link.description || '...'}
        </Text>
        <div className="flex flex-wrap flex-col md:flex-row gap-4">
          <StatCard label="Total Clicks" value={results?.clicks} />
          <StatCard label="Unique Clicks" value={results?.clicks} />
        </div>
      </div>

      <div className="mb-24 flex flex-wrap gap-8">
        <div className="flex-1">
          <DeviceTypes data={results} />
        </div>
        <div className="flex-1">
          <ReferringWebsites data={results} />
        </div>
      </div>

      <div className="mb-24 flex flex-wrap gap-8">
        <div className="flex-1">
          <ClicksByCountry data={results} />
        </div>
      </div>
    </div>
  );
};

export default AliasStats;

import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { enter } from '../../api/live';
import { useAppSelector } from '../../redux-store/hooks';

export function useLiveInfo() {
  const { auctionId } = useParams<string>();
  const { accessToken, id } = useAppSelector(state => state.user);

  const { isLoading, error, data } = useQuery(
    ['auctionEnterResponse', auctionId, accessToken],
    () => enter(Number(auctionId), accessToken),
    {
      enabled: !!accessToken && !!auctionId,
    }
  );

  return {
    userId: id,
    isLoading,
    error,
    roomInfo: data,
  };
}

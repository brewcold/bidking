/** @jsxImportSource @emotion/react */
import colors from '../../../design/colors';
import { useLiveInfo } from '../../../hooks/useLiveInfo';
import { Spacing } from '../../common/Spacing';
import { Txt } from '../../common/Txt';

export function AuctionHeader() {
  const { roomInfo } = useLiveInfo();
  const theme = roomInfo?.seller ? 'dark' : 'light';

  return (
    <div
      css={{
        padding: '1rem',
        borderRadius: '1.85rem',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...BACKGROUND_VARIANT[theme],
      }}
    >
      <div>
        <div css={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div css={{ display: 'flex' }}>
            <div
              css={{
                padding: '0.2rem 1rem 0.2rem 1rem',
                borderRadius: '1.5rem',
                backgroundColor: roomInfo?.auctionRoomType === 'COMMON' ? colors.progress : colors.warn,
                color: colors.white,
              }}
            >
              <Txt variant="bold">{roomInfo && AUCTION_TYPE[roomInfo.auctionRoomType]}</Txt>
            </div>
            <Spacing rem="0.25" dir="h" />
            <div
              css={{
                padding: '0.2rem 1rem 0.2rem 1rem',
                borderRadius: '1.5rem',
                ...THEME_VARIANT[theme],
              }}
            >
              <Txt variant="bold">판매자 </Txt>
              <Txt variant="bold">{roomInfo?.sellerNickname}</Txt>
            </div>
          </div>
          <Spacing rem="0.5" />
          <div css={{ padding: '0.25rem 0.5rem 0 0.5rem' }}>
            <Txt as="h2">{roomInfo ? roomInfo.title : '정보를 가져오고 있습니다...'}</Txt>
          </div>
        </div>
      </div>
    </div>
  );
}

const BACKGROUND_VARIANT = {
  light: { backgroundColor: colors.backgroundLight2 },
  dark: {
    backgroundColor: colors.backgroundDark2,
    color: colors.white,
  },
};

const THEME_VARIANT = {
  light: { color: colors.black, backgroundColor: 'transparent', border: `1px solid ${colors.black}` },
  dark: { color: colors.white, backgroundColor: 'transparent', border: `1px solid ${colors.white}` },
};

const AUCTION_TYPE = {
  COMMON: '일반 경매',
  REVERSE: '네덜란드',
};

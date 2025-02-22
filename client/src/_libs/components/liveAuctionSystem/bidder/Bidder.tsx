/** @jsxImportSource @emotion/react */
import { HTMLAttributes } from 'react';
import colors from '../../../design/colors';
import { Spacing } from '../../common/Spacing';
import { Text } from '../../common/Text';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme: 'dark' | 'light';
  bidder: string;
}

export function Bidder({ theme = 'light', bidder }: Props) {
  return (
    <div
      css={{
        // border: '1px solid black',
        textAlign: 'center',
        ...THEME_VARIANT[theme],
      }}
    >
      <div>
        <Text content="최고 입찰" />
        <Spacing rem="0.5" />
        <Text type="h2" content={bidder} />
      </div>
    </div>
  );
}
const THEME_VARIANT = {
  light: {
    color: colors.black,
  },
  dark: {
    color: colors.white,
    backgroundColor: colors.backgroundDark2,
  },
};

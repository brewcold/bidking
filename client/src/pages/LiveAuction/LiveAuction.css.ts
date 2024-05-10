import { CSSInterpolation } from '@emotion/serialize';
import colors from '../../_libs/design/colors';

export const WRAPPER: CSSInterpolation = {
  display: 'flex',
  width: '100%',
  height: 'calc(100vh)',
  backgroundColor: colors.backgroundDark,
  padding: '1rem 0.25rem 0.5rem 0.5rem',
};

export const STREAM_WRAPPER: CSSInterpolation = { width: '100%' };
export const STREAM: CSSInterpolation = { width: '100%', height: '75%', maxHeight: '75vh', overflow: 'hidden' };

export const NOTICE_WRAPPER: CSSInterpolation = { position: 'absolute', bottom: '1rem', width: 'calc(100% - 21rem)' };

export const AUCTION_SIDEBAR: CSSInterpolation = {
  minWidth: '20.5rem',
  padding: '1rem 0.5rem 0.5rem 0.25rem',
};

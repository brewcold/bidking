import { CSSInterpolation } from '@emotion/serialize';
import colors from '../../../../design/colors';
import { LiveItem } from '../../../../types/live-item';

export const BLANK: CSSInterpolation = {
  background: 'transparent',
  borderRadius: '1rem',
  border: '1px solid transparent',
  width: '100%',
  height: '2.25rem',
  display: 'flex',
  justifyContent: 'center',
};

export const BLANK_INFO: CSSInterpolation = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  height: '3rem',
};

export const ITEM: (item: LiveItem) => CSSInterpolation = item => {
  return {
    backgroundImage: `url("${item.imageUrl}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '1rem',
    border: '1px solid ' + colors.confirm,
    filter: `drop-shadow(0 0 0.015rem ${colors.confirm})`,
    width: '3rem',
    height: '3rem',
  };
};

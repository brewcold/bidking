import { CSSInterpolation } from '@emotion/serialize';
import { THEME_VARIANT } from '../theme-variant.css';

export const FORM_BASE = (theme: keyof typeof THEME_VARIANT): CSSInterpolation => {
  return {
    display: 'flex',
    flexDirection: 'column',
    ...THEME_VARIANT[theme],
  };
};

export const IMMEDIATE_BID_WRAPPER = { display: 'flex', alignItems: 'center' };
export const BIDDING_INPUT_WRAPPER = { display: 'flex' };

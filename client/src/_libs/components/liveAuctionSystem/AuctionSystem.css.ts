import { CSSInterpolation } from '@emotion/serialize';
import { THEME_VARIANT } from './theme-variant.css';

export const BASE = (seller?: boolean): CSSInterpolation => {
  const theme = seller ? 'dark' : 'light';
  return { width: '100%', borderRadius: '1.85rem', padding: '1rem', ...THEME_VARIANT[theme] };
};

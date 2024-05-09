import { CSSInterpolation } from '@emotion/serialize';
import { THEME_VARIANT } from '../theme-variant.css';

export const BASE = (seller?: boolean): CSSInterpolation => {
  const theme = seller ? 'dark' : 'light';
  return {
    width: '100%',
    height: seller ? 'calc(50vh - 2rem)' : 'calc(50vh - 7rem)',
    borderRadius: '1.85rem',
    padding: '1rem',
    position: 'relative',
    ...THEME_VARIANT[theme],
    display: 'flex',
    flexDirection: 'column',
  };
};

export const ROOM = (seller?: boolean): CSSInterpolation => {
  return { overflowY: 'auto', height: seller ? 'calc(50vh - 2rem)' : 'calc(50vh - 12rem)' };
};

export const INPUT_AREA: CSSInterpolation = {
  width: 'calc(100% - 2rem)',
  left: '1rem',
  bottom: '1rem',
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
};

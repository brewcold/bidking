import { CSSInterpolation } from '@emotion/serialize';
import colors from '../../../../design/colors';
import { LiveItem } from '../../../../types/live-item';

const ITEM_STATUS_CSS = {
  dummy: { backgroundColor: colors.grey, border: '1px solid transparent' },
  before: { color: 'grayscale(1)', border: '1px solid ' + colors.grey },
  in: {
    color: 'transparent',
    border: '1px solid ' + colors.confirm,
    filter: `drop-shadow(0 0 0.75rem ${colors.confirm})`,
  },
  fail: { filter: 'grayscale(1)', border: '1px solid ' + colors.grey },
  complete: { filter: 'grayscale(1)', border: '1px solid ' + colors.ok },
};

export const ITEM_BASE: (item: LiveItem) => CSSInterpolation = item => {
  return {
    backgroundColor: '',
    backgroundImage: `url('${item.imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '0.75rem',
    width: '2.5rem',
    height: '2.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.9rem',
    ...ITEM_STATUS_CSS[item.status],
  };
};

export function isNotInLive(length: number, order: number) {
  if (order >= length - 4) return 'END';
  else return 'BEFORE';
}

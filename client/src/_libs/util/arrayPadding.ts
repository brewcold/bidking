export function arrayPadding<T>(arr: T[], pad: T, paddingLength: number): T[] {
  const list = [...arr];
  for (let i = 0; i < paddingLength; i++) {
    list.push(pad);
    list.unshift(pad);
  }
  list.push(pad);
  return list;
}

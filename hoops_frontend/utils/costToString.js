export default function costToString(cost) {
  return `$${(cost / 100).toFixed(2)}`;
}

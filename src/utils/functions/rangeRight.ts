import range from './range'

function rangeRight(start: number, end: number, step: number): number[] | undefined {
  return range(start, end, step, true);
}

export default rangeRight

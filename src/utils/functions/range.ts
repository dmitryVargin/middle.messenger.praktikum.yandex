function range(start = 0, end: number, step = 1, isRight: boolean): number[] | undefined {
  const res: number[] = [];

  // eslint-disable-next-line prefer-rest-params
  const notEmptyArgs = [...arguments].filter((value) => value !== undefined);
  const rangeArgsQuantity = isRight ? notEmptyArgs.length - 1 : notEmptyArgs.length;
  if (rangeArgsQuantity === 1) {
    if (start === 0) {
      return res;
    }
    if (start > 0) {
      for (let i = 0; i < start; i++) {
        res.push(i);
      }
    } else {
      for (let i = 0; i > start; i--) {
        res.push(i);
      }
    }
  } else {
    const innerStep = step || 1;
    if (step === 0) {
      for (let i = start; i <= Math.abs(end - start); i++) {
        res.push(start);
      }
    } else if (start < end) {
      for (let i = start; i < end; i += innerStep) {
        res.push(i);
      }
    } else {
      for (let i = start; i > end; i -= Math.abs(innerStep)) {
        res.push(i);
      }
    }
  }
  if (isRight) {
    res.reverse();
  }
  return res;
}

export default range

function range(start = 0, end, step = 1, isRight) {
  let res = [];

  const notEmptyArgs = Array.from(arguments).filter(
    (value) => value !== undefined,
  );
  let rangeArgsQuantity = isRight
    ? notEmptyArgs.length - 1
    : notEmptyArgs.length;
  if (rangeArgsQuantity === 1) {
    if (typeof start !== 'number') return;
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
    if (
      typeof start !== 'number' ||
      typeof end !== 'number' ||
      typeof step !== 'number'
    )
      return;
    let innerStep = step ? step : 1;
    if (step === 0) {
      for (let i = start; i <= Math.abs(end - start); i++) {
        res.push(start);
      }
    } else {
      if (start < end) {
        for (let i = start; i < end; i += innerStep) {
          res.push(i);
        }
      } else {
        for (let i = start; i > end; i -= Math.abs(innerStep)) {
          res.push(i);
        }
      }
    }
  }
  if (isRight) {
    res.reverse();
  }
  return res;
}

function rangeRight(start, end, step) {
  return range(start, end, step, true);
}

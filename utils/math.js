exports.calculateStandardDeviation = (numbers) => {
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const variance =
      numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) /
      numbers.length;
    return Math.sqrt(variance);
  };
  
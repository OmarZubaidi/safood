function sampleFromArray (array, quantity) {
  const set = new Set();

  while (set.size < quantity && set.size < array.length) {
    set.add(Math.floor(Math.random() * array.length));
  }

  const randomArray = [];
  set.forEach(number => randomArray.push(array[number]));
  return randomArray;
}

module.exports = sampleFromArray;

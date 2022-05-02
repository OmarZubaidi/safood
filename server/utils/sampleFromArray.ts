export default function sampleFromArray<T> (array: T[], quantity: number): T[] {
  const set = new Set<number>();

  while (set.size < quantity && set.size < array.length) {
    set.add(Math.floor(Math.random() * array.length));
  }

  const randomArray: T[] = [];
  set.forEach(number => randomArray.push(array[number]));
  return randomArray;
}

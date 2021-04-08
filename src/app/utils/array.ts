import { Trivia } from '../models/util-types';

const pickRandomArr = <T>(arr: T[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const pickRandom = <T>(v: Object | T[]) => {
  if (Array.isArray(v)) return pickRandomArr(v);

  const keys = Object.keys(v);
  return v[pickRandomArr(keys)];
};

export const hashCode = (str: string) => {
  let hash = 0;
  if (str.length == 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
};

export const calculateTriviaId = ({ question }: Trivia) => hashCode(question);

export const addProp = (fn: (obj) => any, propKey: string) => obj => ({
  ...obj,
  [propKey]: fn(obj)
});

export const toDictionary = (acc, value) => {
  return { ...acc, [value.id]: value };
};

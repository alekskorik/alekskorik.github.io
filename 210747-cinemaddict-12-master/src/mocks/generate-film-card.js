import {getRandomInteger, getRandomFloatInteger} from '../utils/common.js';
import {getComments} from './comment.js';
const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);
const generateTitle = () => {
  const titles = [
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`,
    `The Great Flamarion`,
    `Made for Each Other`,
    `Sagerbush trail`,
    `The Dance of Life`,
  ];
  return titles[getRandomInteger(0, titles.length - 1)];
};

const generatePoster = () => {
  const postersNames = [
    `the-dance-of-life.jpg`,
    `sagebrush-trail.jpg`,
    `the-man-with-the-golden-arm.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `popeye-meets-sinbad.png`,
    `the-man-with-the-golden-arm.jpg`,
    `the-great-flamarion.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `made-for-each-other.png`
  ];

  return postersNames[getRandomInteger(0, postersNames.length - 1)];
};

const generateDescription = () => {
  const sentences = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];
  const numberOfSentences = getRandomInteger(0, 5);
  const description = new Set();

  for (let i = 0; i < numberOfSentences; i++) {
    description.add(sentences[getRandomInteger(0, sentences.length - 1)]);
  }

  return Array.from(description).join(` `);
};

const generateRating = (a = 0, b = 1) => {
  return getRandomFloatInteger(a, b);
};

const generateFilmReleaseYear = () => {
  return getRandomInteger(1920, 2020);
};

const generateFilmDuration = () => {
  const hours = getRandomInteger(1, 3);
  const minutes = getRandomInteger(1, 59);
  return {
    hours,
    minutes
  };
};

const generateGenres = () => {
  const genres = [
    `Musical`,
    `Western`,
    `Drama`,
    `Comedy`,
    `Horror`,
    `Documentary`
  ];
  const numberOfGenres = getRandomInteger(1, 4);
  const genresSet = new Set();
  for (let i = 0; i < numberOfGenres; i++) {
    genresSet.add(genres[getRandomInteger(0, genres.length - 1)]);
  }
  return Array.from(genresSet);
};

const genereateCountry = () => {
  const countries = [
    `USA`,
    `Germany`,
    `UK`,
    `France`,
    `China`,
    `USSR`
  ];
  return countries[getRandomInteger(0, countries.length - 1)];
};

const generateDateOfRelease = () => {
  const releaseDate = new Date();
  releaseDate.setHours(23, 59, 59, 999);
  releaseDate.setFullYear(generateFilmReleaseYear(), getRandomInteger(0, 11), getRandomInteger(1, 31));
  return releaseDate.toLocaleString(`en-GB`, {day: `numeric`, month: `long`, year: `numeric`});
};

const generateCensorAge = () => {
  const limits = [
    `12+`,
    `16+`,
    `18+`,
  ];

  return limits[getRandomInteger(0, limits.length - 1)];
};

const generateActors = () => {
  const actors = [
    `Erich von Stroheim`,
    `Mary Beth Hughes`,
    ` Dan Duryea`,
  ];
  const numberOfActors = getRandomInteger(1, 3);
  const actorsSet = new Set();
  for (let i = 0; i < numberOfActors; i++) {
    actorsSet.add(actors[getRandomInteger(0, actors.length - 1)]);
  }
  return Array.from(actorsSet);
};

const generateWriters = () => {
  const writers = [
    `Anne Wigton`,
    `Heinz Herald`,
    `Richard Weil`,
  ];
  const numberOfWriters = getRandomInteger(1, 3);
  const writersSet = new Set();
  for (let i = 0; i < numberOfWriters; i++) {
    writersSet.add(writers[getRandomInteger(0, writers.length - 1)]);
  }
  return Array.from(writersSet);
};

export const generateFilmCard = () => {
  return {
    id: generateId(),
    title: generateTitle(),
    posterName: generatePoster(),
    description: generateDescription(),
    rating: generateRating(0, 10),
    filmReleaseYear: generateFilmReleaseYear(),
    filmDuration: generateFilmDuration(),
    genres: generateGenres(),
    director: `Anthony Mann`,
    writers: generateWriters(),
    actors: generateActors(),
    country: genereateCountry(),
    filmReleasefullDate: generateDateOfRelease(),
    censorAge: generateCensorAge(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isInWatchList: Boolean(getRandomInteger(0, 1)),
    comments: getComments(getRandomInteger(0, 5))
  };
};

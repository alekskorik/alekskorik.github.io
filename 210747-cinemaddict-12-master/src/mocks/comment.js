
import {getRandomInteger} from '../utils/common.js';
const generateComment = () => {
  const authors = [
    `John`,
    `Peter`,
    `Sam`,
    `Vito`,
    `Donald`,
  ];

  const emoji = [
    {
      path: `./images/emoji/angry.png`,
      alt: `angry`
    },
    {
      path: `./images/emoji/puke.png`,
      alt: `puke`
    },
    {
      path: `./images/emoji/sleeping.png`,
      alt: `sleeping`
    },
    {
      path: `./images/emoji/smile.png`,
      alt: `smile`
    }
  ];

  const commentText = [
    `Good film, highly recommend`,
    `The best!`,
    `Not bad`,
    `I've seen better`
  ];

  return {
    commentText: commentText[getRandomInteger(0, commentText.length - 1)],
    emoji: emoji[getRandomInteger(0, emoji.length - 1)],
    author: authors[getRandomInteger(0, authors.length - 1)],
    date: `2019/12/31 23:59`
  };
};

export const getComments = (numberOfComments) => {
  const commentsArr = [];
  for (let i = 0; i <= numberOfComments; i++) {
    commentsArr.push(generateComment());
  }
  return commentsArr;
};

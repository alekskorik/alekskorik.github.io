export const getCommentTemplate = (comment) => {
  const {commentText, emoji, author, date} = comment;
  return (`
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emoji.path}" width="55" height="55" alt="${emoji.alt}">
      </span>
      <div>
        <p class="film-details__comment-text">${commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
  `);
};

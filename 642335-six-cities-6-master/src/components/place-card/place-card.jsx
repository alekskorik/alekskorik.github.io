import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FavoriteButton from '../../components/favorite-button/favorite-button.jsx';

export default class PlaceCard extends Component {

  constructor(props) {
    super(props);

  }
  render() {
    const {
      id,
      title,
      type,
      order,
      previewImage,
      price} = this.props.data;
    const {onHover, onClickActiveCard} = this.props;
    return (
      <article
        onMouseEnter={onHover}
        className="cities__place-card place-card">
        <div className="place-card__mark">
          <span>{order}</span>
        </div>
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#" >
            <img
              onClick={() => {
                onClickActiveCard(id);
              }}
              className="place-card__image"
              src={previewImage}
              width={260}
              height={200}
              alt="Place image" />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">€{price}</b>
              <span className="place-card__price-text">/&nbsp;night</span>
            </div>
            <FavoriteButton offer={this.props.data} />
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `93%`}} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#" >{title}</a>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }
}

PlaceCard.propTypes = {
  onClickActiveCard: PropTypes.func,
  onHover: PropTypes.func,
  data: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    order: PropTypes.string,
    previewImage: PropTypes.string,
    price: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';


export default class PlacesList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {offers, onActiveItemChange, city} = this.props;
    console.log(onActiveItemChange);
    return (
      <React.Fragment>
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{`${offers.length} places to stay in ${city}`}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
                Popular
            <svg className="places__sorting-arrow" width={7} height={4}>
              <use xlinkHref="#icon-arrow-select" />
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>Popular</li>
            <li className="places__option" tabIndex={0}>Price: low to high</li>
            <li className="places__option" tabIndex={0}>Price: high to low</li>
            <li className="places__option" tabIndex={0}>Top rated first</li>
          </ul>
          {/*
          <select class="places__sorting-type" id="places-sorting">
            <option class="places__option" value="popular" selected="">Popular</option>
            <option class="places__option" value="to-high">Price: low to high</option>
            <option class="places__option" value="to-low">Price: high to low</option>
            <option class="places__option" value="top-rated">Top rated first</option>
          </select>
          */}
        </form>
        <div className="cities__places-list places__list tabs__content">
          {offers.map((card, index) => {

            return <PlaceCard
              onClickActiveCard={(id) => {
                onActiveItemChange(id);
              }}
              data={card}
              key={card.id}
              activeIndex={index}
            />;
          })}
        </div>
      </React.Fragment>
    );
  }
}

PlacesList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  city: PropTypes.string,
  onActiveItemChange: PropTypes.func
};

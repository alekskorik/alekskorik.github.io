import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';


export default class PlacesList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {offers, onActiveItemChange} = this.props;
    console.log(onActiveItemChange);
    return (
      <React.Fragment>
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

import React from 'react';
import PropTypes from 'prop-types';

const Gallery = ({images}) => {
  const items = images.slice(0, 6).map((src, index) => {
    return <div key={index} className="property__image-wrapper">
      <img className="property__image" src={src} alt="Photo studio" />
    </div>;
  });
  return <React.Fragment>
    <div className="property__gallery">
      {items}
    </div>
  </React.Fragment>;
};

Gallery.propTypes = {
  images: PropTypes.array.isRequired
};

export default Gallery;

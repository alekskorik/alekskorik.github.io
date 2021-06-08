import React, {Component} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {connect} from 'react-redux';
import {getCurrentCity} from '../../reducers/user/selectors.js';
import {getCurrentOffers, getCurrentCityLocation, getActiveCard} from '../../reducers/data/selectors.js';


class Map extends Component {
  constructor(props) {
    super(props);

    this._zoom = 12;
    this._group = null;
  }
  _addMarkers() {
    this._group = leaflet.layerGroup().addTo(this._map);
    for (let item of this.props.offers) {
      leaflet.marker(item.location).addTo(this._group);
    }
  }

  _initMap() {
    const city = [39.61, -105.02];
    this._map = leaflet.map(`map`, {
      center: city,
      zoom: this._zoom,
      zoomControl: false,
      marker: true
    });
    this._map.setView(city, this._zoom);
    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this._map);
    this._addMarkers();
  }

  componentDidMount() {
    this._initMap();
  }

  componentDidUpdate(prevProps) {
    const customIcon = leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [25, 41],
    });
    this._group.clearLayers();
    this._map.setView(this.props.cityLocation, this._zoom);
    this.props.offers.forEach((item) => {
      leaflet.marker(item.location).addTo(this._group);
    });
    if (prevProps.activeCard !== this.props.activeCard) {
      const {activeCard, offers} = this.props;
      this._group.clearLayers();
      offers.forEach((item, index) => {
        if (activeCard === index) {
          leaflet.marker(offers[activeCard].location, {icon: customIcon}).addTo(this._group);
        } else {
          leaflet.marer(item.location).addTo(this._group);
        }
      });

    }

  }

  render() {
    return (
      <div className="cities__map" style={{height: `100%`}} id="map">
      </div>
    );
  }

}

Map.propTypes = {
  offers: PropTypes.array,
  currentCity: PropTypes.string,
  cityLocation: PropTypes.array,
  activeCard: PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    activeCity: getCurrentCity(state),
    offers: getCurrentOffers(state),
    cityLocation: getCurrentCityLocation(state),
    activeCard: getActiveCard,
  };
};

export default connect(mapStateToProps)(Map);

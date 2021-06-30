
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlaceCard from './place-card.jsx';

const mock = [
  {
    title: `Beautiful & luxurious apartment at great location`,
    price: 120,
    degree: `Apartment`,
    order: `Premium`,
    photo: `img/apartment-01.jpg`,
    id: 55
  },
];

Enzyme.configure({adapter: new Adapter()});

describe(`Test e2e for value component`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<PlaceCard
    index={mock[0].id}
    data={mock[0]}
    onClickActiveCard = {clickHandler}/>);


  it(`Hover on Article - 'Head in Card'`, () => {
    const article = app.find(`.cities__place-card`);
    article.simulate(`mouseenter`);

    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(clickHandler).toHaveBeenCalledWith(mock[0].id);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import User from '../components/Users';

describe('User component', () => {
  it('should render correctly', () => {
    const component = shallow(<User />);
    expect(component).toMatchSnapshot();
  });

  it('should render two users with given data', () => {
    const users = [
      {
        username: 'Admin',
      },
      {
        username: 'Moderator',
      },
    ];

    const component = shallow(<User users={users} />);
    expect(component).toMatchSnapshot();
  });
});

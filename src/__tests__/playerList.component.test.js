import { PlayerList } from '../Modules/PlayerList/components/PlayerList'
import { shallow } from 'enzyme';
import React from 'react';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import configureStore from 'redux-mock-store'

describe('PlayerList component shallow test', () => {
    const initialState = { playersReducer: { error: false, loading: false, fetchedPlayers: [] } }
    const mockStore = configureStore()
    let store, wrapper

    beforeEach(() => {
        store = mockStore(initialState)
        wrapper = shallow(<PlayerList store={store} />)
    })

    it('render the connected component', () => {
        expect(wrapper.length).toEqual(1)
    });

    it('check Prop matches with initialState', () => {
        expect(wrapper.prop('fetchedPlayers')).toEqual(initialState.fetchedPlayers)
    });
});

import { PlayerList, PlayerListComponent } from '../Modules/PlayerList/components/PlayerList'
import { Segment, Container, Form, Header, Table } from 'semantic-ui-react'
import React from 'react';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import appReducer from '../rootReducer'

const store = createStore(
    appReducer,
    applyMiddleware(thunk)
)

//semantic ui doesnt work with shallow
describe('PlayerList component mount test with real Store to check render   ', () => {
    const initialState = { playersReducer: { error: false, loading: false, fetchedPlayers: [] } }
    let wrapper

    beforeEach(() => {
        //store = mockStore(initialState)
        //wrapper = mount(<PlayerList store={store} />)
        wrapper = mount(<Provider store={store}><PlayerList /></Provider>)

    })
    it('should <PlayerListComponent /> exists', () => {
        expect(wrapper.find(PlayerListComponent).exists()).toBe(true)
    })
    it('render the connected component', () => {
        expect(wrapper.length).toEqual(1)
    });
    it('render the Form component', () => {
        expect(wrapper.find('Form').length).toEqual(1)
    });
    it('render the Table component', () => {
        expect(wrapper.find('Table').length).toEqual(1)
    });
    it('check Prop matches with initialState', () => {
        expect(wrapper.prop('fetchedPlayers')).toEqual(initialState.fetchedPlayers)
    });
    it('should render the submit button', () => {
        expect(wrapper.find(Form.Button).length).toEqual(1)
    })
    it('should render two inputs', () => {
        expect(wrapper.find(Form.Input).length).toEqual(2)
    })

    it('should render table with one player', () => {
        wrapper.setProps({
            fetchedPlayers: [{
                "contractUntil": "2022-06-30",
                "dateOfBirth": "1993-05-13",
                "jerseyNumber": 9,
                "name": "Romelu Lukaku",
                "nationality": "Belgium",
                "position": "Centre-Forward"
            }]
        })
        expect(wrapper.find(Table.Row).length).toEqual(2)
    })

    it('should unmount component`', () => {
        wrapper.unmount();
    });

});

describe('dispatch testing with mock fn', () => {
    let wrapper;
    // our mock function to replace the one provided by mapDispatchToProps
    const mockdispatch = jest.fn();
    beforeEach(() => {
        // pass the mock function as prop 
        wrapper = shallow(<PlayerListComponent fetchedPlayers={[]} error={false} loading={false} dispatch={mockdispatch} />)
    })
    it('should call the mock function on submit', () => {
        wrapper.find('Form').simulate('submit', { preventDefault() { } })
        expect(mockdispatch.mock.calls.length).toBe(1)
    })
    it('should return still fetching in console log', () => {
        jest.spyOn(global.console, 'log')
        wrapper.setProps({ loading: true });
        wrapper.find('Form').simulate('submit', { preventDefault() { } })
        expect(console.log).toBeCalled()
    })
    //simulates does nothing
    // it('should call the mock function on click', () => {
    //     wrapper.find(Form.Button).simulate('click', { preventDefault() { } });
    //     expect(mockdispatch.mock.calls.length).toBe(1)
    // })
    it('should change playername via test', () => {
        const mockFn = jest.fn();
        const secondWrapper = shallow(<PlayerListComponent fetchedPlayers={[]} error={false} loading={false} handleChange={mockFn} />)
        expect(secondWrapper.state('playername')).toEqual('')
        secondWrapper.state().playername = 'test'
        expect(secondWrapper.state('playername')).toEqual('test')
        expect(mockFn.mock.calls.length).toBe(0);
        secondWrapper.unmount();
    })
    //simulates does nothing
    // it('should change playername via event', () => {
    //     const event = { target: { name: 'playername', value: 'test' } };
    //     const secondWrapper = shallow(<PlayerListComponent fetchedPlayers={[]} error={false} loading={false} />)
    //     expect(secondWrapper.state('playername')).toEqual('')
    //     //secondWrapper.setState({playername:'test'})
    //     const instance = secondWrapper.instance()
    //     const handleChange = jest.spyOn(instance, 'handleChange');
    //     instance.forceUpdate()
    //     secondWrapper.find(Form.Input).at(1).simulate('onChange', event)
    //     // instance.forceUpdate()
    //     expect(handleChange).toBeCalled();
    //     //expect(secondWrapper.state('playername')).toEqual('test')
    //     secondWrapper.unmount();
    // })
    it('test component method getAge', () => {
        const date = "1993-05-13"   //should return 25
        const instance = wrapper.instance()
        const result = instance.getAge(date)
        expect(result).toEqual(25)
    })
    it('test component method getAge (second return)', () => {
        const date = "1993-12-13"   //should return 24
        const instance = wrapper.instance()
        const result = instance.getAge(date)
        expect(result).toEqual(24)
    })
    it('test component method getAge (third return)', () => {
        const date = "1993-08-01"   //should return 25
        const instance = wrapper.instance()
        const result = instance.getAge(date)
        expect(result).toEqual(25)
    })
    it('test component method getAge (fourth return)', () => {
        const date = "1993-08-30"   //should return 24
        const instance = wrapper.instance()
        const result = instance.getAge(date)
        expect(result).toEqual(24)
    })
})
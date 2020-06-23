import React from 'react'
import ReactDOM from 'react-dom'
import { CalculatorInterface } from '../components/calculator-interface'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({
    adapter: new Adapter(),
})

describe('Calculator Interface', () => {
    let wrapper: any
    beforeEach(() => {
        wrapper = shallow(<CalculatorInterface title="my-app" />)
    })
    describe('night-mode', () => {
        let nightModeButton: any
        beforeEach(() => {
            nightModeButton = wrapper.find('div.night-mode-icon button')
        })
        test('to be initiated unset', () => {
            expect(wrapper.find('.night-mode')).toHaveLength(0)
            nightModeButton.simulate('click')
            expect(wrapper.find('.night-mode')).toBeTruthy()
        })
        test('can be set and unset', () => {
            nightModeButton.simulate('click')
            expect(wrapper.find('.night-mode')).toBeTruthy()
            nightModeButton.simulate('click')
            expect(wrapper.find('.night-mode')).toHaveLength(0)
        })
        test('icon changed on click', () => {
            nightModeButton.simulate('click')
            expect(wrapper.find('i.fa-sun')).toHaveLength(1)
            nightModeButton.simulate('click')
            expect(wrapper.find('i.fa-sun')).toHaveLength(0)
        })
        test('icon be moon by default and change on click', () => {
            expect(wrapper.find('i.fa-moon')).toHaveLength(1)
            nightModeButton.simulate('click')
            expect(wrapper.find('i.fa-moon')).toHaveLength(0)
        })
    })
    describe('number input buttons', () => {
        test('renders 12 buttons', () => {
            expect(wrapper.find('.input-button')).toHaveLength(12)
        })
        test('is input on click', () => {
            wrapper.find('.input-button').forEach((element: any) => {
                element.simulate('click')
            })
            expect(wrapper.instance().state.valueInput).toEqual('7894561230.')
        })
    })
})

import React from 'react'
import App from './App'
import ReactDOM from 'react-dom'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({
    adapter: new Adapter(),
})

describe('Calculator App', () => {
    it('renders without crashing', () => {
        shallow(<App />)
    })
    it('renders a mobile screen', () => {
        const wrapper = shallow(<App />)
        const app = wrapper.find('.mobile-screen')
        expect(app).toBeDefined()
    })
})

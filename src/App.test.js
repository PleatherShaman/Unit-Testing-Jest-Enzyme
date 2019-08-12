import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

// **
// * Factory function to create a ShallowWrapper for the App component.
// @function setup
// @param {object} props - Component props specific to this setup.
// @param {object} state - Component props specific to this setup.
// @return {shallowWrapper}
// **

const setup = (props = {}, state = {counter: 0, errors: false}) => {
  const wrapper = shallow(<App {...props} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

// **
// * return ShallowWrapper containing node(s) with the given data-test value.
// @ param {shallowWrapper} wrapper - Enzyme shallow wrapper to search within.
// @returns {shallow wrapper}
// **

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "app");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test("renders decrement button", () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  expect(decrementButton.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const display = findByTestAttr(wrapper, "counter-display");
  expect(display.length).toBe(1);
});



test("counter starts at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

test("when button is clicked, counter display is incremented", () => {
  const counter = 7;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");
  wrapper.update();
  const display = findByTestAttr(wrapper, "counter-display");
  expect(display.text()).toContain(counter + 1);
});

test("when decrement button is clicked, couter display will decrement by 1", () => {
  const counter = 7;
  const wrapper = setup(null, { counter });
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  decrementButton.simulate("click");
  wrapper.update();
  const display = findByTestAttr(wrapper, "counter-display");
  expect(display.text()).toContain(counter - 1);
});


test('counter cannot go below 0', ()=>{
  const counter = 0;
  const wrapper = setup(null, {counter});
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  decrementButton.simulate("click");
  wrapper.update();
  const display = findByTestAttr(wrapper, "counter-display");
  expect(display.text()).not.toMatch(/-1/);  
})

test('throw error when decrement is clicked at 0', ()=>{
  const counter = 0;
  const error = false;
  const wrapper = setup(null, {counter, error });
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  decrementButton.simulate("click");
  wrapper.update();
  const errorMessage = findByTestAttr(wrapper, "error-message");
  expect(errorMessage.length).toBe(1);  
})


test('clear error on click increment', ()=>{
  const counter=0;
  const error=true;
  const wrapper = setup(null, {counter, error });
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");
  wrapper.update();
  const errorMessage = findByTestAttr(wrapper, "error-message");
  expect(errorMessage.length).toBe(0);  

})
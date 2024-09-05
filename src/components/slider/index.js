export default class Slider {
  elements = {};

  constructor(wrapper, slider_options = {}) {
    this.loadElements(wrapper);
    this.initialiseSlider(slider_options);
  }

  loadElements(wrapper) {
    this.elements.wrapper = wrapper;
  }

  initialiseSlider(slider_options) {
    this.elements.slider = new Splide(this.elements.wrapper, slider_options);
    this.elements.slider.mount();
  }
}

Very simple example of a slider with some text beside it.

![example of the text with slider component](/assets/text-with-slider/text-with-slider.png)

#### HTML
```html
<div class="text_with_slider_wrapper">
    <div class="text_wrapper">
        <h2>Slider Title</h2>
        <p>Slider Description</p>
    </div>
    <div class="text_with_slider__slider_wrapper">
        <div class="swiper slider__wrapper">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
            ...
        </div>
        <!-- If we need pagination -->
        <div class="swiper-pagination"></div>

        <!-- If we need navigation buttons -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

        <!-- If we need scrollbar -->
        <div class="swiper-scrollbar"></div>
    </div>
</div>
```

#### JS
```js
// Some code to initialise it...
```

#### CSS
```css
.text_with_slider_wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
```
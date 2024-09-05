This component will render a very simple slider. It uses [Swiper.js](https://swiperjs.com/) as the base library to assist with this.

In order to install it, you can use the CDN links documented [here](https://swiperjs.com/get-started#use-swiper-from-cdn).

> [!WARNING]
> Ensure that the version being pulled from the CDN is the latest fixed version on newer projects to ensure we start out with an up to date version of the library. e.g. `https://cdn.jsdelivr.net/npm/swiper@11.1.12/swiper-bundle.min.js`.

In order to initialise this slider using jQuery you can use the following code:

```javascript
import Slider from './slider.js';

jQuery('document').ready(
    () => {
        jQuery('.slider__wrapper').each(
            function() {
                new Slider(
                    this,
                    {
                        pagination: {
                            el: '.swiper-pagination',
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    } 
                );
            }
        );
    }
);
```

With the second argument being configuration defined within the [splide options documentation](https://splidejs.com/guides/apis/#options).
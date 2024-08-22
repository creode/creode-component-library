This component renders a very basic header to the app.

In order to initialise it you can add the following JavaScript to your apps desired JS entry point:

```javascript
import { Header } from "creode-components";

jQuery('document').ready(
	() => {
		jQuery('.header__wrapper').each(
			function() {
				new Header(jQuery(this));
			}
		);
	}
);
```
# header
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

## File Snippets

### header/index.html
```html

```

### header/index.js
```javascript
export default class Header {
	breakpoint = 760;
	menuExpanded = false;
	elements = {};

  // Tests the order of components.
	constructor(wrapper) {
		this.loadElements(wrapper);
		if(this.elements.menu.section.length) {
			this.setDefaultMenuExpandedValue();
			this.setMenuState();
			this.setFocusableMenuItems();
			this.setMenuEventListeners();
		}
	}

	loadElements(wrapper) {
		this.elements.wrapper = wrapper;
		this.elements.menu = {};
		this.elements.menu.section = this.elements.wrapper.find('.header__section--menu');
		this.elements.menu.toggleWrapper = this.elements.wrapper.find('.header__menu-toggle-wrapper');
		this.elements.menu.toggle = this.elements.wrapper.find('.header__menu-toggle');
		this.elements.menu.closeButtonWrapper = this.elements.wrapper.find('.header__menu-close-button-wrapper');
		this.elements.menu.closeButton = this.elements.wrapper.find('.header__menu-close-button');
		this.elements.menu.wrapper = this.elements.wrapper.find('.header__menu-wrapper');
		this.elements.menu.inner = this.elements.wrapper.find('.header__menu-inner');
	}

	isDesktopScreen() {
		return this.breakpoint < window.innerWidth;
	}

	setDefaultMenuExpandedValue() {
		this.menuExpanded = this.isDesktopScreen();
	}

	setMenuState() {
		this.elements.menu.section.toggleClass('header__section--desktop-menu', this.isDesktopScreen());
		this.elements.menu.toggleWrapper.prop('hidden', this.isDesktopScreen());
		this.elements.menu.toggle.prop('checked', this.menuExpanded);
		this.isDesktopScreen() ? this.elements.menu.toggleWrapper.attr('aria-hidden', '') : this.elements.menu.toggleWrapper.removeAttr('aria-hidden');
		this.elements.menu.closeButtonWrapper.prop('hidden', this.isDesktopScreen());
		this.isDesktopScreen() ? this.elements.menu.closeButtonWrapper.attr('aria-hidden', '') : this.elements.menu.closeButtonWrapper.removeAttr('aria-hidden');
		this.elements.menu.wrapper.prop('hidden', ! this.menuExpanded);
		this.menuExpanded ? this.elements.menu.wrapper.removeAttr('aria-hidden') : this.elements.menu.wrapper.attr('aria-hidden', '');
	}

	setFocusableMenuItems() {
		let focusables = this.elements.menu.inner.get(0).querySelectorAll('a, button');

		for (let i = 0; i < focusables.length; i++) {
			focusables[i].tabIndex = this.menuExpanded ? 0 : -1;
		}
	}

	setMenuEventListeners() {
		jQuery(window).resize(
			() => {
				this.setDefaultMenuExpandedValue();
				this.setMenuState();
				this.setFocusableMenuItems();
			}
		);
		this.elements.menu.toggle.on(
			'change',
			() => {
				this.menuExpanded = ! this.menuExpanded;
				this.setMenuState();
				this.setFocusableMenuItems();
			}
		);
		this.elements.menu.toggle.on(
			'keyup',
			(event) => {
				if(event.originalEvent.key != 'Enter') {
					return;
				}
				this.menuExpanded = ! this.menuExpanded;
				this.setMenuState();
				this.setFocusableMenuItems();
			}
		);
		this.elements.menu.closeButton.on(
			'click',
			() => {
				this.menuExpanded = false;
				this.setMenuState();
				this.setFocusableMenuItems();
			}
		);
	}
};
```

### header/index.scss
```scss
@use '../globals.scss';

@mixin configure(
	$maximum-width: null,
	$space-vertical: null,
	$space-horizontal: null,
	$background-color: null,
	$logo-width: null,
	$use-menu-button-icons: null
) {

	@if $maximum-width {
		$maximum-width: $maximum-width !global;
	} @else {
		$maximum-width: globals.$maximum-width !global;
	}

	@if $space-vertical {
		$space-vertical: $space-vertical !global;
	} @else {
		$space-vertical: globals.$space-vertical !global;
	}

	@if $space-horizontal {
		$space-horizontal: $space-horizontal !global;
	} @else {
		$space-horizontal: globals.$space-horizontal !global;
	}

	@if $background-color {
		$background-color: $background-color !global;
	} @else {
		$background-color: white !global;
	}

	@if $logo-width {
		$logo-width: $logo-width !global;
	} @else {
		$logo-width: 200px !global;
	}

	@if $use-menu-button-icons {
		$use-menu-button-icons: $use-menu-button-icons !global;
	} @else {
		$use-menu-button-icons: true !global;
	}
}

@mixin render() {

	.header__wrapper {
		padding: 0 $space-horizontal;
		background-color: $background-color;
	}

	.header__inner {
		max-width: $maximum-width;
		margin: 0 auto;
		padding: $space-vertical 0 0;
	}

	.header__sections {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 $space-horizontal * -0.5;
	}

	.header__section {
		padding: 0 $space-horizontal * 0.5 $space-vertical;
	}

	.header__section--menu {
		padding-bottom: 0;
	}

	.header__section--general {
		padding-bottom: $space-vertical * 0.5;

		p {
			margin-bottom: $space-vertical * 0.5;
		}
	}

	.header__logo-wrapper {
		max-width: $logo-width;

		img {
			display: block;
			width: 100%;
		}
	}

	.header__menu-toggle-wrapper {
		position: relative;
		width: 40px;

		&[hidden],
		&[aria-hidden] {
			display: none;
		}
	}

	.header__menu-toggle {
		&[hidden],
		&[aria-hidden] {
			display: block;
			position: absolute;
			top: 50%;
			left: 50%;
			margin: 0;
			opacity: 0;
			transform: translate(-50%, -50%);
		}
	}

	.header__menu-close-button-wrapper {
		padding-bottom: $space-vertical;

		&[hidden],
		&[aria-hidden] {
			display: none;
		}
	}

	@if $use-menu-button-icons {
		.header__menu-toggle-label,
		.header__menu-close-button {
			display: block;
			position: relative;
			width: 40px;
			height: 40px;
			padding: 0;
			overflow: hidden;
			background-color: transparent;
			border: none;
			font-size: 0;
			white-space: nowrap;
			text-indent: 100px;
			cursor: pointer;
		}

		.header__menu-toggle-label {
			&::before,
			&::after {
				content: '';
				display: block;
				position: absolute;
				top: 50%;
				left: 50%;
				box-sizing: border-box;
				width: 20px;
				height: 10px;
				border-style: solid;
				border-width: 2px 0;
				transform: translate(-50%, -50%);
			}

			&::before {
				margin-top: -4px;
			}

			&::after {
				margin-top: 4px;
			}
		}

		.header__menu-close-button {
			&::before,
			&::after {
				content: '';
				display: block;
				position: absolute;
				top: 50%;
				left: 50%;
				width: 20px;
				height: 2px;
				background-color: black;
				margin: -1px 0 0 -10px;
			}

			&::before {
				transform: rotate(45deg);
			}

			&::after {
				transform: rotate(135deg);
			}
		}
	}

	.header__menu-wrapper {
		.header__section--menu:not(.header__section--desktop-menu) & {
			position: fixed;
			top: 0;
			left: 0%;
			z-index: 50;
			width: 100%;
			height: 100%;
			background-color: $background-color;
			transition: left 0.5s;

			&[hidden],
			&[aria-hidden] {
				display: block;
				left: 100%;
			}
		}
	}

	.header__menu-inner {
		.header__section--menu:not(.header__section--desktop-menu) & {
			position: absolute;
			top: 0;
			right: 0;
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			padding: $space-vertical $space-horizontal 0;
		}

		& > ul {
			display: flex;
			flex-wrap: wrap;
			margin: 0 $space-horizontal * -0.5;
			padding: 0;
			list-style-type: none;

			& > li {
				margin: 0;
				padding: 0 $space-horizontal * 0.5 $space-vertical;

				.header__section--menu:not(.header__section--desktop-menu) & {
					width: 100%;
				}
			}
		}
	}

}

@mixin wordpresss_editor() {

	.header__sections > .block-editor-inner-blocks {
		width: 100%;

		& > .block-editor-block-list__layout {
			@extend .header__sections;

			& > .wp-block {
				margin: 0;
			}
		}
	}

}
```

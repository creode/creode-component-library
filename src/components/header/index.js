export default class Header {
	breakpoint;
	menuExpanded = false;
	elements = {};
	
	constructor(wrapper, breakpoint = '760px') {
		this.breakpoint = breakpoint;
		this.loadElements(wrapper);
		if(this.elements.menu.section.length) {
			this.setDefaultMenuExpandedValue();
			this.setMenuState();
			this.setFocusableMenuItems();
			this.setMenuEventListeners();
			this.initSubMenus();
			this.elements.menu.section.show();
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
		return window.matchMedia("(min-width: " + this.breakpoint).matches;
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

	initSubMenus() {
		this.hideSubMenus();
		this.addSubMenuToggles();
		this.setSubMenuToggleEventListener();
		this.setSubMenuHoverEventListener();
	}

	hideSubMenus() {
		this.elements.menu.inner.children('ul').children('li').children('ul').prop('hidden', true);
	}

	addSubMenuToggles() {
		let topLevelLinks = this.elements.menu.inner.children('ul').children('li').children('a');

		topLevelLinks.each(
			(index) => {
				let topLevelLink = topLevelLinks.eq(index);

				if(!topLevelLink.next('ul').length) {
					return true;
				}

				jQuery('<button type="button" role="switch" aria-checked="false" class="header__sub-menu-toggle" title="Toggle Sub-menu">Toggle</button>').insertAfter(topLevelLink);
			}
		);
	}

	setSubMenuToggleEventListener() {
		jQuery('.header__sub-menu-toggle').on(
			'click',
			(event) => {
				let toggle = jQuery(event.currentTarget);
				let state = toggle.attr('aria-checked') == 'true';

				state = ! state;
				toggle.next('ul').prop('hidden', !state);

				toggle.attr('aria-checked', state ? 'true' : 'false');
			}
		);
	}

	setSubMenuHoverEventListener() {
		let items = this.elements.menu.inner.children('ul').children('li');
		let links = items.children('a');

		links.on(
			'mouseover',
			(event) => {
				if (!this.isDesktopScreen()) {
					return;
				}

				let link = jQuery(event.currentTarget);
				let toggle = link.next('.header__sub-menu-toggle');

				if(!toggle.length) {
					return;
				}

				toggle.attr('aria-checked', true);
				toggle.next('ul').prop('hidden', false);
				link.attr('data-active', '');
			}
		);
		items.on(
			'mouseleave',
			(event) => {
				if (!this.isDesktopScreen()) {
					return;
				}

				let item = jQuery(event.currentTarget);
				let link = item.children('a');
				let toggle = link.next('.header__sub-menu-toggle');

				if(!toggle.length) {
					return;
				}

				toggle.attr('aria-checked', false);
				toggle.next('ul').prop('hidden', true);
				link.removeAttr('data-active');
			}
		);
	}
};
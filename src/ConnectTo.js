import SVG from "./SVG";
import Events from "./Events";

class ConnectTo extends HTMLElement {
  constructor() {
    super();

    this.svg = new SVG(this);
    this.events = new Events(this);
  }

  connectedCallback() {
    this.events.refreshOnImagesLoaded();
    this.events.refreshOnScroll();
    this.events.refreshOnUserChanges();
  }

  disconnectedCallback() {
    this.events.disposeRefreshOnScroll();
    this.events.disposeRefreshOnUserChanges();
  }

  refresh() {
    this.svg.refresh();
    this.events.addMouseEvents();
  }
}

customElements.get("connect-it") ||
  customElements.define("connect-it", ConnectTo);

import SVG from "./SVG";
import Events from "./Events";

class ConnectIt extends HTMLElement {
  constructor() {
    super();

    this.svg = new SVG(this);
    this.events = new Events(this);
  }

  connectedCallback() {
    this.events.refreshOnImagesLoaded();
    this.events.refreshOnScroll();
    this.events.refreshOnUserChanges();
    this.events.addMouseEvents();
  }

  disconnectedCallback() {
    this.events.disposeRefreshOnScroll();
    this.events.disposeRefreshOnUserChanges();
  }

  refresh() {
    this.svg.refresh();
  }
}

customElements.get("connect-it") ||
  customElements.define("connect-it", ConnectIt);

import { addSelectedPathStyles, removeSelectedPathStyles } from "./Dom";
import * as Dom from "./Dom";
import refreshMarkers from "../components/edge/marker/Marker";
import refreshEdges from "../components/edge/Edge";

const addEvents = (connectIt) => {
  addImageEvents(connectIt);
  addMouseEvents(connectIt);
};

const addMouseEvents = function (connectIt) {
  connectIt.addEventListener("click", function (e) {
    if (e.target.parentElement.classList.contains("gshadow")) {
      const path = Dom.getRelatedPath(connectIt, e.target);
      addSelectedPathStyles(path);
      connectIt.setAttribute("selected", "");
    } else {
      Dom.getPathes(connectIt).forEach((path) => {
        removeSelectedPathStyles(path);
      });
      connectIt.removeAttribute("selected");
    }
  });

  connectIt.addEventListener("mouseout", function (e) {
    if (e.target.parentElement.classList.contains("gshadow")) {
      if (connectIt.hasAttribute("selected")) return;
      const path = Dom.getRelatedPath(connectIt, e.target);
      removeSelectedPathStyles(path);
    }
  });

  connectIt.addEventListener("mouseover", function (e) {
    if (e.target.parentElement.classList.contains("gshadow")) {
      const path = Dom.getRelatedPath(connectIt, e.target);
      addSelectedPathStyles(path);
    }
  });
};

const addImageEvents = (connectIt) => {
  onImagesLoaded(connectIt, () => {
    refreshMarkers(connectIt);
    refreshEdges(connectIt);
  });
};

const onImagesLoaded = function (connectIt, func) {
  Promise.all(
    Array.from(Dom.getImages(connectIt))
      .filter((img) => !img.complete)
      .map(
        (img) =>
          new Promise((resolve) => {
            img.onload = img.onerror = resolve;
          })
      )
  ).then(() => {
    func();
  });
};

export default addEvents;

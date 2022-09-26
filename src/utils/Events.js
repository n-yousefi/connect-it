import { addSelectedPathStyles, removeSelectedPathStyles } from "./Dom";
import * as Dom from "./Dom";

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

export default addMouseEvents;

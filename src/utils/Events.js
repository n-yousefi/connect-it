import { addSelectedPathStyles, removeSelectedPathStyles } from "./Dom";

const addMouseEvents = function (connectIt) {
  connectIt.addEventListener("click", function (e) {
    if (e.target.parentElement.classList.contains("gshadow")) {
      const path = getRelatedPath(connectIt, e.target);
      addSelectedPathStyles(path);
      connectIt.setAttribute("selected", "");
    } else {
      getPathes(connectIt).forEach((path) => {
        removeSelectedPathStyles(path);
      });
      connectIt.removeAttribute("selected");
    }
  });

  connectIt.addEventListener("mouseout", function (e) {
    if (e.target.parentElement.classList.contains("gshadow")) {
      if (connectIt.hasAttribute("selected")) return;
      const path = getRelatedPath(connectIt, e.target);
      removeSelectedPathStyles(path);
    }
  });

  connectIt.addEventListener("mouseover", function (e) {
    if (e.target.parentElement.classList.contains("gshadow")) {
      const path = getRelatedPath(connectIt, e.target);
      addSelectedPathStyles(path);
    }
  });
};

function getRelatedPath(connectIt, shadowPath) {
  const element = indexOf(shadowPath.parentElement.childNodes, shadowPath);
  return connectIt.querySelector(`.gmain path:nth-child(${element + 1})`);
}

function indexOf(arr, item) {
  return Array.prototype.indexOf.call(arr, item);
}

function getPathes(connectIt) {
  return connectIt.querySelectorAll("path");
}

export default addMouseEvents;

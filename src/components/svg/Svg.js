import Defs from "./Defs";
import Gmain from "./Gmain";
import Gshadow from "./Gshadow";

const addSvg = (connectIt) => {
  const html = `<svg style="position: absolute; top: 0; left: 0;  z-index:-1">
    ${Defs() + Gmain() + Gshadow()}
    </svg>`;

  connectIt.insertAdjacentHTML("afterbegin", html);
  connectIt.defs = connectIt.querySelector("defs");
};

export default addSvg;

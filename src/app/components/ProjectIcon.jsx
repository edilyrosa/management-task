// export default function ProjectIcon() {
//     return (
//       <animated-icons
//         src="https://animatedicons.co/get-icon?name=Project&style=minimalistic&token=a390903e-4743-4342-b057-9c7f4c3ec5d8"
//         trigger="click"
//         attributes='{"variationThumbColour":"#536DFE","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#00FFE6FF","group-2":"#D757CAFF","background":"#C6D3D3E0"}}'
//         height="50"
//         width="50"
//       ></animated-icons>
//     );
//   }
  








'use client'
import { useEffect, useRef } from "react";

export default function ProjectIcon() {
  const iconRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://animatedicons.co/scripts/embed-animated-icons.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // 🔥 Función para iniciar la animación en hover o click
  const triggerAnimation = () => {
    if (iconRef.current) {
      iconRef.current.playFromBeginning();
    }
  };

  return (
    <div>
      <animated-icons
        ref={iconRef}
        src="https://animatedicons.co/get-icon?name=Project&style=minimalistic&token=a390903e-4743-4342-b057-9c7f4c3ec5d8"
        trigger="none" // 🔥 Desactiva el trigger automático
        attributes='{
          "variationThumbColour": "#536DFE",
          "variationName": "Two Tone",
          "variationNumber": 2,
          "numberOfGroups": 2,
          "backgroundIsGroup": false,
          "strokeWidth": 1,
          "defaultColours": {
            "group-1": "#00FFE6FF",
            "group-2": "#D757CAFF",
            "background": "#C6D3D3E0"
          }
        }'
        height="70"
        width="70"
        onClick={triggerAnimation}
        onMouseOver={triggerAnimation}
      ></animated-icons>
    </div>
  );
}


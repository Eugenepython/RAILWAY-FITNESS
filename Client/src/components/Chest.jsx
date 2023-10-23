

import { useContext, useState, useEffect } from "react";
import { ChestDaysContext } from "../Contexts/Context";


const Chest = ({}) => {

  const chestContext = useContext(ChestDaysContext);
  const [chestOpacity, setOpacity] = useState(null)
  //console.log(chestContext.daysSinceChest + '    daysSinceChest')

  useEffect(() => {
  if (chestContext.daysSinceChest=== 0) {
    setOpacity(1.0);
  } else if (chestContext.daysSinceChest === 1) {
    setOpacity(0.85);
  } else if (chestContext.daysSinceChest === 2) {
    setOpacity(0.7);
  } else if (chestContext.daysSinceChest === 3) {
    setOpacity(0.55);
  } else if (chestContext.daysSinceChest === 4) {
    setOpacity(0.4);
  } else if (chestContext.daysSinceChest === 5) {
    setOpacity(0.25);
  } else if (chestContext.daysSinceChest === 6) {
    setOpacity(0.15);
  } else if (chestContext.daysSinceChest > 6) {
    setOpacity(0.1);
  }
}, [chestContext.chestDays, chestContext.daysSinceChest]);

  const theStyle = {opacity: chestOpacity}

    return (
      <div >
            <img
            className="image-layer"
          //src='./public/images/chest.png'
          //src="https://api.xylex.ai/cdn/image/VIENNA_chest.png"
          src="https://raw.githubusercontent.com/Eugenepython/RAILWAY-FITNESS/main/chest.png"
          alt="Chest Overlay"
          style = {theStyle}
        />
       </div>
    );
  };




export default Chest;

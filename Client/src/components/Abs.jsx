import { useContext, useState, useEffect } from "react";
import { AbsDaysContext } from "../Contexts/Context";

const Abs = () => {

  const absContext = useContext(AbsDaysContext);
  const [absOpacity, setOpacity] = useState(null)
  //console.log(absContext.daysSinceAbs + ' daysSinceAbs!!!!!!!!!!!! in Abs')
  //console.log(absContext.lastAbsDate + ' lastAbsDate!!!!!!!!!!!! in Abs')

useEffect(() => {
  if (absContext.daysSinceAbs === 0) {
    setOpacity(1.0);
  } else if (absContext.daysSinceAbs === 1) {
    setOpacity(0.85);
  } else if (absContext.daysSinceAbs === 2) {
    setOpacity(0.7);
  } else if (absContext.daysSinceAbs === 3) {
    setOpacity(0.55);
  } else if (absContext.daysSinceAbs === 4) {
    setOpacity(0.4);
  } else if (absContext.daysSinceAbs === 5) {
    setOpacity(0.25);
  } else if (absContext.daysSinceAbs === 6) {
    setOpacity(0.15);
  } else if (absContext.daysSinceAbs > 6) {
    setOpacity(0.1);
  }
}, [absContext.absDays, absContext.daysSinceAbs]); 



  const theStyle = {opacity: absOpacity}



    return (
      <div>
            <img
            className = "image-layer"
          //src= './public/images/abs.png'
          src="https://api.xylex.ai/cdn/image/VIENNA_abs.png"
          alt="Abs Overlay"
          style = {theStyle}
        />
       
       </div>
    );
  };


export default Abs;
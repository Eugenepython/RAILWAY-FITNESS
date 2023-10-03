import { useContext, useState, useEffect } from "react";
import { ShouldersDaysContext } from "../Contexts/Context";
import {calculateDateDifferenceInDays} from '../dataUtils';




const Shoulders = ({}) => {

  const shouldersContext = useContext(ShouldersDaysContext);
  const [shouldersOpacity, setOpacity] = useState(null)
  //console.log(shouldersContext.daysSinceShoulders + '    daysSinceShoulders')

  useEffect(() => {
  if (shouldersContext.daysSinceShoulders=== 0) {
    setOpacity(1.0);
  } else if (shouldersContext.daysSinceShoulders === 1) {
    setOpacity(0.85);
  } else if (shouldersContext.daysSinceShoulders === 2) {
    setOpacity(0.7);
  } else if (shouldersContext.daysSinceShoulders === 3) {
    setOpacity(0.55);
  } else if (shouldersContext.daysSinceShoulders === 4) {
    setOpacity(0.4);
  } else if (shouldersContext.daysSinceShoulders === 5) {
    setOpacity(0.25);
  } else if (shouldersContext.daysSinceShoulders === 6) {
    setOpacity(0.15);
  } else if (shouldersContext.daysSinceShoulders > 6) {
    setOpacity(0.1);
  }
}, [shouldersContext.shouldersDays, shouldersContext.daysSinceShoulders]);

const theStyle = {opacity: shouldersOpacity}

    return (
      <div >
            <img
            className="image-layer"
          //src='./public/images/shoulders.png'
          src="https://api.xylex.ai/cdn/image/VIENNA_shoulders.png"
          alt="Shoulder Overlay"
          style = {theStyle}
        />
       </div>
    );
  };




export default Shoulders;

import { useContext, useState, useEffect } from "react";
import { LegsDaysContext } from "../Contexts/Context";
import {calculateDateDifferenceInDays} from '../dataUtils';


const Legs = ({}) => {

  const legsContext = useContext(LegsDaysContext);
  const [legsOpacity, setOpacity] = useState(null)
  //console.log(legsContext.daysSinceLegs + '    daysSinceLegs')

  useEffect(() => {
  if (legsContext.daysSinceLegs=== 0) {
    setOpacity(1.0);
  } else if (legsContext.daysSinceLegs === 1) {
    setOpacity(0.85);
  } else if (legsContext.daysSinceLegs === 2) {
    setOpacity(0.7);
  } else if (legsContext.daysSinceLegs === 3) {
    setOpacity(0.55);
  } else if (legsContext.daysSinceLegs === 4) {
    setOpacity(0.4);
  } else if (legsContext.daysSinceLegs === 5) {
    setOpacity(0.25);
  } else if (legsContext.daysSinceLegs === 6) {
    setOpacity(0.15);
  } else if (legsContext.daysSinceLegs > 6) {
    setOpacity(0.1);
  }
}, [legsContext.legsDays, legsContext.daysSinceLegs]);

  const theStyle = {opacity: legsOpacity}


    return (
      <div >
            <img
            className="image-layer"
          src='./public/images/legs.png'
          alt="Legs Overlay"
          style = {theStyle}
        />
       </div>
    );
  };




export default Legs;
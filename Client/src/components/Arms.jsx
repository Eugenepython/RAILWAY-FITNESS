

import { useContext, useState, useEffect } from "react";
import { ArmsDaysContext } from "../Contexts/Context";

const Arms = ({}) => {

  const armsContext = useContext(ArmsDaysContext);
  const { daysSinceArms, armsDays} = armsContext;
  const [armsOpacity, setOpacity] = useState(null)
  //console.log(daysSinceArms + ' daysSinceArms')


  useEffect(() => {
    if (daysSinceArms === 0) {
      setOpacity(1.0);
    } else if (daysSinceArms === 1) {
      setOpacity(0.85);
    } else if (daysSinceArms === 2) {
      setOpacity(0.7);
    } else if (daysSinceArms === 3) {
      setOpacity(0.55);
    } else if (daysSinceArms === 4) {
      setOpacity(0.4);
    } else if (daysSinceArms === 5) {
      setOpacity(0.25);
    } else if (daysSinceArms === 6) {
      setOpacity(0.15);
    } else if (daysSinceArms > 6) {
      setOpacity(0.1);
      
    }
  }, [armsDays, daysSinceArms]);
 
  const theStyle = {opacity: armsOpacity}
    return (
      
      <div >
            <img
            className="image-layer"
          src='./public/images/arms.png'
          alt="Arms Overlay"
          style = {theStyle}
        />
         </div>
    );
  };


export default Arms;
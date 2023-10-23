
import { useContext, useState, useEffect } from "react";
import { BackDaysContext } from "../Contexts/Context";


const Back = ({}) => {
  
  const backContext = useContext(BackDaysContext);
  const [backOpacity, setOpacity] = useState(null)
  //console.log(backContext.daysSinceBack + '    daysSinceBack')

  useEffect(() => {
  if (backContext.daysSinceBack=== 0) {
    setOpacity(1.0);
  } else if (backContext.daysSinceBack === 1) {
    setOpacity(0.85);
  } else if (backContext.daysSinceBack === 2) {
    setOpacity(0.7);
  } else if (backContext.daysSinceBack === 3) {
    setOpacity(0.55);
  } else if (backContext.daysSinceBack === 4) {
    setOpacity(0.4);
  } else if (backContext.daysSinceBack === 5) {
    setOpacity(0.25);
  } else if (backContext.daysSinceBack === 6) {
    setOpacity(0.15);
  } else if (backContext.daysSinceBack > 6) {
    setOpacity(0.1);
  }
}, [backContext.backDays, backContext.daysSinceBack]);

  const theStyle = {opacity: backOpacity}
    return (
      <div >
            <img
            className="image-layer"
          //src='./public/images/back.png'
          //src="https://api.xylex.ai/cdn/image/VIENNA_back.png"
          src="https://raw.githubusercontent.com/Eugenepython/RAILWAY-FITNESS/main/back.png"
          alt="Back Overlay"
          style = {theStyle}

        />
       </div>
    );
  };




export default Back;
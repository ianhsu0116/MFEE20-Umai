import React from "react";
import { useState , useEffect} from "react";
import Chef from "./images/test/pexels-chef1.jpg";

function ChefCard(props) {
  const { chefIntroduce1 , chefInfoTiele, chefInfo , chefFirstName , chefLastName , avatar} = props;


  const [chefLi , setChefLi] = useState([
    "",
    "",
    "",
    ""
    ])

  
  useEffect(() => {
    if(chefInfo != null){
    setChefLi(
      chefInfo
    );
    }
  }, [chefInfo]);

  return (
    <>
      <div className="st-chefCard">
        <img className="st-chefCardPicture" src={avatar} alt=""></img>
        <div className="st-chefCardTop">
          「{chefIntroduce1}」
          <div className="st-chefCardLine"></div>
          <div className="st-chefCardTopChefName">
            <pre>
                  我是
                  {chefFirstName}{chefLastName}
                  <br />
                  我想與您一起開心地做料理！
            </pre>
          </div>
        </div>
        <div className="st-chefCardDown">
          <pre>
            {chefInfoTiele}
          </pre>
          <ul>
            <li>{chefLi[0]}</li>
            <li>{chefLi[1]}</li>
            <li>{chefLi[2]}</li>
            <li>{chefLi[3]}</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ChefCard;

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
  // <img className="st-chefCardPicture" src={avatar} alt=""></img>
  // 「{chefIntroduce1}」
//   <pre>
//   我是
//   {chefFirstName}{chefLastName}
//   <br />
//   我想與您一起開心地做料理！
// </pre>
{/* <pre>
{chefInfoTiele}
</pre> */}
{/* <ul>
<li>{chefLi[0]}</li>
<li>{chefLi[1]}</li>
<li>{chefLi[2]}</li>
<li>{chefLi[3]}</li>
</ul> */}
return (
  <>
    <div className="st-chefCard">
      {/* 主廚照片容器(左) */}
      <div className="st-chefCardPictureWrapper">
        <img className="st-chefCardPicture" src={avatar} alt=""></img>
      </div>

      {/* 主廚文字容器(右) */}
      <div className="st-chefCardTextWrapper">
        {/* 上半部 */}
        <div className="st-chefCardTop">
          <div className="st-chefCardTopQuotation">
            「{chefIntroduce1}」
          </div>
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
        {/* 下半部 */}
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
    </div>
  </>
);
}

export default ChefCard;

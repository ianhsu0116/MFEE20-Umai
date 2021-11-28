import React from 'react'
import Food3 from '../../components/images/test/istock韓風課程.jpg';

function CourseRecommend(props){
   
    let recommendText = "辛奇，又稱韓式泡菜、韓國泡菜或朝鮮泡菜，是朝鮮族的一種傳統發酵食品，通常作為飯饌和米飯一起食用。因為通常使用大白菜製作，中國東北稱其為辣白菜。"
       

  return (
    <>
            <div className="Coursedetail-recommend">
            <div className="Coursedetail-recommendLeft">
                    <img src={Food3} alt=""></img>
                    <div className="Coursedetail-recommendMask">
                        <div className="Coursedetail-recommendFlag"><p>日式料理</p></div>
                        <div className="Coursedetail-recommendTitle">難度:中級</div>
                        <div className="Coursedetail-recommendLine"></div>
                        <div className="Coursedetail-recommendName">如何開始料理</div>
                        <div className="Coursedetail-recommendInfo">{recommendText}{recommendText}</div>
                        <div className="Coursedetail-recommendInfo Coursedetail-recommendClick">點擊了解詳細課程</div>
                    </div>
                </div>
                

                <div className="Coursedetail-recommendLeft">
                    <img src={Food3} alt="" ></img>
                    <div className="Coursedetail-recommendMask">
                        <div className="Coursedetail-recommendFlag"><p>日式料理</p></div>
                        <div className="Coursedetail-recommendTitle">難度:中級</div>
                        <div className="Coursedetail-recommendLine"></div>
                        <div className="Coursedetail-recommendName">如何開始料理</div>
                        <div className="Coursedetail-recommendInfo">{recommendText}{recommendText}</div>
                        <div className="Coursedetail-recommendInfo Coursedetail-recommendClick">點擊了解詳細課程</div>
                    </div>
                </div>

                <div className="Coursedetail-recommendLeft">
                    <img src={Food3} alt=""></img>
                    <div className="Coursedetail-recommendMask">
                        <div className="Coursedetail-recommendFlag"><p>日式料理</p></div>
                        <div className="Coursedetail-recommendTitle">難度:中級</div>
                        <div className="Coursedetail-recommendLine"></div>
                        <div className="Coursedetail-recommendName">如何開始料理</div>
                        <div className="Coursedetail-recommendInfo">{recommendText}{recommendText}</div>
                        <div className="Coursedetail-recommendInfo Coursedetail-recommendClick">點擊了解詳細課程</div>
                    </div>
                </div>
                {/* <div className="Coursedetail-recommendRight">
                    <img src={Food3} alt="" width="300px"></img>
                    <span className="Coursedetail-recommendText">
                        <div className="Coursedetail-recommendTitle">難度:高級</div>
                        <div className="Coursedetail-recommendLine"></div>
                        <div className="Coursedetail-recommendName">製作道地的麵</div>
                        <div className="Coursedetail-recommendInfo">123</div>
                    </span>
                </div> */}
            </div>
    </>
         )
    
}

export default CourseRecommend
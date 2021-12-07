import React from 'react'
import Food1 from '../../components/images/test/piqsels蔘雞湯.jpg';
import Food3 from '../../components/images/test/istock韓風課程.jpg';
import Food2 from '../../components/images/test/photoAC起司炒年糕.jpg';
import CircleOrange from "../../components/images/circle_orange.svg";

function CourseRecommend(props){
   
    let recommendText = "辛奇，又稱韓式泡菜、韓國泡菜或朝鮮泡菜，是朝鮮族的一種傳統發酵食品，通常作為飯饌和米飯一起食用。因為通常使用大白菜製作，中國東北稱其為辣白菜。"
    let recommendText2 = "蔘雞湯（韓語：삼계탕／蔘鷄湯）朝鮮半島的傳統名菜之一，以整隻童子雞，腹中塞入糯米、佐以紅棗、薑、蒜和人蔘長時間燉煮製成。朝鮮王朝時期的雞肉類菜餚以清燉雞為主，在日本殖民統治時期，朝鮮半島的富裕階層發明了在清燉雞湯上添撒人參粉的做法。現代的參雞湯最早出現於上世紀60年代，在70年代以後逐漸家喻戶曉。 "   
    let recommendText3 = "蒸蛋，又稱水蒸蛋、雞蛋羹 ，為韓國飪中常見的小菜。各地做法細節均有所不同，一般而言，蒸蛋應先將雞蛋打散成蛋液，加入調味料如鹽或醬油和飲用水一起攪勻蒸熟後，澆上熟油或蔥花即可。"
  return (
    <>  
            <div className="Coursedetail-recommend">
            <div className="Coursedetail-recommendLeft">
                    <img src={Food3} alt=""></img>
                    <div className="Coursedetail-recommendMask">
                        <div className="Coursedetail-recommendFlag"><p>日式料理</p></div>
                        <div className="Coursedetail-recommendTitle">難度:初階</div>
                        <div className="Coursedetail-recommendLine"></div>
                        <div className="Coursedetail-recommendName">如何開始料理</div>
                        <div className="Coursedetail-recommendInfo">{recommendText}{recommendText}</div>
                        <div className="Coursedetail-recommendInfo Coursedetail-recommendClick">點擊了解更多</div>
                    </div>
                </div>
                

                <div className="Coursedetail-recommendLeft">
                    <img src={Food1} alt=""></img>
                    <div className="Coursedetail-recommendMask">
                        <div className="Coursedetail-recommendFlag"><p>韓式料理</p></div>
                        <div className="Coursedetail-recommendTitle">難度:中階</div>
                        <div className="Coursedetail-recommendLine"></div>
                        <div className="Coursedetail-recommendName">流行韓國精緻料理</div>
                        <div className="Coursedetail-recommendInfo">{recommendText2}</div>
                        <div className="Coursedetail-recommendInfo Coursedetail-recommendClick">點擊了解更多</div>
                    </div>
                </div>
                <div className="Coursedetail-recommendLeft">
                    <img src={Food2} alt=""></img>
                    <div className="Coursedetail-recommendMask">
                        <div className="Coursedetail-recommendFlag"><p>日式料理</p></div>
                        <div className="Coursedetail-recommendTitle">難度:高階</div>
                        <div className="Coursedetail-recommendLine"></div>
                        <div className="Coursedetail-recommendName">高級日式料理</div>
                        <div className="Coursedetail-recommendInfo">{recommendText3}</div>
                        <div className="Coursedetail-recommendInfo Coursedetail-recommendClick">點擊了解更多</div>
                    </div>
                </div>
            </div>
    </>
         )
    
}

export default CourseRecommend
import React from 'react'
import Starbox from '../../components/images/starbox.png'
import Fullcolor from '../../components/images/fullcolor.png'
import Whitestar from '../../components/images/whitestar.png'

function CourseStar(props){
    let { percent, Score } = props;

    let wd = 0;
    let lists = [];
    for(let i = 1 ; i < 6 ; i++)
    {
        if(!Score){
            Score = 0; //修正Title可能是NaN的問題 11/30
        }
        if (i < Score){
            wd = 100
        }else if(Score+1>i){
             wd = (Score-(i-1))*100
        }    else (wd = 0)
             lists.push(<div className="Course-starGroup-container">
             <img className="Course-starGroup-container-star" src={Starbox} alt=""/>
             <img className="Course-starGroup-container-background" src={Whitestar} alt="" style={{width:100+"%"}}/>
             <img className="Course-starGroup-container-background" src={Fullcolor} alt="" style={{width:wd+"%"}}/>
             </div>)
            }   


  return (
    <>
    {console.log(Score)}
        <div className="Course-starGroup" title={"平均 "+Score+" 顆星"}>
                {lists}
                <p>({percent})</p>
        </div>
    </>
         )
    
}

export default CourseStar
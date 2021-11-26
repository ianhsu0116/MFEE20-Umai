import React, { useState , useEffect  } from "react";
import MultiLevelBreadcrumb from '../../components/MultiLevelBreadcrumb'
import ChefCard from '../../components/ChefCard'
import { IoMdArrowDropleft } from "react-icons/io"
import CourseCard from '../../components/CourseCard1'

import MemberService from "../../services/member.service";

const Chef = (props) => {

  const [active , SetActive] = useState(-1);

  //主廚JSON
  const [chefJSON , setChefJSON] = useState([{
    chef_introduction: null,
    first_name: null,
    id: null,
    last_name: null,
    member_category: null
  }]
  );
  //主廚數量
  const [chefCount , setChefCount] = useState();

  useEffect(async () => {
    try {
      let result = await MemberService.chefName();
      setChefJSON(result.data.chefs);
      setChefCount(result.data.chefs.length)
    } catch (error) {
      console.log(error);
    }
  }, []);

 const chefJson = []

  for( let j = 0  ; j < chefCount  ; j++)
  {
    chefJson.push(
      chefJSON[j].first_name + "" + chefJSON[j].last_name
    )}

  let liForLoop = [];

  for( let i = 0  ; i < chefCount  ; i++)
  {
    liForLoop.push(
      // eslint-disable-next-line eqeqeq
      <li className={active == i ? 'chef-li chef-liActive':"chef-li"} id={i} onClick={(e)=> {
        SetActive(e.target.id)
        console.log(chefJSON[i])
        }}>{chefJson[i]}<span className={active == i ? "chef-arrowActive":"chef-arrow"}><IoMdArrowDropleft /></span></li>
    )
  }


  return (
    <>
    {console.log(chefJSON)}
      <div className="chef-set">
      <div className="CourseBreadbox"><MultiLevelBreadcrumb /></div>
        <div className="chef-title">主廚殿堂</div>
        <div className="st-line"></div>
          <div className="chef-infomationBox">
            <ul className="chef-ul">
              {liForLoop}
            </ul>
              <div className="chef-cardAndCourseCard">
                <div className="chef-margin">
                  <ChefCard />
                </div> 
                <div className="chef-courseCardMargin">
                  {/* <CourseCard /> */}
                  {/* <CourseCard />
                  <CourseCard />
                  <CourseCard />
                  <CourseCard /> */}
                </div> 
              </div>   
          </div>
      </div>  
    </>
  );
};

export default Chef
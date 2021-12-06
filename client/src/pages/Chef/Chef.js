import React, { useState , useEffect  } from "react";
import MultiLevelBreadcrumb from '../../components/MultiLevelBreadcrumb'
import ChefCard from '../../components/ChefCard'
import { IoMdArrowDropleft } from "react-icons/io"
import { PUBLIC_URL } from "../../config/config";
import CourseCard from '../../components/CourseCard1'

import MemberService from "../../services/member.service";

const Chef = (props) => {
  const [active, SetActive] = useState(-1);

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
  // 設定哪個主廚被選
  const [chefSelect , setChefSelect] = useState();

  useEffect(async () => {
    try {
      let result = await MemberService.chefName();
      for(let i = 0 ; i < result.data.chefs.length ; i++){
         result.data.chefs[i].chef_introduction = JSON.parse(
        result.data.chefs[i].chef_introduction
      );
      console.log(result.data.chefs)
      }
      console.log(result.data.chefs)
      setChefJSON(result.data.chefs);
      setChefCount(result.data.chefs.length)
      console.log(result.data)
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(async() => {
    try {
      let result = await MemberService.chefCourse(chefSelect?.id);
      console.log(123)
    } catch (error) {
      console.log(error);
    }
  }, [chefSelect]);

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
        setChefSelect(chefJSON[i])
        }}>{chefJson[i]}<span className={active == i ? "chef-arrowActive":"chef-arrow"}><IoMdArrowDropleft /></span></li>
    )
  }


  return (
    <>
    {console.log(chefSelect?.id)}
      <div className="chef-set">
        <div className="CourseBreadbox">
          <MultiLevelBreadcrumb />
        </div>
        <div className="chef-title">主廚殿堂</div>
        <div className="st-line"></div>
          <div className="chef-infomationBox">
            <ul className="chef-ul">
              {liForLoop}
            </ul>
              <div className="chef-cardAndCourseCard">
                <div className="chef-margin">
                  <ChefCard  
                    chefIntroduce1={
                      chefSelect?.chef_introduction.chefIntroduce1}
                    chefInfoTitle={chefSelect?.chef_introduction.chefInfoTitle}
                    chefInfo={chefSelect?.chef_introduction.chefInfo}
                    chefFirstName={chefSelect?.chef_introduction.first_name}
                    chefLastName={chefSelect?.chef_introduction.last_name}
                    avatar={`${PUBLIC_URL}/upload-images/${chefSelect?.avatar}`}
                  />
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

export default Chef;

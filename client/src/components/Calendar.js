import React, { useState } from "react";

const Calendar = () => {
  let today = new Date(); // 獲取當前日期
  let todayYear = today.getFullYear(); // 獲取當前的年份
  let todayMonth = today.getMonth(); // 獲取當前的月份(月份是從0開始計算，獲取的值比正常月份的值少1)
  let todayDay = today.getDate(); // 獲取日期中的日(方便在建立日期表格時高亮顯示當天)

  // 想顯示所有年 / 月份 / 星期幾
  let [years, setYears] = useState([2018, 2019, 2020, 2021, 2022, 2023]);
  let [month, setMonth] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  let weekdays = ["日", "一", "二", "三", "四", "五", "六"];

  // 預設的年份
  let [currentYear, setCurrentYear] = useState(todayYear);
  // 預設的月份
  let [currentMonth, setCurrentMonth] = useState(todayMonth);

  // 判斷是否為閏年
  function isLeap(year) {
    return year % 4 === 0
      ? year % 100 !== 0
        ? 1
        : year % 400 === 0
        ? 1
        : 0
      : 0;
  }

  let firstday = new Date(currentYear, currentMonth, 1); //獲取當月的第一天
  let dayOfWeek = firstday.getDay(); //判斷第一天是星期幾([0-6]中的一個，0代表星期天，1代表星期一)
  let days_per_month = [
    31,
    28 + isLeap(currentYear),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ]; //建立月份陣列

  //確定日期表格所需的行數
  let str_nums = Math.ceil((dayOfWeek + days_per_month[currentMonth]) / 7);
  // 將行數轉換成等長的Array，使下方能用使用map將其展開
  str_nums = new Array(str_nums).fill(1);

  return (
    <div className="Calender">
      <div className="Calender-header">
        <select
          name=""
          id=""
          className="year-selector"
          value={currentYear}
          onChange={(e) => {
            setCurrentYear(e.target.value);
          }}
        >
          {years &&
            years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
        </select>
        <select
          name=""
          id=""
          className="month-selector"
          value={currentMonth + 1}
          onChange={(e) => {
            setCurrentMonth(e.target.value - 1);
          }}
        >
          {month &&
            month.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
        </select>
      </div>
      <table className="Calender-table">
        <thead className="Calender-table-head">
          <tr className="Calender-table-tr">
            {weekdays.map((i) => (
              <th className="Calender-table-th">{i}</th>
            ))}
          </tr>
        </thead>
        <tbody className="Calender-table-body">
          {str_nums.map((days, i) => (
            <tr className="Calender-table-tr">
              {weekdays.map((day, k) => {
                let idx = 7 * i + k; //為每個表格建立索引,從0開始
                let date = idx - dayOfWeek + 1; //將當月的1號與星期進行匹配
                date <= 0 || date > days_per_month[currentMonth]
                  ? (date = " ") //索引小於等於0或者大於月份最大值就用空表格代替
                  : (date = idx - dayOfWeek + 1);
                if (
                  currentYear === todayYear &&
                  currentMonth === todayMonth &&
                  date === todayDay
                ) {
                  return <td className="Calender-table-td today">{date}</td>;
                } else {
                  return <td className="Calender-table-td">{date}</td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;

import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";

// 想顯示的所有年份 / 月份 / 星期幾
let years = [];
for (let i = 1990; i <= 2025; i++) {
  years.push(i);
}
let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let weekdays = ["日", "一", "二", "三", "四", "五", "六"];
let today = new Date(); // 獲取當前日期
let todayYear = today.getFullYear(); // 獲取當前的年份
let todayMonth = today.getMonth(); // 獲取當前的月份(月份是從0開始計算，獲取的值比正常月份的值少1)
let todayDay = today.getDate(); // 獲取日期中的日(方便在建立日期表格時高亮顯示當天)

// 必須傳入一組 名為onChange的 eventHandler, 會自動回傳選定的日期
const Calendar = (props) => {
  let { onChange } = props;

  let availableDays = ["2021-11-15", "2021-11-20", "2021-11-29"];

  // 日期窗開關
  let [calenderOpen, setCalenderOpen] = useState(false);
  // 預設的年份
  let [currentYear, setCurrentYear] = useState(todayYear); //todayYear);
  // 預設的月份
  let [currentMonth, setCurrentMonth] = useState(todayMonth); //todayMonth);
  // 預設的日期
  let [currentDay, setCurrentDay] = useState(todayDay); //todayDay);
  // 正確格式的日期
  let selectedDay = `${currentYear}-${currentMonth <= 9 ? "0" : ""}${
    currentMonth + 1
  }-${currentDay <= 9 ? "0" : ""}${currentDay}`;

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

  //獲取當月的第一天
  let firstday = new Date(currentYear, currentMonth, 1);
  //判斷第一天是星期幾([0-6]中的一個，0代表星期天，1代表星期一)
  let dayOfWeek = firstday.getDay();
  //建立月份陣列
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
  ];

  //確定日期表格所需的行數
  let str_nums = Math.ceil((dayOfWeek + days_per_month[currentMonth]) / 7);
  // 將行數轉換成等長的Array，使下方能用使用map將其展開
  str_nums = new Array(str_nums).fill(1);

  // 控制日期窗開關
  const handleCalenderOpen = (e) => {
    e.stopPropagation();
    calenderOpen ? setCalenderOpen(false) : setCalenderOpen(true);
  };
  // 點擊空白處關閉日期窗
  window.addEventListener("click", (e) => {
    setCalenderOpen(false);
  });

  // 選取日期
  const handleDaySelect = (e) => {
    //先判斷此次點擊的是否為有效日期
    if (Number(e.target.innerText) > 0) {
      setCurrentDay(e.target.innerText);

      // 關閉日期窗
      setCalenderOpen(false);
    }
  };

  // 將選定的日期送出
  useEffect(() => {
    onChange(selectedDay);
  }, [currentYear]);
  useEffect(() => {
    onChange(selectedDay);
  }, [currentMonth]);
  useEffect(() => {
    onChange(selectedDay);
  }, [currentDay]);

  return (
    <div className="Calender">
      <div className="Calender-selector" onClick={handleCalenderOpen}>
        <FcCalendar />
        <span className="Calender-selector-text">
          {currentYear} - {currentMonth <= 9 ? "0" : ""}
          {currentMonth + 1} - {currentDay <= 9 ? "0" : ""}
          {currentDay}
        </span>
        <MdKeyboardArrowDown />
      </div>
      {calenderOpen && (
        <div
          className="Calender-container"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="Calender-header">
            <select
              name=""
              id=""
              className="year-selector"
              value={currentYear}
              onChange={(e) => {
                setCurrentYear(Number(e.target.value));
              }}
            >
              {years &&
                years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
            </select>
            -
            <select
              name=""
              id=""
              className="month-selector"
              value={currentMonth + 1}
              onChange={(e) => {
                setCurrentMonth(Number(e.target.value) - 1);
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
                {weekdays.map((i, index) => (
                  <th key={index} className="Calender-table-th">
                    {i}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="Calender-table-body">
              {str_nums.map((days, i) => (
                <tr key={i} className="Calender-table-tr">
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
                      return (
                        <td
                          key={k}
                          className="Calender-table-td today"
                          onClick={handleDaySelect}
                        >
                          {date}
                        </td>
                      );
                    } else if (date == currentDay) {
                      return (
                        <td
                          key={k}
                          className="Calender-table-td active"
                          onClick={handleDaySelect}
                        >
                          {date}
                        </td>
                      );
                    } else {
                      return (
                        <td
                          key={k}
                          className="Calender-table-td"
                          onClick={handleDaySelect}
                        >
                          {date}
                        </td>
                      );
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Calendar;

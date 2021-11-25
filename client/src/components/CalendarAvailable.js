import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiClock } from "react-icons/hi";

// 想顯示的所有年份 / 月份 / 星期幾
let years = [];
for (let i = 2020; i <= 2022; i++) {
  years.push(i);
}
let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let weekdays = ["日", "一", "二", "三", "四", "五", "六"];
let today = new Date(); // 獲取當前日期
let todayYear = today.getFullYear(); // 獲取當前的年份
let todayMonth = today.getMonth(); // 獲取當前的月份(月份是從0開始計算，獲取的值比正常月份的值少1)
let todayDay = today.getDate(); // 獲取日期中的日(方便在建立日期表格時高亮顯示當天)

// 必須傳入一組 名為onChange的 eventHandler, 會自動回傳選定的日期
// 需傳入 setIsCalendarOpen 函式，會自動回傳當前日曆的啟閉狀態
const CalendarAvailable = (props) => {
  const { onChange, availableDays, setIsCalendarOpen } = props;

  // 判斷是否為初次渲染
  const [firstRender, setFirstRender] = useState(true);
  // 日期窗開關
  const [calendarOpen, setCalendarOpen] = useState(false);
  // 預設的年份
  const [currentYear, setCurrentYear] = useState(todayYear);
  // 預設的月份
  const [currentMonth, setCurrentMonth] = useState(todayMonth);
  // 預設的日期
  const [currentDay, setCurrentDay] = useState(todayDay);
  // 已選定的日期
  const [selectedDay, setSelectedDay] = useState("");

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
  const handleCalendarOpen = (e) => {
    e.stopPropagation();
    calendarOpen ? setCalendarOpen(false) : setCalendarOpen(true);
  };
  // 點擊空白處關閉日期窗
  window.addEventListener("click", (e) => {
    setCalendarOpen(false);
  });

  // 選取日期
  const handleDaySelect = (e) => {
    //先判斷此次點擊的是否為有效日期
    if (Number(e.target.innerText) > 0) {
      setCurrentDay(e.target.innerText);

      // 關閉日期窗
      setCalendarOpen(false);
    }
  };

  // 點擊disabled的日期時
  const handleDisabled = (e) => {
    console.log("不能選取歐歐歐歐歐！");
  };

  // 將選定的日期裝入selectedDay
  useEffect(() => {
    if (!firstRender) {
      setSelectedDay(
        `${currentYear}-${currentMonth <= 8 ? "0" : ""}${currentMonth + 1}-${
          currentDay <= 9 ? "0" : ""
        }${currentDay}`
      );
    }
  }, [currentDay]);
  //給詳細頁面Map抓開關
  useEffect(() => {
    setIsCalendarOpen(calendarOpen);
  }, [calendarOpen]);

  // 將選定的日期送出
  useEffect(() => {
    // 初次渲染時，將其設定成false
    setFirstRender(false);

    // 送出已選定的日期
    if (!firstRender) {
      onChange(selectedDay);
    }
  }, [selectedDay]);

  // 回傳當前日曆的開啟關閉狀態
  useEffect(() => {
    setIsCalendarOpen(calendarOpen);
  }, [calendarOpen]);

  return (
    <div className="CalendarAvailable">
      <div className="CalendarAvailable-selector" onClick={handleCalendarOpen}>
        <HiClock />
        {selectedDay && (
          <span className="CalendarAvailable-selector-text">已選擇</span>
        )}
        {!selectedDay && (
          <span className="CalendarAvailable-selector-text">日期</span>
        )}

        <MdKeyboardArrowDown />
      </div>
      {calendarOpen && (
        <div
          className="CalendarAvailable-container"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="CalendarAvailable-header">
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
          <table className="CalendarAvailable-table">
            <thead className="CalendarAvailable-table-head">
              <tr className="CalendarAvailable-table-tr">
                {weekdays.map((i, index) => (
                  <th key={index} className="CalendarAvailable-table-th">
                    {i}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="CalendarAvailable-table-body">
              {str_nums.map((days, i) => (
                <tr key={i} className="CalendarAvailable-table-tr">
                  {weekdays.map((day, k) => {
                    let disabled = true; // 判斷是否要disabled

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
                          className="CalendarAvailable-table-td today disabled"
                          onClick={handleDisabled}
                        >
                          {date}
                        </td>
                      );
                    } else if (
                      date == currentDay &&
                      currentMonth === Number(selectedDay.slice(5, 7)) - 1 &&
                      currentYear == selectedDay.slice(0, 4)
                    ) {
                      return (
                        <td
                          key={k}
                          className="CalendarAvailable-table-td active"
                          onClick={handleDaySelect}
                        >
                          {date}
                        </td>
                      );
                    } else {
                      // 這裡判斷的是 如果日期 == available(可預訂)的話就亮起來, 其餘的話disabled
                      return (
                        <td
                          key={k}
                          className={`CalendarAvailable-table-td ${availableDays.map(
                            (item, index) => {
                              if (
                                item.slice(0, 4) == currentYear &&
                                item.slice(5, 7) == Number(currentMonth) + 1 &&
                                item.slice(8, 10) == date
                              ) {
                                disabled = "";
                                return ` available `;
                              }
                            }
                          )} ${disabled && " disabled "}`}
                          onClick={disabled ? handleDisabled : handleDaySelect}
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

export default CalendarAvailable;

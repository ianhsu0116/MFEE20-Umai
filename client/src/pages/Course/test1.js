import { useState, useEffect } from 'react'

function ChildC(props) {
  // 子女C的內部資料
  const [childCData, setChildCData] = useState("日式料理")

  // 一開始呈現(render)就回送資料給父母
  // didMount階段
  useEffect(() => {
    props.setData(childCData)
  }, [])

  return (
    <>
    </>
  )
}

export default ChildC
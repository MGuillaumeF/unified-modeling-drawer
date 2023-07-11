import React, { useState } from 'react';
import style from './ClassObject.scss';
type Props = {}

// function getOnDrop (setState: React.Dispatch<React.SetStateAction<{
//   x: number;
//   y: number;
// }>>) : React.DragEventHandler<HTMLDivElement>{
//   return (event) : void => {
//     // alert(JSON.stringify({x : event.currentTarget.offsetLeft, y : event.currentTarget.offsetTop}))
//     // setState({x : event.currentTarget.offsetLeft, y : event.currentTarget.offsetTop})
//   }
// }
function getOnDragEnd (setState: React.Dispatch<React.SetStateAction<{
  x: number;
  y: number;
}>>, pos : {
  x: number;
  y: number;
}) :React.DragEventHandler<HTMLDivElement>{
  return (event) : void => {
    // const ev = {x : event.nativeEvent.clientX, y : event.nativeEvent.clientY}
    const ev = {x : event.nativeEvent.pageX - pos.x, y : event.nativeEvent.pageY - pos.y}
    // alert(JSON.stringify({event : "end", ...ev}))
    setState(ev)
  }
}

function getOnMouseDown(setState: React.Dispatch<React.SetStateAction<{
  x: number;
  y: number;
}>>) : React.MouseEventHandler<HTMLDivElement>{
  return (event) => {
    setState({x : event.nativeEvent.pageX - event.currentTarget.offsetLeft, y : event.nativeEvent.pageY - event.currentTarget.offsetTop})
  }
}


function getStyle(x : number, y : number) : {left : number, top : number } {
  return ({top : y, left : x})
}

function ClassObject({}: Props)  : JSX.Element{
  const [pos, setPos] = useState({x : 0, y : 0})
  const [state, setState] = useState({x : 0, y : 0})
  return (
    <div style={getStyle(state.x, state.y)} draggable="true" className={style.ClassObject} 
    // onDropCapture={getOnDrop(setState)}
    onMouseDown={getOnMouseDown(setPos)}
    onDragEnd={getOnDragEnd(setState, pos)}>ClassObject</div>
  )
}

export default ClassObject
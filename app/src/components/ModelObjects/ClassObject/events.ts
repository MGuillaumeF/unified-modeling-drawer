export function getOnDragEnd(
  setState: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >,
  pos: {
    x: number;
    y: number;
  },
  onMove?: (x: number, y: number) => void
): React.DragEventHandler<HTMLDivElement> {
  return (event): void => {
    // const ev = {x : event.nativeEvent.clientX, y : event.nativeEvent.clientY}
    const ev = {
      x: event.nativeEvent.pageX - pos.x,
      y: event.nativeEvent.pageY - pos.y
    };
    setState(ev);
    if (onMove) {
      onMove(ev.x, ev.y);
    }
  };
}

export function getOnMouseDown(
  setState: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >
): React.MouseEventHandler<HTMLDivElement> {
  return (event) => {
    setState({
      x: event.nativeEvent.pageX - event.currentTarget.offsetLeft,
      y: event.nativeEvent.pageY - event.currentTarget.offsetTop
    });
  };
}

export function getOnKeyUp(
  classObjectName: string,
  callDelete: (classObjectName: string) => void,
  callEdit: (classObjectName: string) => void
): React.KeyboardEventHandler<HTMLTableElement> {
  return (event: React.KeyboardEvent<HTMLTableElement>): void => {
    const code = event.nativeEvent.code.toUpperCase();
    if (code === "DELETE") {
      callDelete(classObjectName);
    } else if (event.nativeEvent.ctrlKey && code === "E") {
      callEdit(classObjectName);
    }
  };
}

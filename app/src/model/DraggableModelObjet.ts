import DataModelObject from "./DataModelObject";

export default class DraggableModelObjet extends DataModelObject {
  private _x = 0;
  private _y = 0;
  constructor() {
    super();
  }
  public get x(): number {
    return this._x;
  }
  public get y(): number {
    return this._y;
  }
}

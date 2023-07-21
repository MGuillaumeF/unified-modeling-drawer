import DraggableModelObjet from "./DraggableModelObjet";

export default class ClassModelObjet extends DraggableModelObjet {
  private _isAbstract = false;
  private _name: string;
  constructor(name: string) {
    super();
    this._name = name;
  }
}

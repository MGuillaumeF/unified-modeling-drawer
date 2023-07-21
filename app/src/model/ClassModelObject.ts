import AttributeModelObject from "./AttributeModelObject";
import DraggableModelObjet from "./DraggableModelObjet";

export default class ClassModelObjet extends DraggableModelObjet {
  private _isAbstract = false;
  private _name: string;
  private _attributes: AttributeModelObject[] = [];
  constructor(name: string) {
    super();
    this._name = name;
  }
  public get isAbstract(): boolean {
    return this._isAbstract;
  }
  public set isAbstract(isAbstract: boolean) {
    this._isAbstract = isAbstract;
  }
  public get attributes(): AttributeModelObject[] {
    return this._attributes;
  }
  public set attributes(_attributes: AttributeModelObject[]) {
    this._attributes = _attributes;
  }
  public get name(): string {
    return this._name;
  }
}

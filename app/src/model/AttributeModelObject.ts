import { Visibility } from "src/components/ModelObjects/AttributeObject/translator";

export default class AttributeModelObject {
  private _name: string;
  private _type: string;
  private _visibility: Visibility;
  constructor(name: string, type: string, visibility: Visibility) {
    this._name = name;
    this._type = type;
    this._visibility = visibility;
  }
  public get type(): string {
    return this._type;
  }
  public get visibility(): Visibility {
    return this._visibility;
  }
  public get name(): string {
    return this._name;
  }
}

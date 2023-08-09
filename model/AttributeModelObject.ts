export type Visibility = "private" | "protected" | "public";

export interface IAttributeModelObject {
  name: string;
  type: string;
  visibility: Visibility;
}
export default class AttributeModelObject {
  private _name: string;
  private _type: string;
  private _visibility: Visibility;

  constructor(params: IAttributeModelObject) {
    this._name = params.name;
    this._type = params.type;
    this._visibility = params.visibility;
  }
  public get type(): string {
    return this._type;
  }
  public set type(type: string) {
    this._type = type;
  }
  public get visibility(): Visibility {
    return this._visibility;
  }
  public set visibility(visibility: Visibility) {
    this._visibility = visibility;
  }
  public get name(): string {
    return this._name;
  }
  public set name(name: string) {
    this._name = name;
  }

  public toObject(): IAttributeModelObject {
    return {
      name: this._name,
      type: this._type,
      visibility: this._visibility
    };
  }
  public toPrint() {
    return {
      $: this.toObject()
    };
  }
}

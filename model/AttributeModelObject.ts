export type Visibility = "private" | "protected" | "public";

export interface IAttributeModelObject {
  name: string;
  type: string;
  mandatory: boolean;
  unique: boolean;
  visibility: Visibility;
}
export default class AttributeModelObject {
  protected _name: string;
  protected _type: string;
  protected _mandatory: boolean;
  protected _unique: boolean;
  protected _visibility: Visibility;

  constructor(params: IAttributeModelObject) {
    this._name = params.name;
    this._type = params.type;
    this._visibility = params.visibility;
    this._mandatory = params.mandatory;
    this._unique = params.unique;
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
  public get mandatory(): boolean {
    return this._mandatory;
  }
  public set mandatory(mandatory: boolean) {
    this._mandatory = mandatory;
  }
  public get unique(): boolean {
    return this._unique;
  }
  public set unique(unique: boolean) {
    this._unique = unique;
  }

  public toObject(): IAttributeModelObject {
    return {
      name: this._name,
      type: this._type,
      mandatory: this._mandatory,
      unique: this._unique,
      visibility: this._visibility
    };
  }
  public toPrint() {
    return {
      $: this.toObject()
    };
  }
}

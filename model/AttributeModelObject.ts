export type Visibility = "private" | "protected" | "public";

export interface IAttributeModelObject {
  name: string;
  type: string;
  mandatory: boolean;
  unique: boolean;
  visibility: Visibility;
  defaultValue?: string;
}
export interface IFileAttributeModelEntry {
  name: string;
  type: string;
  mandatory: "true" | "false";
  unique: "true" | "false";
  visibility: Visibility;
  default_value?: string;
}

export default class AttributeModelObject {
  protected _name: string;
  protected _type: string;
  protected _mandatory: boolean;
  protected _unique: boolean;
  protected _visibility: Visibility;
  protected _defaultValue?: string;

  constructor(params: IAttributeModelObject) {
    this._name = params.name;
    this._type = params.type;
    this._visibility = params.visibility;
    this._mandatory = params.mandatory;
    this._unique = params.unique;
    this._defaultValue = params.defaultValue;
  }
  public get defaultValue(): string | undefined {
    return this._defaultValue;
  }
  public set defaultValue(defaultValue: string) {
    this._defaultValue = defaultValue;
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
    const obj: IAttributeModelObject = {
      name: this._name,
      type: this._type,
      mandatory: this._mandatory,
      unique: this._unique,
      visibility: this._visibility
    };
    if (this._defaultValue !== undefined) {
      obj.defaultValue = this._defaultValue;
    }
    return obj;
  }
  public toPrint(): { $: IFileAttributeModelEntry } {
    const { defaultValue, mandatory, unique, ...raw } = this.toObject();
    let mapped: { $: IFileAttributeModelEntry } = {
      $: {
        ...raw,
        mandatory: mandatory ? "true" : "false",
        unique: unique ? "true" : "false"
      }
    };
    if (defaultValue !== undefined) {
      mapped.$.default_value = defaultValue;
    }
    return mapped;
  }
  public static parse = (entry: {
    $: IFileAttributeModelEntry;
  }): IAttributeModelObject => {
    const { $ } = entry;
    return {
      name: $.name,
      type: $.type,
      mandatory: $.mandatory === "true",
      unique: $.unique === "true",
      visibility: $.visibility,
      defaultValue: $.default_value
    };
  };
}

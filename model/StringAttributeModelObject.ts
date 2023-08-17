import AttributeModelObject, {
  IAttributeModelObject
} from "./AttributeModelObject";

export interface IStringAttributeModelObject extends IAttributeModelObject {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}
export default class StringAttributeModelObject extends AttributeModelObject {
  private _parentToObject: () => IAttributeModelObject;
  private _parentToPrint: () => {
    $: IAttributeModelObject;
  };
  protected _minLength?: number;
  protected _maxLength?: number;
  protected _pattern?: RegExp;

  constructor(params: IStringAttributeModelObject) {
    super(params);
    this._parentToObject = super.toObject;
    this._parentToPrint = super.toPrint;
    this._minLength = params.minLength;
    this._maxLength = params.maxLength;
    this._pattern = params.pattern;
  }
  public get minLength(): number | undefined {
    return this._minLength;
  }
  public set minLength(minLength: number) {
    this._minLength = minLength;
  }
  public get maxLength(): number | undefined {
    return this.maxLength;
  }
  public set maxLength(maxLength: number) {
    this._maxLength = maxLength;
  }
  public get pattern(): RegExp | undefined {
    return this._pattern;
  }
  public set pattern(pattern: RegExp) {
    this._pattern = pattern;
  }

  public toObject(): IStringAttributeModelObject {
    const obj: IStringAttributeModelObject = {
      ...this._parentToObject()
    };
    const mappy: Array<
      [
        keyof Pick<IStringAttributeModelObject, "minLength" | "maxLength">,
        number | undefined
      ]
    > = [
      ["minLength", this._minLength],
      ["maxLength", this._maxLength]
    ];
    if (this._pattern !== undefined) {
      obj.pattern = this._pattern;
    }

    Object.values(mappy).forEach(([key, value]) => {
      if (value !== undefined) {
        obj[key] = value;
      }
    });
    return obj;
  }
  public toPrint() {
    return {
      $: {
        ...this._parentToPrint().$,
        min_length: this._minLength,
        max_length: this._maxLength,
        pattern: this._pattern ? String(this._pattern) : undefined
      }
    };
  }
}

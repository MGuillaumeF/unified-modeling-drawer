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
  private _parentToPrint: () => any;
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
    return {
      ...this._parentToObject(),
      minLength: this._minLength,
      maxLength: this._maxLength,
      pattern: this._pattern
    };
  }
  public toPrint() {
    return {
      $: {
        ...this._parentToPrint().$,
        ...this.toObject(),
        pattern: this._pattern ? String(this._pattern) : undefined
      }
    };
  }
}

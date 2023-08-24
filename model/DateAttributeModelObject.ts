import AttributeModelObject, {
  IAttributeModelObject,
  IFileAttributeModelEntry
} from "./AttributeModelObject";

export interface IDateAttributeModelObject extends IAttributeModelObject {
  min?: Date;
  max?: Date;
}

export interface IFileDateAttributeModelEntry extends IFileAttributeModelEntry {
  min?: number;
  max?: number;
}
export default class DateAttributeModelObject extends AttributeModelObject {
  private _parentToObject: () => IAttributeModelObject;
  private _parentToPrint: () => {
    $: IFileAttributeModelEntry;
  };
  protected _min?: Date;
  protected _max?: Date;

  constructor(params: IDateAttributeModelObject) {
    super(params);
    this._parentToObject = super.toObject;
    this._parentToPrint = super.toPrint;
    this._min = params.min;
    this._max = params.max;
  }
  public get min(): Date | undefined {
    return this._min;
  }
  public set min(min: Date) {
    this._min = min;
  }
  public get max(): Date | undefined {
    return this.max;
  }
  public set max(max: Date) {
    this._max = max;
  }

  public toObject(): IDateAttributeModelObject {
    return {
      ...this._parentToObject(),
      min: this._min,
      max: this._max
    };
  }

  public toPrint(): { $: IFileDateAttributeModelEntry } {
    let mapped: { $: IFileDateAttributeModelEntry } = {
      $: {
        ...this._parentToPrint().$
      }
    };
    if (this._min !== undefined) {
      mapped.$.min = this._min.getTime();
    }
    if (this._max !== undefined) {
      mapped.$.max = this._max.getTime();
    }
    return mapped;
  }

  public static parse = (entry: {
    $: IFileDateAttributeModelEntry;
  }): IDateAttributeModelObject => {
    const { $ } = entry;
    const mapped: IDateAttributeModelObject = AttributeModelObject.parse(entry);
    if ($.min !== undefined) {
      mapped.min = new Date($.min);
    }
    if ($.max !== undefined) {
      mapped.max = new Date($.max);
    }
    return mapped;
  };
}

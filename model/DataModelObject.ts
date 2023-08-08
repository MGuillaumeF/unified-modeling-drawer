export default class DataModelObject {
  private static _id_index = 0;
  protected _id: number;
  private static auto_id(): number {
    DataModelObject._id_index++;
    return DataModelObject._id_index;
  }
  constructor() {
    this._id = DataModelObject.auto_id();
  }
  public get id(): number {
    return this._id;
  }
}

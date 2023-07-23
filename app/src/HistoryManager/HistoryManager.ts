import DataModelObject from "../.model/DataModelObject";
import Action from "./Action";

export default class HistoryManager<T extends DataModelObject> {
  private _saveCursor = 0;
  private _historyCursor = 0;
  private _history: Action<T>[] = [];
  public add = (action: Action<T>): void => {
    this._history = this._history.slice(0, this._historyCursor);
    this._historyCursor++;
    this._history.push(action);
  };
  public undo = (): void => {
    if (this._historyCursor !== 0) {
      const revert = this._history.at(this._historyCursor);
      this._historyCursor--;
      console.log(revert);
    }
  };
  public redo = (): void => {
    if (this._historyCursor !== this._history.length) {
      this._historyCursor++;
      const reapply = this._history.at(this._historyCursor);
      console.log(reapply);
    }
  };
  public save = (): void => {
    this._saveCursor = this._historyCursor;
  };
}

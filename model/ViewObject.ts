import DiagramObject, {
  Card,
  IDiagramObject,
  IFileDiagramEntry
} from "./DiagramObject";

export interface IViewObject {
  diagramObjects: IDiagramObject[];
}

export default class ViewObject {
  private _diagrams: DiagramObject[] = [];
  constructor(params: IViewObject) {
    this._diagrams = params.diagramObjects.map(
      (diagramObject: IDiagramObject) => new DiagramObject(diagramObject)
    );
  }
  public get diagrams(): DiagramObject[] {
    return this._diagrams;
  }
  public set diagrams(value: DiagramObject[]) {
    this._diagrams = value;
  }
  public toObject(): IViewObject {
    return {
      diagramObjects: this._diagrams.map(
        (diagramObject: DiagramObject): IDiagramObject =>
          diagramObject.toObject()
      )
    };
  }
  public toPrint(): { $: IFileViewEntry } {
    return {
      $: {
        diagram: this._diagrams.map((diagramObject: DiagramObject) =>
          diagramObject.toPrint()
        )
      }
    };
  }
  public static parse = (entry: IFileViewEntry): IViewObject => {
    const viewObject: IViewObject = {
      diagramObjects: entry.diagram.map(
        (diagramItem: {
          $: IFileDiagramEntry;
          card: Array<{ $: Card }>;
        }): IDiagramObject => DiagramObject.parse(diagramItem)
      )
    };
    return viewObject;
  };
}

export interface IFileViewEntry {
  diagram: Array<{ $: IFileDiagramEntry; card: Array<{ $: Card }> }>;
}

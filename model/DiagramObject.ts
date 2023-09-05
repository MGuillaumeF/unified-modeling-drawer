export interface Card {
  name: string;
  x: number;
  y: number;
  type: "class";
}

export interface IDiagramObject {
  name: string;
  type: "class-diagram";
  cards: Card[];
}

export default class DiagramObject {
  private _name: string;
  private _type: "class-diagram";
  private _cards: Card[];
  constructor(params: IDiagramObject) {
    this._name = params.name;
    this._type = params.type;
    this._cards = params.cards;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get type(): "class-diagram" {
    return this._type;
  }
  public set type(type: "class-diagram") {
    this._type = type;
  }
  public get cards(): Card[] {
    return this._cards;
  }
  public set cards(cards: Card[]) {
    this._cards = cards;
  }
  public toObject(): IDiagramObject {
    return {
      name: this._name,
      type: this._type,
      cards: this._cards
    };
  }
  public toPrint(): { $: IFileDiagramEntry; card: Array<{ $: Card }> } {
    return {
      $: {
        name: this._name,
        type: this._type
      },
      card: this._cards.map((card: Card): { $: Card } => ({ $: { ...card } }))
    };
  }
  public static parse = (entry: {
    $: IFileDiagramEntry;
    card: Array<{ $: Card }>;
  }): IDiagramObject => {
    const diagramObject: IDiagramObject = {
      name: entry.$.name,
      type: "class-diagram",
      cards: entry.card.map(
        (cardItem: { $: Card }): Card => ({ ...cardItem.$ })
      )
    };
    return diagramObject;
  };
}

export interface IFileDiagramEntry {
  name: string;
  type: string;
}

export class OsloItem {
  public id: string;
  public name: string;
  public context: string;
  public definition: string;

  public constructor(id: string, name: string, context: string, definition: string) {
    this.id = id;
    this.name = name;
    this.context = context;
    this.definition = definition;
  }
}
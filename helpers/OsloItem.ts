export class OsloItem {
  public objectIdentifier: string;  // Identifier of the object in backend
  public id: string;
  public name: string;
  public context: string;
  public definition: string;

  public constructor(objectIdentifier: string, id: string, name: string, context: string, definition: string) {
    this.objectIdentifier = objectIdentifier;
    this.id = id;
    this.name = name;
    this.context = context;
    this.definition = definition;
  }
}
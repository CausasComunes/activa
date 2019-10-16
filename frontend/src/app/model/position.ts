export class Position {
  public id: Number;
  public name: string;

  public static asignProps(p1: Position, p2: Position) {
    p1.id = p2.id;
    p1.name = p2.name;
  }

  public asignProps(p: Position) {
    Position.asignProps(this, p);
  }
}

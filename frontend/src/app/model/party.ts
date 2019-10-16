export class Party {
  public id: Number;
  public name: string;

  public static asignProps(p1: Party, p2: Party) {
    p1.id = p2.id;
    p1.name = p2.name;
  }

  public asignProps(p: Party) {
    Party.asignProps(this, p);
  }
}

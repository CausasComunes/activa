
export class District {

    public hasc: string;
    public name: string;

    public static asignProps(d1: District, d2: District) {
        d1.hasc = d2.hasc;
        d1.name = d2.name;
    }

    public asignProps(d: District) {
        District.asignProps(this, d);
    }

}

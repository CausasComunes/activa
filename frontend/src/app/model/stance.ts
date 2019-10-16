import { Tweet } from './tweet';

export class Stance {
    public id: Number;
    public politician: Number;
    public project_id: Number;
    public name: string;
    public color: string;
    public value: Number;
    public tweets = new Array<Tweet>();

    public static asignProps(s1: Stance, s2: Stance) {
        s1.id = s2.id;
        s1.politician = s2.politician;
        s1.project_id = s2.project_id;
        s1.name = s2.name;
        s1.color = s2.color;
        s1.value = s2.value;
        s1.tweets = s2.tweets;
    }

    public static getNew() {
        return new Stance();
    }

    public asignProps(s: Stance) {
        Stance.asignProps(this, s);
    }

}

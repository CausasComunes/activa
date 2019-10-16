import { Party } from './party';
import { Stance } from './stance';
import { District } from './district';
import { Position } from './position';

export class Politician {

    public id: Number;
    public first_name: string;
    public last_name: string;
    public position = new Position();
    public marital_status: string;
    public instagram: string;
    public facebook: string;
    public twitter: string;
    public phone: string;
    public birthday: Date = new Date();
    public gender: Number;
    public image: string;
    public dir: string;

    public party = new Party();
    public district = new District();
    public stances = new Array<Stance>();

    public static asignProps(p1: Politician, p2: Politician) {
      p1.id = p2.id;
      p1.first_name = p2.first_name;
      p1.last_name = p2.last_name;
      p1.district = p2.district as District;
      p1.party = p2.party as Party;
      p1.marital_status = p2.marital_status;
      p1.twitter = p2.twitter;
      p1.phone = p2.phone;
      p1.birthday = p2.birthday as Date;
      p1.gender = p2.gender;
      p1.image = (!p2.image || /^\s*$/.test(p2.image)) ? 'person-placeholder.png' : p2.image;
      p1.dir = (!p2.image || /^\s*$/.test(p2.image)) ? '/img/placeholders/personas' : p2.dir;
      p1.position = p2.position as Position;
      p1.facebook = p2.facebook;
      p1.instagram = p2.instagram;
      p1.stances = p2.stances as Array<Stance>;
    }

    public asignProps(p: Politician) {
      Politician.asignProps(this, p);
    }

}

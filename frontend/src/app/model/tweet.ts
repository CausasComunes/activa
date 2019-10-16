export class Tweet {

    public id: Number;
    public tweet: string;
    public project_id: Number;
    public stance_id: Number;

    public static asignProps(t1: Tweet, t2: Tweet) {
        t1.id = t2.id;
        t1.tweet = t2.tweet;
        t1.project_id = t2.project_id;
        t1.stance_id = t2.stance_id;
    }

    public static getNew() {
        return new Tweet();
    }

    public constructor(stance_id?: Number) {
        this.stance_id = stance_id;
    }

    public asignProps(t: Tweet) {
        Tweet.asignProps(this, t);
    }

}

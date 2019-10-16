export class Video {
    public id: number;
    public project: string;
    public name: string;
    public url: string;
    public thumb: string;

    public static asignProps(v1: Video, v2: Video) {
        v1.id = v2.id;
        v1.project = v2.project;
        v1.name = v2.name;
        v1.url = v2.url;
        v1.thumb = v2.thumb;
    }

    public static getNew() {
        return new Video();
    }

    public asignProps(v: Video) {
        Video.asignProps(this, v);
    }

}

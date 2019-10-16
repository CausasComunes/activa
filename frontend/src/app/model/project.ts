import { Video } from './video';
import { Stance } from './stance';

export class Project {

    public id: Number;
    public name: string;
    public slug: string;
    public text: string;
    public short_text: string;
    public slider_text: string;
    public highlighted = 0;
    public tally = 0;
    public show_tally = 0;
    public show_videos = 0;
    public show_text = 0;
    public image: string;
    public dir: string;
    public cover_image: string;
    public c_dir: string;
    public primary_color = '#009295';
    public secondary_color = '#44235a';
    public stances = new Array<Stance>();
    public videos = new Array<Video>();
    public es_debate: boolean;

    public static asignProps(p1: Project, p2: Project) {
        p1.id = p2.id;
        p1.name = p2.name;
        p1.slug = p2.slug;
        p1.text = p2.text;
        p1.short_text = p2.short_text;
        p1.slider_text = p2.slider_text;
        p1.highlighted = p2.highlighted;
        p1.tally = p2.tally;
        p1.show_tally = p2.show_tally;
        p1.show_videos = p2.show_videos;
        p1.show_text = p2.show_text;
        p1.image = (!p2.image || /^\s*$/.test(p2.image)) ? 'card-placeholder.png' : p2.image;
        p1.dir = (!p2.image || /^\s*$/.test(p2.image)) ? '/img/placeholders/proyectos' : p2.dir;
        p1.cover_image = (!p2.cover_image || /^\s*$/.test(p2.cover_image)) ? '' : p2.cover_image;
        p1.c_dir = (!p2.cover_image || /^\s*$/.test(p2.cover_image)) ? '' : p2.c_dir;
        p1.primary_color = p2.primary_color;
        p1.secondary_color = p2.secondary_color;
        p1.stances = p2.stances as Array<Stance>;
        p1.videos = p2.videos as Array<Video>;
      
        let debatePrefijo = 'debate-'
        p1.es_debate = p2.slug.substring(0, debatePrefijo.length) === debatePrefijo;
    }

    public asignProps(p: Project) {
        Project.asignProps(this, p);
    }


}

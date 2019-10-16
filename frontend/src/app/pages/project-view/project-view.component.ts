import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../model/project';
import { ProjectService } from '../../services/project.service';
import { Politician } from '../../model/politician';
import { PoliticianService } from '../../services/politician.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'project-view',
    templateUrl: './project-view.component.html',
    styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

    public currentProject: Project = new Project();
    public projectDescription: SafeHtml;
    public politiciansList = new Array<Politician>();
    public politiciansListSlider = new Array<Politician>();
  
    public propuestasResumen: String;
    public propuestas: Array<Array<String>>;
    public changeText: String;
    public changeLink: String;
    public propuestaLink: String;

    public sanitizeHtml(html: string): any {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    constructor(private route: ActivatedRoute,
        private projectService: ProjectService,
        private politicianService: PoliticianService,
        public sanitizer: DomSanitizer) {
    }

    public ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.projectService
                .getById(params['params']['id'])
                .then(p => {
                    this.currentProject = p;
                    /*const text = 'header {background-image: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(' +
                        environment.imgBase + p.c_dir.replace(/\\/g, '/') + '/cover-' + p.cover_image +
                        '); background-size: cover;background-color: #' + p.secondary_color +
                        '!important;}.contact-button {border-color: #' + p.primary_color + '!important;color: #' +
                        p.primary_color + '!important;}.contact-button:hover {color: #fff!important; background-color: #' +
                        p.primary_color + '!important;}.indicator-icon {background-color: #' + p.primary_color +
                        '!important;}.btn-primary.btn-aec {background-color: #' + p.primary_color +
                        '!important;}.separador {border-top: solid 9px #' + p.secondary_color +
                        '!important;border-bottom: solid 7px #' + p.primary_color +
                        '!important;}.underline:after {background: #' + p.secondary_color +
                        '!important;}.bg-verde {background-color: #' + p.primary_color +
                        '!important;}.bg-violeta {background-color: #' + p.secondary_color +
                        '!important;}.follow-btn:hover,.follor-btn:focus {color: #' + p.primary_color +
                        '!important;}.follow-strip {background-color: #' + p.primary_color +
                        '!important;}.news-input {background-color: #' + p.primary_color +
                        '!important;}.btn-white {color: #' + p.primary_color + '!important;}';
                    if ($('#project-styles').data('project') !== p.name) {
                        $('#project-styles').html(text).data('project', p.name);
                    }
                    if ($('#project-styles').length < 1) {
                        $('style').after('<style id=\'project-styles\'></style>');
                        $('#project-styles').html(text).data('project', p.name);
                    }*/
                    $('#newsletter_project').val(p.name).trigger('input').trigger('change');
                    this.projectDescription = this.sanitizeHtml(p.slider_text.replace(/(http.*)[ .]/, '<a href="$1" target="_blank" rel="noopener noreferrer">LINK</a> '));
                    this.politicianService
                        .getAllByProject(p.slug, true)
                        .then(response => {
                            this.politiciansList = response;
                            var rPoliticiansListSlider = [];
                            response.forEach(function(politician) {
                                if (politician.position.name == 'Presidente')
                                  rPoliticiansListSlider.push(politician)
                            });
                            this.politiciansListSlider = rPoliticiansListSlider;
                            //this.politiciansListSlider = response.slice(0, 20).sort(function() {return .5 - Math.random(); });
                        });
                    const element = document.querySelector('#activa');
                    element.scrollIntoView();

                    this.changeText = 'Podés apoyar esta propuesta, firmando en Change.org';

                    switch(p.slug.toLowerCase()){ 
                      case 'amnesty-asij-dej':
                        this.changeText = 'Podés apoyar esta propuesta, firmando en Amnistia.org.ar'
                        this.changeLink = 'https://amnistia.org.ar/derechosenjuego/petitorio'
                        break;
                      case 'vivienda':
                        this.changeLink = 'https://www.change.org/alquileresmasjustos'
                        this.propuestaLink = 'https://propuestas.causascomunes.org/articulado?id=5d7a9a8aee136700188ea5be'
                        this.propuestasResumen = 'Causas Comunes junto a Federación Nacional de Inquilinos y más organizaciones estamos desarrollando <strong><a target="_blank" rel="noopener noreferrer" href="https://propuestas.causascomunes.org/articulado?id=5d7a9a8aee136700188ea5be">un proyecto de ley</a></strong>, para presentar en el Congreso, que incluye los siguientes puntos:'
                        this.propuestas = [
                          ["Plazo mínimo", "El contrato de alquiler se extiende de 2 a 3 años de plazo mínimo."],
                          ["Actualización del precio", "Se establece que los aumentos sean anuales (no semestrales), ajustados a partir de un índice de actualización objetivo."],
                          ["Depósito", "Se reduce el depósito en garantía a un mes de alquiler, a devolverse en el momento de restitución del inmueble y con el monto actualizado al valor del último mes de alquiler."],
                          ["Registro de contratos", "El locador tiene la obligación de declarar el contrato ante el registro de la propiedad inmueble, para “blanquear” los contratos."],
                          ["Renovación del contrato", "Se obliga a acordar las condiciones de la renovación con tres meses de antelación al fin del contrato."],
                          ["Impuestos y expensas extraordinarias", "El inquilino no tendrá a su cargo el pago de las expensas comunes extraordinarias."],
                          ["Arreglos", "El proyecto establece de qué forma y en qué plazos deben las partes ante un problema que demande reparaciones en el inmueble."],
                          ["Resolución anticipada", "Se elimina el plazo mínimo de seis meses para rescindir el contrato, que se podrá rescindir en cualquier momento (pagando una multa)"],
                          ["Domicilio electrónico", "Las partes deben fijar un domicilio electrónico (mail) en el contrato de alquiler, para que todas las comunicaciones por ese medio sean válidas y vinculantes."],
                          ["Pagarés", "El proyecto prohíbe a los propietarios exigir la firma de pagarés a los inquilinos."],
                        ];
                        break;
                      case 'trabajo':
                        this.changeLink = 'https://www.change.org/derechoslaborales'
                        this.propuestaLink = 'https://propuestas.causascomunes.org/articulado?id=5d7a9b11ee136700188ea5c0'
                        this.propuestasResumen = 'Causas Comunes junto al <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/odiaasoc">Observatorio de Derechos de Internet en Argentina (O.D.I.A)</a> y más organizaciones estamos desarrollando <strong><a target="_blank" rel="noopener noreferrer" href="https://propuestas.causascomunes.org/articulado?id=5d7a9b11ee136700188ea5c0">un proyecto de ley</a></strong>, para presentar en el Congreso, que incluye los siguientes puntos:'
                        this.propuestas = [
                          ["Plataformas digitales de servicios (pds)", "En el proyecto, se definen legalmente como “personas jurídicas que ofrecen sus prestaciones a través de una infraestructura digital cuyo propósito es organizar y controlar, por medio de algoritmos, la realización de los servicios conectando a los trabajadores con los clientes que los solicitan”."],
                          ["Relación de dependencia", "Lxs trabajadorxs de plataformas no son “socios o colaboradores”, tampoco son “emprendedores”, son empleados en relación de dependencia que firman un contrato laboral."],
                          ["Jornada autónoma (flexibilidad horaria)", "Lxs trabajadorxs tienen libertad para escoger sus horarios y cantidad de trabajo. eso sí, la jornada no podrá exceder las 12 horas al día, ni tampoco las 45 horas a la semana."],
                          ["Control de la arbitrariedad", "Las pds deberán informar los criterios que la app utiliza para, entre otras cosas, asignar la prestación de un servicio, la forma de cálculo de la remuneración, el impacto que tienen las calificaciones que asignan."],
                          ["Jornada pasiva", "El tiempo en que el/la trabajador/a se encuentra a disposición del empleador, es decir, conectado a la aplicación sin realizar labores, por causas que no le sean imputables forma parte de su jornada … y se paga."],
                          ["Derecho a sindicalización", "Los trabajadores y trabajadoras de pds, tendrán el derecho de constituir las organizaciones sindicales que estimen convenientes."],
                          ["Derechos fundamentales", "Entre otros, lxs trabajadorxs tendrán derecho a accionar por despidos injustificados y auto despido. además, tendrán seguro de riesgo de trabajo."],
                        ];
                        break;
                      case 'drogas':
                        this.changeLink = ''
                        this.propuestaLink = 'https://propuestas.causascomunes.org/articulado?id=5d8a2a8cee136700188ea5e8'
                        this.propuestasResumen = 'Causas Comunes junto a las organizaciones que componen la <a target="_blank" rel="noopener noreferrer" href="http://regulacionlegal.org">Campaña Nacional por la Regulación del Cannabis</a> estamos desarrollando <strong><a target="_blank" rel="noopener noreferrer" href="https://propuestas.causascomunes.org/articulado?id=5d7a9bc8ee136700188ea5c4">un acuerdo</a></strong> que sirva de base para presentar, en el Congreso, un proyecto de ley que incluya los siguientes puntos:'
                        this.propuestas = [
                          ["Ordenar lo que hoy ya ocurre", "La propuesta de regulación legal se basa en el respeto por las libertades individuales y las prácticas culturales. se regula para minimizar las secuelas del narcotráfico y proteger la salud pública, no para promover el consumo."],
                          ["Regular para aumentar la responsabilidad", "El objetivo de la regulación es tanto el consumo responsable del cannabis como su acceso en condiciones de máxima reducción de riesgos y de daños."],
                          ["Regular la producción, distribución y comercialización", "La regulación busca ser estricta a la hora de evitar la publicidad y el lucro desmedido de nuevas corporaciones en torno al cannabis."],
                          ["Protección de formas cooperativas", "La regulación protege el autocultivo y los clubes sociales y otras formas cooperativas de producción de cannabis, en tanto prácticas amparadas por la constitución y equilibradoras del precio de mercado."],
                          ["No criminalizar la tenencia para consumo", "La regulación da estatus legal al “fallo arriola” de la corte suprema de justicia de la nación."],

                        ];
                        break;
                      case 'transparencia':
                        this.changeLink = 'https://www.change.org/leydelobby'
                        this.propuestaLink = 'https://propuestas.causascomunes.org/articulado?id=5d78f015ee136700188ea5bc'
                        this.propuestasResumen = 'Causas Comunes junto a <a target="_blank" rel="noopener noreferrer" href="https://directoriolegislativo.org/">Directorio Legislativo</a> y más organizaciones estamos desarrollando <strong><a target="_blank" rel="noopener noreferrer" href="https://propuestas.causascomunes.org/articulado?id=5d78f015ee136700188ea5bc">un proyecto de ley</a></strong>, para presentar en el Congreso, que incluye los siguientes puntos:'
                        this.propuestas = [
                          ["Transparencia en organismos públicos", "El objetivo primordial del proyecto es asegurar que las decisiones públicas se tomen de la forma más abierta posible."],
                          ["Registros digitales y de acceso público", "Los registros son actualizados una vez al mes, deben estar en formatos digitales de datos abiertos."],
                          ["Se crean registros de reuniones", "En ellos, lxs miembrxs de la administración pública tienen que declarar todas las audiencias y reuniones con personas que se dedican al lobby o a la gestión de intereses particulares. también tienen que declarar viajes y regalos (aunque sean protocolares)"],
                          ["Incluye funcionarixs de los 3 poderes", "Además, incluye a la defensoría del pueblo, a la auditoría general, al ministerio público, al consejo de la magistratura y a las empresas privadas con participación estatal mayoritaria."],
                          ["Sanciones para quienes mientan", "No declarar audiencias o reuniones u omitir detalles relevantes se considera una falta grave"],
                        ];
                        break;
                      case 'ambiente':
                        this.changeLink = 'https://www.change.org/agrotoxicos'
                        this.propuestaLink = 'https://propuestas.causascomunes.org/articulado?id=5d7a9b68ee136700188ea5c2'
                        this.propuestasResumen = 'Causas Comunes junto a distintxs activistas estamos desarrollando <strong><a target="_blank" rel="noopener noreferrer" href="https://propuestas.causascomunes.org/articulado?id=5d7a9b68ee136700188ea5c2">un proyecto de ley</a></strong> basado en uno del Senador Pino Solanas para presentar en el Congreso que incluye los siguientes puntos:'
                        this.propuestas = [
                          ["Áreas de protección ambiental", "Se prohíbe la aplicación de agroquímicos en áreas urbanas y a menos 1.500 metros de viviendas permanentes y escuelas rurales, entre otras formas de asentamientos humanos, y, también, de criaderos de animales, ríos, arroyos, lagunas, embalses, diques y pozos de agua."],
                          ["Delito ambiental", "La aplicación de agroquímicos dentro de las áreas de protección se tipifica como “daño ambiental” y su responsabilidad no sólo le cabe a quien lo aplica sino también a los productores o propietarios del suelo y a las autoridades políticas, si es que no se muestran diligentes a la hora de evitar que se viole esta ley."],
                          ["Lejos de niños, niñas y adolescentes", "Se prohibe la aplicación de agroquímicos y/o la manipulación de sus residuos en su presencia. también se restringe la posibilidad de encomendarles tareas que, en forma directa o indirecta, les vinculen con la manipulación de los mismos."],
                          ["Sanciones", "Para quienes incumplieren, se establecen sanciones que van del “apercibimiento”, la “multa”, el “decomiso definitivo de vehículos utilizados al cometer la infracción” o la “inhabilitación de transportar y/o vender el producto cosechado”."],
                          ["Aplicación aérea", "Se prohíbe la aplicación aérea de agrotóxicos."],
                        ];
                        break;
                      case 'genero':
                        this.changeLink = 'http://www.change.org/menstruarsiniva'
                        this.propuestaLink = 'https://propuestas.causascomunes.org/articulado?id=5d7a9c23ee136700188ea5c6'
                        this.propuestasResumen = 'Causas Comunes junto a <a target="_blank" rel="noopener noreferrer" href="https://economiafeminita.com/">Economía Feminista</a> y más activistas estamos desarrollando <strong><a target="_blank" rel="noopener noreferrer" href="https://propuestas.causascomunes.org/articulado?id=5d7a9c23ee136700188ea5c6">un proyecto de ley</a></strong>, para presentar en el Congreso, que incluye los siguientes puntos:'
                        this.propuestas = [
                          ["Eliminación del iva a elementos para la gestión menstrual", "Se exime del pago de iva a toallas higiénicas, tampones, paños absorbentes lavables, esponjas marinas, copas menstruales, ropa interior absorbente y otros métodos que pudieran inventarse en el futuro."],
                          ["Provisión gratuita", "De elementos para la gestión menstrual a niñas, adolescentes y personas que menstruen (entre la menarca y el climaterio) en escuelas, hospitales, cárceles y en paradores con gente en situación de calle."],
                          ["Disponibilidad sin intermediarixs", "Toallas higiénicas, tampones, paños absorbentes lavables, esponjas marinas, copas menstruales y ropa interior absorbente deben estar a disposición en los lugares mencionados, respetando las elecciones personales e incorporando, asesorías para elegir el método, si la persona así lo desea,"],
                          ["Capacitación en el sector público", "En todos los aspectos que conciernen a la higiene y salud durante el ciclo menstrual. la capacitación se orienta tanto de efectores de salud de docentes, en el marco de los lineamientos de la educación sexual integral (esi). asimismo, se ordena generar campañas de sensibilización y visibilización de la temática y  la creación de una línea de atención para la recibir consultas y brindar orientación."],
                          ["Inclusión de insumos en el plan médico obligatorio", "Se asegura que las obras sociales y prepagas asumen parte de la responsabilidad en la distribución y provisión de los elementos mencionados."],
                          ["Disposición de los desechos", "Los establecimientos públicos deberán contar con instalaciones sanitarias acordes y con protocolos de disposición de los desechos."],
                        ];
                        break;
                    }
                });
        });
    }

}

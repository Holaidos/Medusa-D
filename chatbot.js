(function() {
  'use strict';

  var SUPABASE_URL = 'https://ohwwehbadhtysmwjvfoy.supabase.co';
  var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9od3dlaGJhZGh0eXNtd2p2Zm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1MTg0MjMsImV4cCI6MjA5OTA5NDQyM30.DtlcpFcDbONfjjTiIcL4PlX0sscv7ccRkwYoX_WMCp0';
  var N8N_WEBHOOK_URL = '';
  var GEMINI_API_KEY = ''; // API key gratuita: https://aistudio.google.com/apikey

  // ==================== CONOCIMIENTO NERDO ====================
  var KB = [
    {
      id: 'inmortal',
      keywords: ['inmortal','turritopsis','dohrnii','eterna','inmortality','transdiferenciacion','revertir','ciclo','benjamin','button'],
      q: '¿Cómo funciona la inmortalidad biológica de Turritopsis dohrnii?',
      a: 'La **Turritopsis dohrnii**, conocida como la medusa inmortal, posee la capacidad única de revertir su ciclo de vida mediante un proceso llamado **transdiferenciación**. Cuando enfrenta estrés ambiental, daño físico o envejecimiento, en lugar de morir, sus células somáticas se desdiferencian y se transforman en nuevos tipos celulares. El proceso comienza cuando la medusa adulta se adhiere a un sustrato, su umbrela se reabsorbe y sus tentáculos se retraen. Las células del canal gastrovascular y de la superficie externa del cuerpo sufren apoptosis controlada mientras las células madre (i-cells) se activan. En 24-48 horas, el organismo se convierte en un quiste cístico, del cual emerge un nuevo pólipo en 3-5 días. Este pólipo luego produce nuevas medusas genéticamente idénticas por gemación. Molecularmente, la transdiferenciación implica la sobreexpresión de genes como **FoxO**, **Myc** y componentes de las vías **Wnt/Notch**, junto con la reactivación de la **telomerasa**, enzima que alarga los telómeros y previene el envejecimiento celular. La telomerasa en Turritopsis se reactiva durante la transdiferenciación, algo que no ocurre en la mayoría de los animales adultos. Los factores **Yamanaka** (Oct4, Sox2, Klf4, c-Myc), que en mamíferos reprograman células adultas a iPSCs (Nobel 2012 a Shinya Yamanaka), tienen análogos funcionales en Turritopsis. Esto la convierte en un modelo de investigación para medicina regenerativa y gerontología. Sin embargo, no es verdaderamente "inmortal" en el sentido práctico: puede morir por depredación, enfermedades o condiciones ambientales extremas. Se han identificado al menos dos especies adicionales con capacidad similar: Turritopsis rubra y algunas poblaciones de Aurelia aurita que muestran "reversión del desarrollo" en condiciones de laboratorio.',
      cat: ['biologia','genetica','investigacion']
    },
    {
      id: 'cnidocito',
      keywords: ['cnidocito','nematocisto','disparo','urticante','veneno','celula','700','nanosegundo','mecanismo','presion'],
      q: '¿Cuál es el mecanismo biofísico del disparo del cnidocito?',
      a: 'El **cnidocito** es una de las células más especializadas del reino animal y ejecuta uno de los procesos biomecánicos más rápidos conocidos. En su interior contiene el **nematocisto**, una cápsula de colágeno que almacena un túnel eversible enrollado a alta presión. El disparo ocurre en aproximadamente **700 nanosegundos** (7×10⁻⁷ segundos), generando una aceleración de **5.41 millones de gravedades** (5.41 × 10⁶ g), unas 54 veces mayor que la aceleración de una bala de rifle. El mecanismo funciona así: la cápsula del nematocisto está compuesta por una matriz de colágeno tipo II altamente entrecruzado que genera una presión osmótica interna de aproximadamente **15,000 PSI** (más de 1,000 atmósferas, comparable a la presión en la Fosa de las Marianas). Esta presión se mantiene por la acción de bombas iónicas que concentran iones de calcio y magnesio dentro de la cápsula, creando un gradiente osmótico masivo. El cnidocito está sellado por un opérculo en su extremo apical. Cuando el **cnidocilo** (un cilio modificado que actúa como mecanorreceptor) detecta el contacto combinado con estímulos químicos (N-acetilazúcares y compuestos de la presa), se abren canales iónicos de sodio voltaje-dependientes (Nav), despolarizando la célula. Esto causa la apertura del opérculo y la liberación repentina de la presión almacenada. El túnel se evagina (se da vuelta como un dedo de guante) en menos de un microsegundo, penetrando la cutícula de la presa. La punta del nematocisto tiene una estructura similar a una jeringa hipodérmica que inyecta **picolitros** de veneno. Existen más de **30 tipos morfológicos** de nematocistos (penetrantes, envolventes, adhesivos, etc.), cada uno con función específica. La energía almacenada es elástica, no química: la pared de colágeno se deforma durante la carga y libera la energía como un resorte cuando se dispara. El cnidocito es una célula terminal: tras disparar, no puede recargarse y es reemplazado por uno nuevo en días.',
      cat: ['biologia','biofisica','anatomia']
    },
    {
      id: 'gfp',
      keywords: ['gfp','green','fluorescent','proteina','fluorescencia','shimomura','nobel','aequorea','victoria','chromophore','barril'],
      q: '¿Cuál es la estructura y aplicación de la GFP descubierta en medusas?',
      a: 'La **Green Fluorescent Protein (GFP)** fue descubierta por **Osamu Shimomura** en 1962 a partir de la medusa **Aequorea victoria**, una hidromedusa bioluminiscente del Pacífico norte. Shimomura observó que Aequorea emitía luz verde cuando se agitaba, pero al purificar la proteína responsable (aequorina) descubrió que emitía luz **azul**, no verde. La luz verde provenía de una segunda proteína: la GFP, que absorbía la luz azul de la aequorina y la reemitía como verde por **transferencia resonante de energía (FRET)**. Estructuralmente, la GFP es una proteína de 238 aminoácidos (27 kDa) que forma un **barril beta**: 11 láminas beta dispuestas en un cilindro que protege un cromóforo central. El cromóforo se forma **autocatalíticamente** por ciclación de los residuos **Ser65-Tyr66-Gly67**, sin necesidad de cofactores enzimáticos. Esta autofluorescencia intrínseca fue revolucionaria: permitió fusionar genéticamente la GFP a cualquier proteína y visualizarla en células vivas en tiempo real. Martin Chalfie demostró la expresión heteróloga de GFP en 1994, y Roger Tsien desarrolló variantes de colores (CFP, YFP, RFP, etc.). Los tres compartieron el **Nobel de Química 2008**. Las aplicaciones son vastas: marcaje de proteínas en células vivas, biosensores de calcio (GCaMP), indicadores de pH, voltaje y fosforilación, trazado neuronal en optogenética, y recientemente, **miniSOG** para microscopía correlativa (fluorescencia + electrones). La GFP y sus derivados se han expresado en prácticamente todos los organismos modelo: bacterias, levaduras, plantas, moscas, peces cebra, ratones y primates no humanos. En el contexto de la pandemia, la GFP se usó para visualizar la entrada del SARS-CoV-2 a células. Hoy existen bases de datos con más de 100,000 variantes de proteínas fluorescentes.',
      cat: ['biologia','bioquimica','investigacion']
    },
    {
      id: 'cubozoa',
      keywords: ['cubozoa','cubo','avispa','mar','chironex','fleckeri','cubomedusa','24','ojos','vision','veneno','cardiotoxina'],
      q: '¿Qué hace única a la clase Cubozoa?',
      a: 'Los **Cubozoa** (cubomedusas o avispas de mar) son la clase más peligrosa de cnidarios y poseen el sistema visual más complejo del filo. Se caracterizan por su umbrela cúbica (de ahí el nombre), de la cual cuelga un pedalium en cada esquina inferior que sostiene uno o más tentáculos aplanados. Su característica más notable son **24 ojos** distribuidos en 4 ropalias (estructuras sensoriales en la base de la umbrela). Cada ropalia contiene **6 ojos** de 4 tipos distintos: dos ojos con lentes (similares a los de vertebrados, con córnea, lente esférica, iris y retina), dos ojos con hendidura (fotorreceptores direccionales) y dos ojos pigmentados simples (detectores de luz). La lente de los ojos superiores tiene una gradiente de índice refractivo que corrige la aberración esférica, un diseño óptico convergente al del ojo humano. Estudios conductuales muestran que Chironex fleckeri puede discriminar colores, detectar obstáculos y orientarse navegando activamente hacia estuarios de manglares donde se reproducen. El veneno de Cubozoa es el más potente del filo. **Chironex fleckeri** (avispa de mar australiana) posee un veneno que contiene más de 20 proteínas diferentes, principalmente **CfTX-A y CfTX-B**, cardiotoxinas que forman poros en membranas de células cardíacas causando arritmias fatales en 3-20 minutos. Cada tentáculo adulto contiene aproximadamente 5,000 millones de cnidocitos y un ejemplar grande tiene suficiente veneno para matar a 60 humanos. El antiveneno CSL (producido en ovejas como fragmentos Fab purificados) es efectivo si se administra en los primeros **20-30 minutos**. **Carukia barnesi**, otra cubozoa, causa el **síndrome Irukandji**: dolor lumbar extremo, hipertensión severa, vómitos, diaforesis y una sensación abrumadora de muerte inminente, requiriendo hospitalización por días o semanas. Se conocen aproximadamente **50 especies** de Cubozoa.',
      cat: ['biologia','veneno','vision','taxonomia']
    },
    {
      id: 'ciclo_vida',
      keywords: ['ciclo','vida','reproducen','reproduccion','polipo','medusa','efira','estrobilacion','planula','gametos','alternancia'],
      q: '¿Cómo es el ciclo de vida completo de una medusa?',
      a: 'El ciclo de vida de las medusas (clase Scyphozoa) es un ejemplo clásico de **metagénesis** o alternancia de generaciones, alternando entre una fase polipoide asexual y una fase medusoide sexual. Comienza cuando la medusa adulta libera **gametos** (óvulos y espermatozoides) al agua. La fertilización es externa y produce un **huevo cigótico** que se desarrolla en una larva ciliada llamada **plánula** (120-150 micras). La plánula, que nada libremente por días o semanas usando cilios, detecta señales químicas y físicas del sustrato (biofilms bacterianos, textura, luz) y se asienta. Una vez fijada, sufre **metamorfosis**: el extremo anterior se diferencia en la boca y tentáculos del pólipo, mientras que el extremo posterior se convierte en el disco pedal adhesivo. El pólipo resultante (1-5 mm) tiene forma de copa con una boca central rodeada de tentáculos y puede vivir años. Se reproduce asexualmente por **gemación** produciendo clones genéticos idénticos, formando colonias. Cuando las condiciones ambientales son favorables (temperatura, luz, nutrientes), el pólipo inicia la **estrobilación**: el extremo distal del pólipo se segmenta transversalmente formando una pila de discos aplanados llamada **estróbilo**. Cada segmento madura y se libera como **éfira**, una medusa juvenil de 1-5 mm con 8 lóbulos marginales. La éfira crece alimentándose de plancton y en semanas o meses alcanza la madurez sexual. En esta fase, el animal desarrolla gónadas, alcanza su tamaño adulto (desde milímetros hasta 2 metros de diámetro) y produce gametos, completando el ciclo. Factores reguladores clave incluyen la temperatura (el umbral térmico gatilla estrobilación en muchas especies), la hormona **retinoica** y el gen **Wnt**. La duración total del ciclo varía enormemente: algunas medusas completan el ciclo en semanas, otras toman años. La mayoría de las medusas viven de unos meses a 1-2 años en fase medusoide.',
      cat: ['biologia','reproduccion','desarrollo']
    },
    {
      id: 'veneno_mecanismo',
      keywords: ['veneno','toxina','mecanismo','molecular','proteina','cardiotoxina','hemolisis','canal','sodio','como','actua'],
      q: '¿Cuál es el mecanismo molecular de acción del veneno de medusas?',
      a: 'El veneno de medusas es un cóctel complejo de más de 20 proteínas y péptidos bioactivos que actúan sobre múltiples sistemas fisiológicos. El mecanismo principal varía según la clase: **Cubozoa** produce principalmente **cardiotoxinas formadoras de poros** (CfTX-A y CfTX-B en Chironex fleckeri), mientras que **Scyphozoa** produce mayormente **hemolisinas** y **neurotoxinas**, y **Hydrozoa** como Physalia produce mezclas de ambas. Las **cardiotoxinas** (CfTX) actúan insertándose en la membrana de células cardíacas formando poros oligoméricos. El proceso inicia cuando la toxina se une a receptores de membrana (posiblemente lípidos como esfingomielina o fosfatidilcolina) y sufre un cambio conformacional que expone un dominio hidrofóbico. Las subunidades de CfTX se oligomerizan formando canales de aproximadamente 1-2 nm de diámetro, permitiendo el influjo masivo de Ca²⁺ y Na⁺. En cardiomiocitos, esto causa una despolarización irreversible, entrada masiva de calcio que activa proteasas dependientes de calcio (calpaínas), llevando a necrosis miocárdica. El resultado es arritmia ventricular, fibrilación y paro cardíaco en minutos. Las **hemolisinas** (presentes en Pelagia noctiluca, Cyanea capillata) actúan similarmente sobre eritrocitos causando lisis osmótica. Las **neurotoxinas** de Carukia barnesi (carukiotoxina) y Physalia actúan bloqueando canales de sodio voltaje-dependientes (Nav), causando parálisis muscular y dolor neuropático por activación persistente de fibras nociceptivas. El **síndrome Irukandji** (causado por Carukia y otras cubomedusas pequeñas) no se debe a una sola toxina sino a una combinación de proteínas que causan liberación masiva de catecolaminas endógenas, resultando en hipertensión severa, dolor extremo y la característica "sensación de muerte inminente". La concentración letal media (DL50) del veneno de Chironex es de aproximadamente 40 μg/kg en ratón (intravenoso), comparable al veneno de cobra. Sin embargo, la velocidad de acción es mucho mayor: paro cardíaco en 3-20 minutos vs horas en el caso de ofídios. Estudios proteómicos recientes (espectrometría de masas LC-MS/MS) han identificado más de 200 proteínas distintas en venenos de cnidarios, incluyendo enzimas (fosfolipasas A2, metaloproteasas), inhibidores enzimáticos, lectinas y péptidos antimicrobianos.',
      cat: ['bioquimica','veneno','fisiologia']
    },
    {
      id: 'bioluminiscencia',
      keywords: ['bioluminiscencia','brillan','luz','aequorina','fotoproteina','calcio','luciferina','luciferasa','quimica'],
      q: '¿Cómo funciona la bioluminiscencia en medusas?',
      a: 'La bioluminiscencia en medusas es un fenómeno químico que produce luz fría (sin calor) mediante la oxidación de un sustrato llamado **luciferina** catalizada por una enzima **luciferasa** en presencia de oxígeno. Aproximadamente la mitad de las especies de medusas son bioluminiscentes. El mecanismo fue elucidado en **Aequorea victoria** por Osamu Shimomura: la proteína responsable es la **aequorina** (una fotoproteína de 22 kDa), que contiene un cromóforo interno (coelenterazina) y tres sitios de unión a Ca²⁺. Cuando el Ca²⁺ se une a la aequorina, la proteína sufre un cambio conformacional que oxida la coelenterazina a coelenteramida, emitiendo luz **azul** (λmax = 470 nm). La luz azul es inmediatamente absorbida por la **GFP** (proteína fluorescente verde) cercana, que por FRET (transferencia de energía de resonancia de Förster) reemite como luz **verde** (λmax = 509 nm). Este sistema de dos componentes (fotoproteína + GFP) es único y más eficiente que la luciferasa-luciferina clásica. La bioluminiscencia en medusas tiene múltiples funciones ecológicas: **defensa** (destello súbito que asusta depredadores como tortugas marinas), **camuflaje** (contrailuminación: emiten luz hacia abajo para igualar la luz de la superficie y ocultar su silueta), **señalización sexual** (patrones de luz durante el cortejo) y **atracción de presas** (algunas especies iluminan sus tentáculos para atraer plancton hacia ellos). El fenómeno del **mar lechoso** (grandes extensiones del océano Índico que brillan de noche, visibles desde satélites) es causado por blooms masivos de bacterias bioluminiscentes y posiblemente medusas. La aequorina se usa hoy como biosensor de calcio en investigación neurocientífica para medir actividad neuronal en tiempo real.',
      cat: ['bioquimica','ecologia','fisiologia']
    },
    {
      id: 'locomocion',
      keywords: ['locomocion','nadan','propulsion','nado','movimiento','musculo','chorro','jet','eficiencia','froude','navier','stokes','reynolds'],
      q: '¿Cuál es la física de la locomoción de las medusas?',
      a: 'La locomoción de las medusas se basa en **propulsión a chorro** (jet propulsion), uno de los sistemas de navegación más antiguos en animales. El mecanismo es simple pero las hidrodinámicas son complejas: la medusa contrae su umbrela usando **músculos circulares** (ubicados en la subumbrela) que reducen el diámetro de la campana, expulsando agua hacia atrás a través del margen oral. Esto genera un empuje hacia adelante (tercera ley de Newton). La fase de **contracción** (potencia) es rápida y activa (requiere ATP), mientras que la fase de **relajación** (recuperación) es pasiva y lenta, aprovechando la elasticidad de la mesoglea (rica en colágeno tipo II y elastina) que actúa como resorte. La eficiencia propulsiva de las medusas (medida por el **rendimiento de Froude**) es de aproximadamente **10-30%**, comparado con ~80% en peces teleósteos. Sin embargo, este bajo rendimiento se compensa con un muy bajo costo metabólico por unidad de distancia: las medusas gastan menos energía que los peces para desplazarse porque su cuerpo gelatinoso tiene una densidad casi idéntica al agua y no requieren sustener un esqueleto. El flujo alrededor de una medusa en natación se describe mediante las ecuaciones de **Navier-Stokes** para fluidos viscosos e incompresibles. El **número de Reynolds** (Re = ρvL/μ, donde ρ es densidad, v velocidad, L longitud característica y μ viscosidad) para medusas pequeñas puede ser tan bajo como 10 (régimen laminar) y para grandes (Nemopilema nomurai) puede superar 1,000 (régimen de transición). En Re bajos, las fuerzas viscosas dominan y la natación es menos eficiente. Estudios de **DPIV** (velocimetría de imágenes de partículas) han revelado que las medusas generan **anillos de vórtice** durante la contracción que se desprenden del margen de la umbrela. Estos anillos viajan hacia atrás con momento angular, y la medusa puede "recapturar" parte de la energía del vórtice durante la siguiente contracción, mejorando la eficiencia hasta en un 30%. Las medusas son planctónicas: no pueden nadar contra corrientes fuertes. Sin embargo, realizan **migraciones verticales diarias** (DVM) de cientos de metros: suben de noche para alimentarse de plancton en superficie y bajan de día para evitar depredadores visuales.',
      cat: ['biofisica','fisiologia','ecologia']
    },
    {
      id: 'blooms',
      keywords: ['bloom','explosion','poblacion','aumento','sobrepesca','eutrofizacion','cambio','climatico','calentamiento','impacto','economico'],
      q: '¿Qué causa los blooms masivos de medusas y su impacto?',
      a: 'Los **blooms** de medusas son aumentos explosivos y repentinos en la densidad poblacional que pueden cubrir cientos de kilómetros cuadrados. Son fenómenos cada vez más frecuentes e intensos a nivel global, impulsados por múltiples factores antropogénicos. Las causas principales son: **1) Sobrepesca**: la eliminación de depredadores naturales de medusas (tortugas marinas, peces luna, algunos atunes) y de competidores pelágicos (sardinas, anchoas) libera el nicho ecológico para las medusas. **2) Eutrofización**: los fertilizantes agrícolas y descargas urbanas aumentan los nutrientes (nitrógeno, fósforo) en aguas costeras, causando blooms de fitoplancton que alimentan blooms de medusas. **3) Calentamiento global**: las aguas más cálidas expanden los rangos geográficos de muchas especies de medusas, aceleran sus tasas metabólicas y reproductivas, y extienden la temporada de blooms. **4) Acidificación oceánica**: el CO₂ disuelto reduce el pH del agua, disolviendo conchas de moluscos y corales. Las medusas, sin estructuras calcáreas, se ven favorecidas en estos ambientes. **5) Construcción de infraestructura marina**: muelles, plataformas petroleras y boyas proporcionan sustrato duro para que los pólipos se asienten (hasta 100 veces más densidad de pólipos en estructuras artificiales). El impacto económico global de los blooms se estima en **más de 100,000 millones de dólares** en daños acumulados: bloqueo de sistemas de refrigeración de plantas nucleares (Oskarshamn 2013 en Suecia, Orot Rabin 2021 en Israel), colapso de pesquerías (Mnemiopsis leidyi en el Mar Negro en los 80s redujo la pesca en 90%, controlado luego por Beroe ovata), obstrucción de redes de pesca, pérdidas turísticas en playas del Mediterráneo y Caribe, y daños a acuicultura. Los blooms son indicadores de **estrés ecológico**. Un océano dominado por medusas representa una pérdida de biodiversidad y servicios ecosistémicos, ya que las medusas no sostienen cadenas tróficas complejas como los peces óseos.',
      cat: ['ecologia','cambio_climatico','economia']
    },
    {
      id: 'anatomia',
      keywords: ['anatomia','cuerpo','partes','umbrela','mesoglea','gastrodermis','epidermis','cavidad','gastrovascular','gonadas','ropalias'],
      q: 'Describe la anatomía detallada de una medusa',
      a: 'Las medusas tienen una arquitectura corporal simple pero altamente especializada, organizada en dos capas celulares (diblásticas) con simetría radial. La estructura principal es: **1) Epidermis** (ectodermis): la capa externa que contiene células epiteliales protectoras, células mucosas, cnidocitos y células sensoriales. **2) Mesoglea**: la capa media gelatinosa que constituye el 95% del cuerpo. No es un tejido sino una matriz extracelular compuesta por ~1% de proteínas (colágeno tipo II, elastina, fibronectina), proteoglicanos y 99% agua. Proporciona flotabilidad neutra y elasticidad. **3) Gastrodermis** (endodermis): la capa interna que recubre la cavidad gastrovascular, con células secretoras de enzimas digestivas (proteasas, nucleasas), células fagocíticas y células glandulares. La **cavidad gastrovascular** es el sistema digestivo y circulatorio combinado. Se comunica con el exterior por la boca (única abertura que funciona como boca y ano) ubicada en el centro de la subumbrela, a menudo en un **manubrio** (probóscide tubular). La cavidad se ramifica en **canales radiales** y un **canal circular** marginal que distribuyen nutrientes. Las **gónadas** (órganos reproductores) se ubican en la gastrodermis cerca de los canales radiales. En el margen de la umbrela se encuentran las **ropalias**: órganos sensoriales que contienen **estatocistos** (con estatolitos de CaSO₄ para detectar gravedad) y **ocelos** (manchas oculares fotosensibles) o, en cubomedusas, ojos complejos con lentes. El sistema nervioso es una **red difusa** (no hay cerebro centralizado): dos anillos nerviosos (uno motor y uno sensorial) recorren el margen de la umbrela conectando las ropalias con los músculos circulares y radiales. Esta red permite contracciones coordinadas sin centro de procesamiento. El sistema digestivo es extracelular e intracelular: las presas son paralizadas por cnidocitos, llevadas a la boca por brazos orales, digeridas parcialmente en la cavidad gastrovascular por enzimas (tripsina, quimotripsina), y las partículas pequeñas son fagocitadas por células gastrodérmicas.',
      cat: ['biologia','anatomia']
    },
    {
      id: 'fosiles',
      keywords: ['fosil','evolucion','origen','500','millones','cambrico','antepasado','registro'],
      q: '¿Cuál es el registro fósil y la evolución de las medusas?',
      a: 'El registro fósil de las medusas se extiende al menos hasta el **Cámbrico Inferior** (hace ~520 millones de años), lo que las convierte en uno de los linajes animales más antiguos con plan corporal recognoscible. Los fósiles más antiguos atribuibles a medusas provienen de la **Formación Chengjiang** (China, ~520 Ma) y del **Burgess Shale** (Canadá, ~508 Ma), incluyendo especímenes de **Velumbrella**, **Eldonia** y **Rotadiscus** preservados como impresiones en lutitas finas. La ausencia de partes duras hace que el registro fósil de medusas sea extremadamente fragmentario, pero los fósiles de **impresión** en Konservat-Lagerstätten (yacimientos de conservación excepcional) proporcionan evidencia de formas de vida similares a medusas en el Ediacárico (hace 570 Ma, como **Mawsonites** y **Kimberella**), aunque la identificación como cnidarios es debatida. Molecularmente, los relojes moleculares basados en genes mitocondriales y nucleares sitúan la divergencia de Cnidaria de otros metazoos en el **Criogénico** (~700 Ma), con la divergencia entre Scyphozoa y Cubozoa en el **Cámbrico** (~540 Ma). Las medusas han sobrevivido las **cinco extinciones masivas**, incluyendo la del Pérmico-Triásico (252 Ma), que eliminó el 96% de especies marinas. Se hipotetiza que los blooms de medusas pudieron ser dominantes en los océanos post-extinción mientras los ecosistemas se recuperaban, una situación que algunos científicos llaman "océano gelatinoso". La longevidad evolutiva del plan corporal de las medusas (cuerpo gelatinoso, simetría radial, cnidocitos) sugiere que es una estrategia adaptativa exitosa que ha requerido pocos cambios fundamentales en cientos de millones de años.',
      cat: ['paleontologia','evolucion']
    },
    {
      id: 'sifonoforo',
      keywords: ['sifonoforo','physalia','carabela','portuguesa','colonia','organismo','colonial','no es medusa'],
      q: '¿Qué es un sifonóforo y en qué se diferencia de una medusa?',
      a: 'Un **sifonóforo** no es una medusa sino una **colonia de organismos** (zooides) genéticamente idénticos que funcionan como un solo superorganismo. La **Physalia physalis** (carabela portuguesa o falsa medusa) es el ejemplo más conocido. Cada "individuo" aparente es en realidad una colonia compuesta por cuatro tipos de zooides especializados: **neumatóforo** (un flotador lleno de gas que actúa como vela), **dactilozooides** (tentáculos largos de hasta 30 metros encargados de capturar presas), **gastrozooides** (encargados de la digestión) y **gonozooides** (encargados de la reproducción). Esta división del trabajo es análoga a la de los órganos en animales superiores, pero cada zooide es un individuo genéticamente clonal. Los sifonóforos pertenecen al **orden Siphonophorae** dentro de la clase **Hydrozoa**, mientras que las medusas "verdaderas" pertenecen a Scyphozoa, Cubozoa o Staurozoa. La diferencia fundamental es que una medusa verdadera es un solo organismo con un solo sistema nervioso, digestivo y reproductivo, mientras que un sifonóforo es muchos organismos en estrecha interdependencia. El veneno de Physalia physalis es extremadamente potente: sus nematocistos contienen una mezcla de toxinas que causan dolor severo, necrosis cutánea, cicatrices permanentes y, raramente, shock anafiláctico. En 2024-2025 se reportaron aumentos significativos de varamientos de Physalia en playas del Mediterráneo y Caribe, posiblemente asociados a cambios en corrientes oceánicas y temperatura superficial del mar. Existen aproximadamente 175 especies de sifonóforos en el mundo.',
      cat: ['biologia','taxonomia','veneno']
    },
    {
      id: 'space',
      keywords: ['espacio','nasa','gravedad','sts','shuttle','columbia','1991','astronauta','ingravidez'],
      q: '¿Qué pasó con las medusas en el espacio?',
      a: 'En 1991, la NASA envió **2,478 medusas Aurelia aurita** al espacio a bordo del transbordador **Columbia (misión STS-40)** como parte del experimento "Jellyfish in Space" diseñado para estudiar los efectos de la microgravedad en el desarrollo de sistemas de equilibrio. La hipótesis era que, al carecer de estatolitos sólidos en gravedad cero, las éfiras recién metamorfoseadas desarrollarían sistemas de equilibrio (ropalias) anómalos. El experimento duró 8 días en órbita. Las medusas fueron mantenidas en bolsas de cultivo con agua de mar artificial. Durante la misión, los astronautas observaron que las medusas nadaban de forma errática y sin orientación direccional. Al regresar a la Tierra, los resultados fueron reveladores: las medusas nacidas en microgravedad presentaban **80% más anomalías** en el desarrollo de los estatocistos (los órganos de equilibrio) en comparación con el grupo control terrestre. Específicamente, los estatolitos (concreciones de CaSO₄) no se formaron correctamente en ausencia de gravedad, resultando en estructuras reducidas, malformadas o ausentes. Las medusas criadas en microgravedad nunca desarrollaron la capacidad de orientarse normalmente en un campo gravitatorio. Incluso después de 15 días en gravedad terrestre post-vuelo, no lograron recuperar la función vestibular normal. Este experimento demostró que la gravedad es un factor epigenético esencial para el desarrollo normal de los sistemas de equilibrio, y que el desarrollo embrionario está moldeado por señales mecánicas del entorno. Las medusas del espacio también mostraron diferencias en la expresión de genes relacionados con el desarrollo del sistema nervioso y la biomineralización. Este experimento ha sido citado en investigaciones sobre los efectos de la microgravedad en el desarrollo vestibular humano y en la planificación de misiones espaciales de larga duración (Marte).',
      cat: ['investigacion','espacio','fisiologia']
    },
    {
      id: 'sistema_nervioso',
      keywords: ['sistema','nervioso','cerebro','neurona','red','difusa','sinapsis','neurotransmisor','aprendizaje','memoria'],
      q: '¿Cómo funciona el sistema nervioso de las medusas sin cerebro?',
      a: 'Las medusas carecen de cerebro centralizado pero poseen un sistema nervioso funcionalmente efectivo organizado como **red difusa** (nerve net). Este sistema consiste en dos anillos nerviosos principales que recorren el margen de la umbrela: un **anillo motor** (subumbrelar) que controla la contracción muscular rítmica para la natación, y un **anillo sensorial** (exumbrelar) que integra información de las ropalias. Los anillos están conectados por interneuronas que coordinan la actividad. Las **ropalias** (órganos sensoriales en el margen) actúan como centros de control locales: cada ropalia contiene un **marcapasos** endógeno que genera potenciales de acción rítmicos. La frecuencia de estos marcapasos determina la frecuencia de contracción de la umbrela. La ropalia con la frecuencia más alta "impone" su ritmo al resto, funcionando como un marcapasos cardiaco primitivo. Las neuronas de las medusas son **verdaderas neuronas** con axones, dendritas (aunque menos ramificadas que en vertebrados) y sinapsis químicas y eléctricas (gap junctions). Los neurotransmisores incluyen glutamato (excitatorio), GABA (inhibitorio), dopamina, serotonina, péptidos RFamida y óxido nítrico. Estudios de 2023-2024 (Universidad de Kiel, Caltech) demostraron que las medusas (Tripedalia cystophora, una cubomedusa) exhiben **aprendizaje asociativo**: aprenden a evitar obstáculos después de colisiones repetidas, reteniendo la memoria por varias horas. Esto desafía la suposición de que el aprendizaje requiere un cerebro centralizado. El mecanismo probable involucra cambios en la eficiencia sináptica (plasticidad) en los anillos nerviosos, análogo a la potenciación a largo plazo (LTP) en hipocampo de mamíferos. La velocidad de conducción nerviosa en medusas es de aproximadamente 0.2-1 m/s (mielina no presente), significativamente menor que en vertebrados (50-100 m/s en fibras mielinizadas). Sin embargo, dada la escala pequeña de las medusas (<1 m), los tiempos de transmisión son adecuados.',
      cat: ['neurociencia','fisiologia','biologia']
    },
    {
      id: 'cultura_gastronomia',
      keywords: ['comer','cocina','gastronomia','comida','plato','ensalada','china','japon','asia','crujiente'],
      q: '¿Cómo se preparan y consumen las medusas en gastronomía?',
      a: 'Las medusas son un ingrediente culinario tradicional en **Asia Oriental**, particularmente en China, Japón, Corea, Tailandia y Vietnam, donde se consumen desde hace más de 1,700 años. China es el mayor productor y consumidor mundial, con más de **300,000 toneladas** procesadas anualmente. Las especies más utilizadas son **Rhopilema esculentum** (medusa de fuego), **Rhopilema verrilli**, **Nemopilema nomurai** y **Lobonema smithii**. El procesamiento tradicional implica: **1)** Captura manual con redes de arrastre de superficie. **2)** Separación de la umbrela y los brazos orales. **3)** Tratamiento con una mezcla de **sal (NaCl) y alumbre (KAl(SO₄)₂·12H₂O)** en proporciones específicas (generalmente 3:1 sal:alumbre) durante 2-3 semanas. El alumbre actúa como agente deshidratante y endurecedor, mientras que la sal extrae agua y previene putrefacción. **4)** Deshidratación final (el producto pierde 90-95% de su peso original). **5)** Rehidratación antes del consumo (remojo en agua fría por 2-4 horas). La textura resultante es **crujiente** (cruncheante), no viscosa ni gelatinosa. Esta textura única se debe a que el proceso de salado/alumbre entrecruza las fibras de colágeno de la mesoglea, creando una estructura firme que mantiene su crocancia incluso después de cocción breve. En la cocina, se usa típicamente en **ensaladas frías** cortada en tiras finas, aderezada con aceite de sésamo, vinagre, salsa de soja y ají. También se consume como antojito frito (Japón: "kurage no sunomono"), en sopas (China: "海蜇汤"), y como ingrediente en sushi. Nutricionalmente, la medusa procesada es baja en calorías (36 kcal/100g), alta en proteínas (5-10%), baja en grasas (<1%), y rica en colágeno tipo II, selenio, yodo y ácidos grasos omega-3. La investigación actual explora el desarrollo de productos de medusa para mercados occidentales: snacks crujientes saborizados, suplementos de colágeno, y polvo proteico.',
      cat: ['gastronomia','cultura','industria']
    },
    {
      id: 'colageno',
      keywords: ['colageno','tipo','ii','mesoglea','cosmetica','medicina','regenerativa','biomaterial','hidrogel','cartilago'],
      q: '¿Qué aplicaciones médicas tiene el colágeno de medusa?',
      a: 'El **colágeno tipo II** extraído de la mesoglea de medusas es un biomaterial de alto interés médico por su biocompatibilidad, baja inmunogenicidad y ausencia de riesgo de enfermedades priónicas (como la EEB/vacas locas, presente en colágeno bovino). La extracción se realiza por **hidrólisis ácida** (ácido acético 0.5 M) o **enzimática** (pepsina), seguida de centrifugación, precipitación con NaCl, diálisis y liofilización. El rendimiento es de aproximadamente 15-20% del peso seco. Las aplicaciones principales incluyen: **1) Ingeniería de tejidos**: andamios (scaffolds) porosos de colágeno de medusa para cultivo de condrocitos (células de cartílago) en reparación articular. Estudios in vivo muestran integración exitosa en defectos osteocondrales en modelos animales. **2) Cicatrización de heridas**: hidrogeles de colágeno de medusa aceleran la regeneración epitelial en quemaduras y úlceras diabéticas, gracias a la activación de macrófagos M2 (fenotipo antiinflamatorio y reparador). **3) Cosméticos**: cremas antiarrugas, sérums y mascarillas con colágeno hidrolizado de medusa, comercializadas en Asia como "jellyfish collagen" con capacidad hidratante 3 veces mayor que el colágeno marino convencional. **4) Liberación controlada de fármacos**: microesferas de colágeno de medusa como vehículos para entrega sostenida de antibióticos, factores de crecimiento y quimioterápicos. La ventaja sobre colágeno porcino o bovino es la ausencia de riesgo de transmisión de patógenos, menor respuesta inflamatoria (el colágeno tipo II de medusa es filogenéticamente más distante del colágeno humano, pero paradójicamente causa menos reacción inmune que el colágeno bovino tipo I). Actualmente hay 3 empresas en el mercado global (Jellyfish Collagen Inc., USA; Jellagen Ltd., UK; Skinosome, Japón) que producen colágeno de medusa para investigación y aplicaciones clínicas.',
      cat: ['medicina','industria','bioquimica']
    },
    {
      id: 'cuidados_picadura',
      keywords: ['picadura','tratar','primeros','auxilios','vinagre','agua','caliente','orina','mito','tratamiento','emergencia'],
      q: '¿Cuál es el tratamiento correcto para una picadura de medusa?',
      a: 'El tratamiento de picaduras de medusa ha cambiado significativamente con la investigación reciente. **Protocolo actual basado en evidencia (2024-2026)**: **1) Salir del agua** con calma, evitando frotar la zona. **2) Aplicar vinagre doméstico (ácido acético al 5%)** sobre la zona afectada durante al menos 30 segundos. El vinagre inactiva los cnidocitos no disparados, previniendo más inyección de veneno. Es especialmente crítico para Chironex fleckeri y Physalia. **3) Retirar tentáculos visibles** con pinzas (nunca con las manos desnudas), usando guantes si disponibles. **4)** Inmersión en **agua caliente** (45°C/113°F, tolerada) durante 20-45 minutos. El calor desnaturaliza las toxinas proteicas: este es el paso más eficaz para aliviar el dolor. **5) Analgésicos** orales (ibuprofeno, paracetamol). Los siguientes son **MITOS PELIGROSOS**: ❌ Orinar sobre la picadura (puede activar cnidocitos no disparados por cambios osmóticos). ❌ Frotar con arena o toalla (activa cnidocitos mecánicamente). ❌ Aplicar hielo directo (el frío puede empeorar la necrosis tisular y no desnaturaliza toxinas). ❌ Alcohol, amoníaco o bicarbonato (alteran el pH pero inefectivos contra veneno). **Buscar emergencia (911/112) si**: la picadura cubre más del 50% de un brazo o pierna, hay dificultad respiratoria, dolor torácico, arritmia, pérdida de conciencia, náuseas/vómitos severos, o sospecha de Chironex o Carukia (Australia/Indo-Pacífico). Para el **síndrome Irukandji**, el tratamiento es de soporte: opiáceos para el dolor, antihipertensivos (fentolamina, nitroprusiato) para crisis hipertensivas, y hospitalización en UCI. El antiveneno CSL (Australia) está indicado para Chironex fleckeriz: fragmentos Fab de anticuerpos ovinos que neutralizan CfTX-A/B. Ventana terapéutica: 20-30 minutos. No hay antiveneno para Carukia o Physalia. En República Dominicana y Caribe, las picaduras más comunes son de **Pelagia noctiluca** (medusa luminiscente) y **Physalia physalis**, que raramente son mortales pero causan dolor severo y dermatitis.',
      cat: ['salud','primeros_auxilios','veneno']
    },
    {
      id: 'regeneracion',
      keywords: ['regeneracion','reparar','reparacion','tejido','i-cells','celulas','madre','tentaculo','capacidad'],
      q: '¿Cómo regeneran tejidos las medusas?',
      a: 'Las medusas poseen una capacidad regenerativa extraordinaria, superando a la mayoría de los animales. Pueden regenerar tentáculos enteros, partes de la umbrela, brazos orales e incluso organismos completos a partir de fragmentos de tejido. El mecanismo central depende de las **células i (intersticiales)**, que son células madre multipotentes residentes en la epidermis y la gastrodermis. Las i-cells constituyen aproximadamente el 5-10% de la población celular total en medusas adultas. Cuando ocurre una lesión, las i-cells migran hacia el sitio dañado guiadas por señales quimiotácticas (péptidos de Wnt, FGF, TGF-β). Una vez en el sitio, se diferencian en todos los tipos celulares necesarios: cnidocitos, neuronas, células epiteliales y musculares. La regeneración de un tentáculo completo toma de 3 a 10 días, dependiendo de la especie, tamaño y temperatura. El proceso inicia con la formación de un **blastema** (masa de células indiferenciadas) en la base del tentáculo amputado. Este blastema expresa genes del desarrollo embrionario (Hox, Pax, Wnt) que guían la formación de la estructura tridimensional. Las medusas también pueden regenerar la umbrela completa a partir de fragmentos del margen. En experimentos clásicos, se demostró que cortando una Aurelia aurita en 8 segmentos radiales, cada segmento regenera una medusa completa funcional en 2-4 semanas. Esta capacidad se ha relacionado con la expresión sostenida de genes de pluripotencia (análogos a Oct4, Sox2, Nanog) en las i-cells, que mantienen un estado epigenético permisivo para la diferenciación hacia múltiples linajes. Además, no hay formación de cicatriz (fibrosis) en la regeneración de medusas, un fenómeno de interés para la investigación de cicatrización en mamíferos.',
      cat: ['biologia','regeneracion','medicina']
    },
    {
      id: 'cancer',
      keywords: ['cancer','apoptosis','toxina','antitumoral','antiproliferativo','oncology','terapia','celulas','cancerosas'],
      q: '¿Qué aplicaciones tiene el veneno de medusas contra el cáncer?',
      a: 'Varias toxinas de medusas están siendo investigadas como potenciales agentes antitumorales. El principio es que muchas toxinas formadoras de poros pueden inducir selectivamente **apoptosis** (muerte celular programada) en células cancerosas. La **CfTX-1** de Chironex fleckeri activa caspasas (especialmente caspasa-3 y caspasa-9) en líneas celulares de cáncer de mama (MCF-7) y melanoma (MM96L), induciendo apoptosis dependiente de mitocondria (vía intrínseca). Las toxinas de **Physalia physalis** (physaliatoxina) muestran actividad citotóxica contra células de cáncer de pulmón (A549) y colon (HT-29), con IC₅₀ en el rango micromolar. El veneno de **Pelagia noctiluca** induce estrés oxidativo y apoptosis en células de hepatocarcinoma (HepG2) a través de la producción de especies reactivas de oxígeno (ROS). El veneno de **Cassiopea andromeda** (medusa invertida) contiene péptidos que inhiben la proliferación de células de glioblastoma (U87MG) bloqueando el ciclo celular en fase G2/M. El mecanismo diferencial parece ser que las células cancerosas tienen membranas más fluidas (mayor contenido de lípidos insaturados) y un potencial de membrana mitocondrial más alto que las células normales, haciéndolas más susceptibles a las toxinas formadoras de poros. Sin embargo, la **falta de selectividad** sigue siendo el principal obstáculo para su uso terapéutico: las toxinas no distinguen bien entre células cancerosas y sanas. La investigación actual se centra en crear **conjugados toxina-anticuerpo** (como los ADC en quimioterapia) donde la toxina de medusa se acopla a un anticuerpo monoclonal dirigido contra antígenos tumorales específicos (por ejemplo, HER2 en cáncer de mama). También se investiga la **nanoencapsulación** liposomal para dirigir las toxinas selectivamente al microambiente tumoral.',
      cat: ['medicina','investigacion','bioquimica']
    },
    {
      id: 'especies_comunes',
      keywords: ['especies','lista','tipos','clases','clasificacion','scyphozoa','hydrozoa','staurozoa','cubozoa','diferencia'],
      q: '¿Cuáles son las clases de medusas y sus diferencias?',
      a: 'Las medusas se clasifican en 4 clases principales dentro del filo Cnidaria: **1) Scyphozoa** (medusas verdaderas): ~200 especies. Son las medusas "clásicas" con umbrela en forma de campana, ciclo de vida completo con pólipo y medusa, gónadas en la gastrodermis. Incluye Aurelia aurita, Cyanea capillata (melena de león), Nemopilema nomurai, Pelagia noctiluca, Cotylorhiza tuberculata (huevo frito). Mayormente marinas, diámetro de 2 mm a 2 m. **2) Cubozoa** (cubomedusas): ~50 especies. Umbrela cúbica, 24 ojos en 4 ropalias con lentes, veneno extremadamente potente (Chironex fleckeri, Carukia barnesi), sistema nervioso más complejo de cnidarios, natación activa direccional. **3) Hydrozoa**: ~3,800 especies (la más diversa). Incluye medusas pequeñas (generalmente <3 cm), pólipos dominantes en el ciclo de vida, formas coloniales. Incluye Aequorea victoria (GFP), Turritopsis dohrnii (inmortal), Physalia physalis (sifonóforo colonial). Muchas tienen velo (umbrela con membrana interna). **4) Staurozoa** (medusas pedunculadas): ~50 especies. Medusas sésiles que viven fijas al sustrato por un pedúnculo, no tienen fase de pólipo libre, viven en aguas frías, parecen más plantas que animales. La identificación de una medusa se realiza por: forma de la umbrela, presencia/ausencia de velo, arreglo y tipo de nematocistos (cnidoma), número y disposición de ropalias/órganos sensoriales, patrón de canales gastrovasculares, y forma de las gónadas.',
      cat: ['taxonomia','biologia']
    },
    {
      id: 'cambioclimatico',
      keywords: ['cambio','climatico','calentamiento','global','acidificacion','temperatura','futuro','oceanos','gelatinoso'],
      q: '¿Cómo afecta el cambio climático a la distribución de medusas?',
      a: 'El cambio climático está alterando fundamentalmente la distribución y abundancia global de medusas mediante múltiples mecanismos sinérgicos. **Temperatura**: las aguas superficiales más cálidas expanden los rangos geográficos hacia los polos (Cyanea capillata está colonizando el Ártico). Aumentan las tasas metabólicas (Q₁₀ ≈ 2-3: por cada 10°C, el metabolismo se duplica o triplica), acelerando crecimiento y reproducción. La estrobilación en muchas especies está controlada por temperatura: inviernos más suaves permiten estrobilación más temprana y prolongada. **Acidificación oceánica**: la disminución del pH (actualmente 8.1, proyectada a 7.7-7.8 para 2100) tiene efectos negativos en organismos calcificadores (moluscos, corales, equinodermos) pero efectos neutros o positivos en medusas, que carecen de estructuras calcáreas. Estudios experimentales muestran que Aurelia aurita y Chrysaora quinquecirrha crecen más y tienen mayor tasa de reproducción en condiciones de pH reducido. **Estratificación**: el calentamiento superficial intensifica la estratificación de la columna de agua, reduciendo la mezcla vertical y la disponibilidad de nutrientes para el fitoplancton. Las medusas, con baja tasa metabólica y capacidad de migrar verticalmente para alimentarse de zooplancton, tienen ventaja competitiva sobre peces zooplanctívoros en estas condiciones. **Eventos extremos**: olas de calor marinas (MHW) como la del Pacífico Nororiental (2013-2015, "The Blob") causaron blooms masivos de medusas que colapsaron pesquerías de salmón y cangrejo en Alaska. Las proyecciones para el 2100 indican océanos más cálidos, ácidos y estratificados, que favorecen a las medusas sobre peces óseos en aproximadamente 40-60% de los ecosistemas marinos globales. Este escenario se denomina **"océano gelatinoso"** (gelatinous ocean), donde las medusas dominan las comunidades pelágicas, con consecuencias negativas para la pesca, turismo y ciclos biogeoquímicos.',
      cat: ['ecologia','cambio_climatico']
    },
    {
      id: 'acuarios',
      keywords: ['acuario','cautiverio','tanque','pecera','mantener','cuidados','cultivo','kreisel'],
      q: '¿Cómo se mantienen medusas en acuarios?',
      a: 'El mantenimiento de medusas en cautiverio requiere acuarios especializados tipo **Kreisel** (del alemán "peonza"), diseñados para crear flujo laminar circular continuo que mantiene las medusas suspendidas y evita que se dañen contra esquinas o filtros. Los acuarios Kreisel carecen de esquinas vivas (forma cilíndrica o toroidal con bordes redondeados) y tienen entrada de agua distribuida uniformemente para evitar turbulencias. Parámetros críticos: **temperatura** (específica para cada especie: 16-20°C para Aurelia, 22-26°C para tropicales), **salinidad** (32-35 ppt), **pH** (8.0-8.4) y **amoníaco/nitritos** (~0 mg/L). La **alimentación** se realiza con nauplios de Artemia salina (enriquecidos con ácidos grasos) 1-2 veces al día, complementados con rotíferos y fitoplancton. La cantidad debe ser controlada para evitar sobrealimentación que degrade la calidad del agua. Las especies más comunes en acuarios públicos son Aurelia aurita (medusa luna), Chrysaora fuscescens (ortiga de mar), Mastigias papua (medusa manchada), Cassiopea xamachana (medusa invertida, que vive en el fondo con la umbrela hacia abajo, albergando zooxantelas simbióticas). El ciclo de vida en cautiverio se mantiene cultivando pólipos (que se adhieren a placas de plástico) e induciendo estrobilación con cambios de temperatura y luz. Un acuario bien mantenido puede sostener múltiples generaciones de Aurelia por años. Los desafíos principales son: mantener la calidad del agua (los cnidocitos muertos liberan amoníaco), prevenir burbujas de aire (atrapadas bajo la umbrela causan flotación anormal), y suministrar la dieta adecuada. La venta de medusas para acuarios domésticos ha crecido significativamente desde 2020, con kits completos disponibles comercialmente por $200-1,500 USD.',
      cat: ['acuarios','cultura']
    }
  ];

  // ==================== UI ====================

  var html =
    '<div id="chat-toggle" aria-label="Abrir chat">💬</div>' +
    '<div id="chat-window">' +
      '<div id="chat-header">' +
        '<span>🪼 Chat Medusa <span style="font-size:10px;opacity:0.5">v3.0 IA 🟢</span></span>' +
        '<button id="chat-close" aria-label="Cerrar chat">✕</button>' +
      '</div>' +
      '<div id="chat-messages">' +
        '<div class="chat-msg bot">¡Hola! Soy el chat de medusas con IA 🪼<br><span style="font-size:11px;color:var(--text-muted)">Pregúntame sobre biología, genética, bioquímica, evolución, ecología... lo que sea.</span></div>' +
      '</div>' +
      '<div id="chat-input-area">' +
        '<input id="chat-input" type="text" placeholder="Escribe tu pregunta..." autocomplete="off">' +
        '<button id="chat-send" aria-label="Enviar">➤</button>' +
      '</div>' +
    '</div>';

  var container = document.createElement('div');
  container.id = 'chat-container';
  container.innerHTML = html;
  document.body.appendChild(container);

  var toggle = document.getElementById('chat-toggle');
  var windowEl = document.getElementById('chat-window');
  var closeBtn = document.getElementById('chat-close');
  var messages = document.getElementById('chat-messages');
  var input = document.getElementById('chat-input');
  var sendBtn = document.getElementById('chat-send');

  var style = document.createElement('style');
  style.textContent =
    '#chat-container { position:fixed; bottom:24px; right:24px; z-index:9999; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif; }' +
    '#chat-toggle { width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg,#00b4ff,#c77dff); color:#fff; display:flex; align-items:center; justify-content:center; font-size:24px; cursor:pointer; box-shadow:0 4px 20px rgba(0,180,255,0.4); transition:transform 0.2s; user-select:none; }' +
    '#chat-toggle:hover { transform:scale(1.1); }' +
    '#chat-window { position:fixed; bottom:90px; right:24px; width:400px; max-width:calc(100vw - 48px); height:560px; max-height:calc(100vh - 120px); background:var(--card,#0a0e27); backdrop-filter:blur(20px); border:1px solid var(--card-border,rgba(255,255,255,0.08)); border-radius:20px; display:none; flex-direction:column; box-shadow:0 8px 40px rgba(0,0,0,0.4); overflow:hidden; }' +
    '#chat-header { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; border-bottom:1px solid var(--card-border,rgba(255,255,255,0.08)); color:var(--primary,#00b4ff); font-weight:700; font-size:15px; flex-shrink:0; }' +
    '#chat-close { background:none; border:none; color:var(--text-muted,#94a3b8); cursor:pointer; font-size:18px; padding:0 4px; }' +
    '#chat-close:hover { color:var(--text,#dbe5df); }' +
    '#chat-messages { flex:1; overflow-y:auto; padding:16px 20px; display:flex; flex-direction:column; gap:10px; scroll-behavior:smooth; }' +
    '#chat-messages::-webkit-scrollbar { width:4px; }' +
    '#chat-messages::-webkit-scrollbar-thumb { background:var(--primary,#00b4ff); border-radius:99px; }' +
    '#chat-messages::-webkit-scrollbar-track { background:transparent; }' +
    '.chat-msg { max-width:95%; padding:12px 16px; border-radius:16px; font-size:14px; line-height:1.6; word-wrap:break-word; animation:msgIn 0.3s ease; }' +
    '@keyframes msgIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }' +
    '.chat-msg.bot { align-self:flex-start; background:rgba(0,180,255,0.07); color:var(--text,#dbe5df); border-bottom-left-radius:4px; border:1px solid rgba(0,180,255,0.1); }' +
    '.chat-msg.user { align-self:flex-end; background:linear-gradient(135deg,rgba(0,180,255,0.2),rgba(199,125,255,0.2)); color:var(--text,#dbe5df); border-bottom-right-radius:4px; }' +
    '.chat-msg .src-badge { display:inline-block; font-size:9px; font-weight:700; text-transform:uppercase; padding:2px 7px; border-radius:4px; margin-bottom:6px; letter-spacing:0.06em; }' +
    '.chat-msg .src-kb { background:rgba(0,180,255,0.15); color:var(--primary,#00b4ff); }' +
    '.chat-msg .src-pagina { background:rgba(0,180,255,0.1); color:#4dd0e1; }' +
    '.chat-msg .src-supabase { background:rgba(199,125,255,0.15); color:#c77dff; }' +
    '.chat-msg .src-wikipedia { background:rgba(0,255,209,0.15); color:#00ffd1; }' +
    '.chat-msg .src-web { background:rgba(255,107,157,0.15); color:#ff6b9d; }' +
    '.chat-msg.bot a { color:var(--primary,#00b4ff); text-decoration:none; }' +
    '.chat-msg.bot a:hover { text-decoration:underline; }' +
    '.chat-msg .source { font-size:11px; color:var(--text-muted,#94a3b8); margin-top:8px; border-top:1px solid rgba(0,180,255,0.08); padding-top:6px; }' +
    '.chat-msg .sug-item { cursor:pointer; color:var(--primary,#00b4ff); padding:5px 0; font-size:13px; }' +
    '.chat-msg .sug-item:hover { opacity:0.8; }' +
    '#chat-input-area { display:flex; align-items:center; gap:8px; padding:12px 16px; border-top:1px solid var(--card-border,rgba(255,255,255,0.08)); flex-shrink:0; }' +
    '#chat-input { flex:1; background:rgba(255,255,255,0.05); border:1px solid var(--card-border,rgba(255,255,255,0.1)); border-radius:12px; padding:10px 14px; color:var(--text,#dbe5df); font-size:14px; outline:none; transition:border-color 0.2s; }' +
    '#chat-input:focus { border-color:var(--primary,#00b4ff); }' +
    '#chat-input::placeholder { color:var(--text-muted,#94a3b8); opacity:0.6; }' +
    '#chat-send { width:40px; height:40px; border-radius:50%; background:var(--primary,#00b4ff); color:#fff; border:none; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; transition:opacity 0.2s; }' +
    '#chat-send:hover { opacity:0.8; }' +
    '.chat-typing { display:flex; gap:4px; align-items:center; padding:12px 16px; }' +
    '.chat-typing span { width:8px; height:8px; border-radius:50%; background:var(--primary,#00b4ff); animation:typing 1.4s infinite; }' +
    '.chat-typing span:nth-child(2) { animation-delay:0.2s; }' +
    '.chat-typing span:nth-child(3) { animation-delay:0.4s; }' +
    '@keyframes typing { 0%,60%,100% { opacity:0.3; transform:translateY(0); } 30% { opacity:1; transform:translateY(-6px); } }' +
    '#chat-window.open { display:flex; }' +
    'html[data-theme="light"] #chat-window { background:rgba(255,255,255,0.96); }' +
    'html[data-theme="light"] .chat-msg.bot { background:rgba(0,180,255,0.05); }' +
    'html[data-theme="light"] .chat-msg.user { background:rgba(0,180,255,0.1); }' +
    'html[data-theme="light"] #chat-input { background:rgba(0,0,0,0.03); border-color:rgba(0,180,255,0.2); }' +
    '@media (max-width:480px) { #chat-window { right:12px; bottom:80px; width:calc(100vw - 24px); height:calc(100vh - 100px); border-radius:16px; } #chat-container { right:12px; bottom:12px; } }';

  document.head.appendChild(style);

  // ==================== MOTOR INTELIGENTE ====================

  function normalize(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, '').trim();
  }

  function extractKeywords(s) {
    var words = normalize(s).split(/\s+/);
    var stop = ['que','como','cual','donde','cuando','porque','para','con','sin','las','los','una','uno','del','el','la','en','es','se','su','un','de','y','a','e','i','o','u','le','les','por','al','mas','pero','esto','eso','aquello','muy','tiene','tienen','son','hay','fue','era','ser','hace','entre','todo','cada','asi','tambien','solo','sino','este','esta','esta','puede','pueden','eres','sabes','dime','cuentame','explica','describe','cuales','quien','quienes','eres','haz','podrias','puedes','dan','dame','busca','encuentra'];
    return words.filter(function(w) { return w.length > 2 && stop.indexOf(w) === -1; });
  }

  function scoreKeywords(kw, text) {
    if (!text) return 0;
    var t = normalize(typeof text === 'string' ? text : JSON.stringify(text));
    var score = 0;
    for (var i = 0; i < kw.length; i++) {
      var term = kw[i];
      var idx = t.indexOf(term);
      var count = 0;
      while (idx !== -1) { count++; idx = t.indexOf(term, idx + 1); }
      if (count > 0) {
        score += term.length * count * (count > 1 ? 1.5 : 1);
        if (kw.length > 1 && count > 0) score += 3;
      }
    }
    return score;
  }

  function buscarEnKB(kw, pregunta) {
    var best = { item: null, score: 0 };
    var pNormal = normalize(pregunta);
    KB.forEach(function(item) {
      var textScore = scoreKeywords(kw, item.a) * 2;
      var kwScore = scoreKeywords(kw, item.keywords.join(' ')) * 5;
      var qScore = scoreKeywords(kw, item.q) * 4;
      var total = textScore + kwScore + qScore;
      if (total > best.score) { best.score = total; best.item = item; }
    });
    return best.score > 8 ? best : null;
  }

  function buscarEnPagina(kw) {
    var main = document.querySelector('main') || document.body;
    var paragraphs = (main.textContent || '').split(/\n{2,}/);
    var best = { score: 0, text: '' };
    paragraphs.forEach(function(p) {
      var t = p.trim();
      if (t.length < 40) return;
      var s = scoreKeywords(kw, t);
      if (s > best.score) { best.score = s; best.text = t; }
    });
    return best.score > 3 ? best : null;
  }

  function buscarEnSupabase(kw, cb) {
    var tables = [
      { name: 'species', fields: 'nombre_comun,nombre_cientifico,descripcion,toxicidad,datos_curiosos', label: 'Especie' },
      { name: 'articles', fields: 'titulo,contenido,topico', label: 'Artículo' },
      { name: 'content_cards', fields: 'title,content,subcategory', label: 'Sección' }
    ];
    var p = tables.map(function(t) {
      var url = SUPABASE_URL + '/rest/v1/' + t.name + '?select=' + t.fields + '&limit=20';
      return fetch(url, { headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY } })
        .then(function(r) { return r.json(); })
        .then(function(data) {
          var best = { score: 0, text: '', source: '' };
          (data || []).forEach(function(row) {
            var s = scoreKeywords(kw, JSON.stringify(row));
            if (s > best.score) {
              best.score = s;
              if (t.name === 'species') best.text = '**' + row.nombre_comun + '** (' + row.nombre_cientifico + '): ' + (row.descripcion || '') + (row.datos_curiosos ? ' ' + row.datos_curiosos : '');
              else if (t.name === 'articles') best.text = (row.contenido || '').substring(0, 400);
              else best.text = '**' + row.title + '**: ' + (row.content || '');
              best.source = t.label + ': ' + (row.nombre_comun || row.titulo || row.title || '');
            }
          });
          return best;
        }).catch(function() { return { score: 0, text: '', source: '' }; });
    });
    Promise.all(p).then(function(r) {
      var sorted = r.filter(function(x) { return x.score > 2; }).sort(function(a, b) { return b.score - a.score; });
      cb(sorted.length > 0 ? sorted[0] : null);
    });
  }

  function buscarWikipedia(kw, cb) {
    var q = encodeURIComponent(kw.slice(0, 5).join(' ') + ' medusa');
    fetch('https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + q + '&srlimit=3&format=json&origin=*')
      .then(function(r) { return r.json(); })
      .then(function(d) {
        var pages = (d.query && d.query.search) || [];
        if (!pages.length) { cb(null); return; }
        var title = encodeURIComponent(pages[0].title);
        return fetch('https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&exlimit=1&titles=' + title + '&format=json&origin=*').then(function(r) { return r.json(); });
      })
      .then(function(d) {
        if (!d) { cb(null); return; }
        var pgs = d.query && d.query.pages;
        if (!pgs) { cb(null); return; }
        var pg = Object.values(pgs)[0];
        if (!pg || !pg.extract) { cb(null); return; }
        cb({
          text: pg.extract.substring(0, 600) + (pg.extract.length > 600 ? '...' : ''),
          source: 'Wikipedia: ' + pg.title,
          url: 'https://es.wikipedia.org/wiki/' + encodeURIComponent(pg.title)
        });
      }).catch(function() { cb(null); });
  }

  function buscarDDG(kw, cb) {
    var q = encodeURIComponent(kw.join(' ') + ' medusas cnidarios');
    fetch('https://api.duckduckgo.com/?q=' + q + '&format=json&no_html=1&skip_disambig=1&origin=*')
      .then(function(r) { return r.json(); })
      .then(function(d) {
        var text = d.AbstractText || d.Answer || '';
        if (text) cb({ text: text.substring(0, 500), source: 'DuckDuckGo' });
        else cb(null);
      }).catch(function() { cb(null); });
  }

  function askN8n(question, cb) {
    if (!N8N_WEBHOOK_URL) { cb(null); return; }
    fetch(N8N_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: question }) })
      .then(function(r) { return r.json(); })
      .then(function(d) { cb(d.answer || null); })
      .catch(function() { cb(null); });
  }

  function askPuter(question, cb) {
    if (typeof puter === 'undefined' || !puter.ai) { cb(null); return; }
    var systemPrompt = 'Eres un experto enciclopédico en medusas (cnidarios), biología marina, bioquímica y ciencias afines. Respondes SIEMPRE en español, con tono conversacional pero preciso. Tus respuestas deben ser detalladas, informativas y bien estructuradas, usando negritas para conceptos clave. Si no sabes algo, dilo honestamente. Si la pregunta no es sobre medusas o biología afín, responde de todas formas de manera útil y amigable. No digas que eres una IA o que no tienes acceso a información actualizada — simplemente responde como un experto.';
    puter.ai.chat(systemPrompt + '\n\nPregunta: ' + question, { model: 'openai/gpt-5.4-nano' })
      .then(function(response) {
        var text = response && response.message && response.message.content ? response.message.content : (response && response.text ? response.text : null);
        cb(text ? { text: text } : null);
      })
      .catch(function() { cb(null); });
  }

  function askGemini(question, cb) {
    if (!GEMINI_API_KEY) { cb(null); return; }
    var systemPrompt = 'Eres un experto enciclopédico en medusas (cnidarios), biología marina, bioquímica y ciencias afines. Respondes SIEMPRE en español, con tono conversacional pero preciso. Tus respuestas deben ser detalladas, informativas y bien estructuradas, usando negritas para conceptos clave. Si no sabes algo, dilo honestamente. Si la pregunta no es sobre medusas o biología afín, responde de todas formas de manera útil y amigable. No digas que eres una IA o que no tienes acceso a información actualizada — simplemente responde como un experto.';
    fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt + '\n\nPregunta: ' + question }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 900 }
      })
    })
    .then(function(r) { return r.json(); })
    .then(function(d) {
      if (d && d.candidates && d.candidates[0] && d.candidates[0].content) {
        cb({ text: d.candidates[0].content.parts[0].text });
      } else {
        if (d && d.error) console.error('Gemini error:', d.error);
        cb(null);
      }
    })
    .catch(function() { cb(null); });
  }

  var pregEjemplo = [
    '¿Cómo funciona la transdiferenciación?',
    '¿Cuántos ojos tiene una cubomedusa?',
    '¿Qué presión genera un cnidocito?',
    '¿Qué pasó con las medusas en el espacio?',
    '¿El veneno de medusa puede curar el cáncer?',
    '¿Cuál es la diferencia entre una medusa y un sifonóforo?'
  ];

  // ==================== MANEJADOR ====================

  function handle(question) {
    question = question.trim();
    if (!question) return;

    addMessage(question, 'user');
    input.value = '';
    showTyping();

    var kw = extractKeywords(question);

    function responder(html, badgeClass, badgeText, source) {
      hideTyping();
      var badgeHtml = '<span class="src-badge ' + badgeClass + '">' + badgeText + '</span>';
      addMessage(badgeHtml + html + (source ? '<div class="source">' + source + '</div>' : ''), 'bot');
    }

    function kbMatch() {
      var r = buscarEnKB(kw, question);
      if (r && r.item) {
        responder(r.item.a, 'src-kb', 'Enciclopedia Nerd', r.item.q);
        return true;
      }
      return false;
    }

    function pageMatch() {
      var r = buscarEnPagina(kw);
      if (r) {
        responder(r.text.substring(0, 400), 'src-pagina', 'Esta página', 'Encontrado en esta página');
        return true;
      }
      return false;
    }

    function supabaseMatch(cb) {
      buscarEnSupabase(kw, function(r) {
        if (r) {
          responder(r.text, 'src-supabase', 'Base de datos', r.source);
          cb(true);
        } else { cb(false); }
      });
    }

    function wikipediaMatch(cb) {
      buscarWikipedia(kw, function(r) {
        if (r) {
          var link = '<br><a href="' + r.url + '" target="_blank" rel="noopener">📖 Leer más en Wikipedia →</a>';
          responder(r.text + link, 'src-wikipedia', 'Wikipedia', r.source);
          cb(true);
        } else { cb(false); }
      });
    }

    function ddgMatch(cb) {
      buscarDDG(kw, function(r) {
        if (r) {
          responder(r.text, 'src-web', 'Web', r.source);
          cb(true);
        } else { cb(false); }
      });
    }

    function fallback() {
      var sugerencias = pregEjemplo.map(function(p) {
        var safe = p.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        return '<div class="sug-item" onclick="(function(){var i=document.getElementById(\'chat-input\');i.value=\'' + safe + '\';document.getElementById(\'chat-send\').click()})()">→ ' + p + '</div>';
      }).join('');
      responder(
        'No encontré información específica en mi base de conocimiento. Intenta con una de estas preguntas nerds:' +
        '<div style="margin-top:8px">' + sugerencias + '</div>',
        'src-web', 'Sin resultados', ''
      );
    }

    // pipeline: Puter IA > Gemini > KB > página > Supabase > Wikipedia > DDG > fallback
    askPuter(question, function(ai) {
      if (ai && ai.text) {
        responder(ai.text, 'src-kb', 'IA', 'Puter.js · GPT-5.4 Nano');
        return;
      }
      askGemini(question, function(ai2) {
        if (ai2 && ai2.text) {
          responder(ai2.text, 'src-kb', 'IA', 'Gemini 2.0 Flash');
          return;
        }
        if (N8N_WEBHOOK_URL) {
          askN8n(question, function(answer) {
            if (answer) { responder(answer, 'src-n8n', 'n8n IA', ''); return; }
            if (kbMatch()) return;
            if (pageMatch()) return;
            supabaseMatch(function(ok) {
              if (ok) return;
              wikipediaMatch(function(ok2) {
                if (ok2) return;
                ddgMatch(function(ok3) {
                  if (!ok3) fallback();
                });
              });
            });
          });
        } else {
          if (kbMatch()) return;
          if (pageMatch()) return;
          supabaseMatch(function(ok) {
            if (ok) return;
            wikipediaMatch(function(ok2) {
              if (ok2) return;
              ddgMatch(function(ok3) {
                if (!ok3) fallback();
              });
            });
          });
        }
      });
    });
  }

  function addMessage(text, role) {
    var div = document.createElement('div');
    div.className = 'chat-msg ' + role;
    if (role === 'bot') {
      div.innerHTML = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    } else {
      div.textContent = text;
    }
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    var d = document.createElement('div');
    d.className = 'chat-msg bot chat-typing';
    d.innerHTML = '<span></span><span></span><span></span>';
    d.id = 'chat-typing-indicator';
    messages.appendChild(d);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideTyping() {
    var e = document.getElementById('chat-typing-indicator');
    if (e) e.remove();
  }

  toggle.addEventListener('click', function() {
    windowEl.classList.toggle('open');
    if (windowEl.classList.contains('open')) { input.focus(); messages.scrollTop = messages.scrollHeight; }
  });
  closeBtn.addEventListener('click', function() { windowEl.classList.remove('open'); });
  sendBtn.addEventListener('click', function() { handle(input.value); });
  input.addEventListener('keydown', function(e) { if (e.key === 'Enter') handle(input.value); });
})();

# Unidades 11-20. Cada lección: palabras (ar, es, emoji), frases (ar, es), un hueco y fichas de despiste.
U = []
def unit(uid, titulo, tema, tip, lessons): U.append(dict(id=uid, titulo=titulo, tema=tema, tip=tip, lessons=lessons))
def L(nombre, words, sents, fill, extra): return dict(nombre=nombre, words=words, sents=sents, fill=fill, extra=extra)

unit('u11', 'La ropa', 'Camisa, pantalons, saya, levar…',
 '<p>«Llevar» se dice <b>levar</b>: <i>levo, levas, leva, levamos, levaz, levan</i>.</p><p>El adjetivo concuerda con la prenda: <i>un chapero negro</i>, <i>una camisa blanca</i>, <i>os pantalons curtos</i>, <i>as sayas largas</i>.</p><p>«Corto» es <b>curto</b>, y la falda es la <b>saya</b>. El <b>cacherulo</b> es el pañuelo de la cabeza del traje aragonés.</p>',
 [L('Prendas', [('camisa','camisa','👔'),('pantalons','pantalones','👖'),('saya','falda','👗'),('zapatos','zapatos','👞'),('chapero','sombrero','🎩'),('guans','guantes','🧤')],
    [('Levo una camisa.','Llevo una camisa.'),('Ella leva una saya.','Ella lleva una falda.'),('Tiengo un chapero nuevo.','Tengo un sombrero nuevo.')],
    ('Levo','zapatos.','Llevo zapatos.',['os','a','una'],'os'), ['lleva','unas']),
  L('Colors', [('blanco','blanco','⚪'),('negro','negro','⚫'),('azul','azul','🔵'),('largo','largo','📏'),('curto','corto','✂️'),('nuevo','nuevo','✨')],
    [('A camisa ye blanca.','La camisa es blanca.'),('Os pantalons son curtos.','Los pantalones son cortos.'),('Un chapero negro.','Un sombrero negro.')],
    ('A saya ye','.','La falda es larga.',['larga','largo','largos'],'larga'), ['blanco','corto']),
  L('¿Qué levas?', [('chambreta','camiseta','👕'),('peducos','calcetines','🧦'),('botas','botas','🥾'),('abrigo','abrigo','🧥'),('bufanda','bufanda','🧣'),('cacherulo','pañuelo de cabeza','🟥')],
    [('¿Qué levas hue?','¿Qué llevas hoy?'),('Levo o cacherulo.','Llevo el pañuelo.'),('Fa frío: leva o abrigo.','Hace frío: lleva el abrigo.')],
    ('Fa frío: leva','bufanda.','Hace frío: lleva la bufanda.',['a','o','os'],'a'), ['lleva','calor:'])])

unit('u12', 'Tiempo libre y deportes', 'Me cuaca leyer, chugar, nadar…',
 '<p>Para decir que algo te gusta se usa <b>cuacar</b>: <i>me cuaca</i> (me gusta), <i>no me cuaca</i> (no me gusta), <i>¿te cuaca?</i> (¿te gusta?).</p><p><b>Siempre</b>, <b>nunca</b> y <b>a vegadas</b> (a veces) dicen con qué frecuencia haces algo.</p><p>Fíjate: <b>leyer</b> (leer), <b>mosica</b> (música), <b>becicleta</b> (bicicleta), <b>esporte</b> (deporte).</p>',
 [L('Aficions', [('leyer','leer','📖'),('cantar','cantar','🎤'),('bailar','bailar','💃'),('mosica','música','🎵'),('nadar','nadar','🏊'),('correr','correr','🏃')],
    [('Me cuaca leyer.','Me gusta leer.'),('No me cuaca bailar.','No me gusta bailar.'),('¿Te cuaca a mosica?','¿Te gusta la música?')],
    ('Me','cantar.','Me gusta cantar.',['cuaca','cuacan','gusta'],'cuaca'), ['gusta','le']),
  L('Esportes', [('esporte','deporte','🏅'),('futbol','fútbol','⚽'),('pilota','pelota','🏐'),('becicleta','bicicleta','🚲'),('equipo','equipo','👥'),('ganar','ganar','🏆')],
    [('Chugo a futbol.','Juego al fútbol.'),('O nuestro equipo ha ganau.','Nuestro equipo ha ganado.'),('Voi en becicleta.','Voy en bicicleta.')],
    ('O equipo ha','.','El equipo ha ganado.',['ganau','ganar','gana'],'ganau'), ['juego','bicicleta.']),
  L('Siempre y nunca', [('siempre','siempre','🔁'),('nunca','nunca','🚫'),('a vegadas','a veces','🎲'),('chuego','juego','🧩'),('perder','perder','😞'),('amigos','amigos','🤝')],
    [('Siempre chugo con os amigos.','Siempre juego con los amigos.'),('Nunca nado en o río.','Nunca nado en el río.'),('A vegadas canto en casa.','A veces canto en casa.')],
    ('','nado en o río.','Nunca nado en el río.',['Nunca','Siempre','A vegadas'],'Nunca'), ['juego','nunca'])])

unit('u13', 'La ciudad y las tiendas', 'Ciudat, botiga, crompar, ¿cuánto costa?',
 '<p>Una ciudad es una <b>ciudat</b> (plural <i>ciudaz</i>). Una tienda es una <b>botiga</b>, la panadería es el <b>forno</b> y la farmacia, la <b>botica</b>.</p><p>«Comprar» se dice <b>crompar</b>: <i>crompo pan en o forno</i>.</p><p>Para preguntar el precio: <i>¿Cuánto costa?</i> Algo caro es <b>carero</b>; algo barato, <b>barato</b>.</p><p>Una tienda puede estar <b>ubierta</b> (abierta) o <b>zarrada</b> (cerrada).</p>',
 [L('A ciudat', [('ciudat','ciudad','🏙️'),('plaza','plaza','⛲'),('ilesia','iglesia','⛪'),('espital','hospital','🏥'),('mercau','mercado','🧺'),('botica','farmacia','💊')],
    [('A botica ye en a plaza.','La farmacia está en la plaza.'),('Bi ha un mercau en a ciudat.','Hay un mercado en la ciudad.'),('O espital ye gran.','El hospital es grande.')],
    ('A','ye en a plaza.','La iglesia está en la plaza.',['ilesia','espital','mercau'],'ilesia'), ['iglesia','está']),
  L('Crompar', [('botiga','tienda','🏪'),('forno','panadería','🥖'),('crompar','comprar','🛒'),('vender','vender','🏷️'),('diners','dinero','💶'),('pagar','pagar','💳')],
    [('Crompo pan en o forno.','Compro pan en la panadería.'),('¿Án ye a botiga?','¿Dónde está la tienda?'),('A botiga ye zarrada.','La tienda está cerrada.')],
    ('','pan en o forno.','Compro pan en la panadería.',['Crompo','Vendo','Pago'],'Crompo'), ['compro','tienda']),
  L('¿Cuánto costa?', [('cien','cien','💯'),('mil','mil','🔢'),('carero','caro','💰'),('barato','barato','🪙'),('precio','precio','🏷️'),('ubierto','abierto','🔓')],
    [('¿Cuánto costa o pan?','¿Cuánto cuesta el pan?'),('O libro ye barato.','El libro es barato.'),('A camisa costa cien euros.','La camisa cuesta cien euros.')],
    ('O libro ye','.','El libro es caro.',['carero','barato','ubierto'],'carero'), ['cuesta','mil'])])

unit('u14', 'La escuela y el trabajo', 'Treballo, escuela, medico, pastor…',
 '<p>«Trabajar» es <b>treballar</b> y el trabajo, <b>treballo</b>: <i>treballo de maitins</i> (trabajo por la mañana).</p><p>Los oficios cambian en femenino: <i>medico / medica</i>, <i>pastor / pastora</i>, <i>fornero / fornera</i> (panadero), <i>guisandero / guisandera</i> (cocinero).</p><p>«Mediodía» es <b>meyodía</b>, y «empezar» y «terminar», <b>empecipiar</b> y <b>rematar</b>.</p>',
 [L('Oficios', [('medico','médico','🩺'),('pastor','pastor','🐑'),('fornero','panadero','🥖'),('guisandero','cocinero','👨‍🍳'),('profesor','profesor','👩‍🏫'),('agricultor','agricultor','🚜')],
    [('Mi pai ye medico.','Mi padre es médico.'),('Ella ye pastora.','Ella es pastora.'),('¿En qué treballas?','¿En qué trabajas?')],
    ('Mi mai ye','.','Mi madre es médica.',['medica','medico','medicos'],'medica'), ['es','padre']),
  L('En clase', [('escuela','escuela','🏫'),('clase','clase','🧑‍🏫'),('lápiz','lápiz','✏️'),('papel','papel','📄'),('cuaderno','cuaderno','📓'),('alumno','alumno','🎒')],
    [('Escribo en o cuaderno.','Escribo en el cuaderno.'),('Os alumnos leyen un libro.','Los alumnos leen un libro.'),('Aprendemos aragonés en clase.','Aprendemos aragonés en clase.')],
    ('Escribo con un','.','Escribo con un lápiz.',['lápiz','papel','clase'],'lápiz'), ['leen','a']),
  L('A mía chornada', [('treballo','trabajo','💼'),('treballar','trabajar','🛠️'),('meyodía','mediodía','🕛'),('empecipiar','empezar','▶️'),('rematar','terminar','🏁'),('hora','hora','⏰')],
    [('Treballo de maitins.','Trabajo por la mañana.'),('A meyodía minchamos.','A mediodía comemos.'),('Remato o treballo.','Termino el trabajo.')],
    ('A','minchamos.','A mediodía comemos.',['meyodía','nuei','hora'],'meyodía'), ['comemos','trabajo'])])

unit('u15', 'Cómo me siento', 'Contento, triste, canso, malo…',
 '<p>Para decir cómo estás se usa el verbo <b>ser</b>: <i>soi contento</i> (estoy contento), <i>yes canso?</i> (¿estás cansado?), <i>ella ye triste</i>.</p><p>«Cansado» es <b>canso</b>, «enfermo» es <b>malo</b> y «resfriado», <b>refriau</b>.</p><p>En el médico: <i>tiengo calentura</i> (tengo fiebre), <i>tiengo tos</i>, <i>me fa mal a cabeza</i>. La medicina es la <b>merecina</b>.</p>',
 [L('Emocions', [('contento','contento','😊'),('triste','triste','😢'),('canso','cansado','😩'),('niervoso','nervioso','😬'),('alegre','alegre','😄'),('preocupau','preocupado','😟')],
    [('Hue soi muito contento.','Hoy estoy muy contento.'),('¿Yes canso?','¿Estás cansado?'),('Ella ye triste.','Ella está triste.')],
    ('Ella ye muito','.','Ella está muy cansada.',['cansa','canso','cansos'],'cansa'), ['estoy','está']),
  L('En o medico', [('malo','enfermo','🤒'),('calentura','fiebre','🌡️'),('tos','tos','😷'),('refriau','resfriado','🤧'),('merecina','medicina','💊'),('medico','médico','🩺')],
    [('Tiengo calentura.','Tengo fiebre.'),('Soi refriau.','Estoy resfriado.'),('Tiengo tos.','Tengo tos.')],
    ('Me fa mal a','.','Me duele la cabeza.',['cabeza','calentura','tos'],'cabeza'), ['tengo','fiebre']),
  L('Estar bien', [('sano','sano','💪'),('feliz','feliz','🥰'),('dormir','dormir','😴'),('escansar','descansar','🛋️'),('bien','bien','👍'),('mal','mal','👎')],
    [('Duermo ueito horas.','Duermo ocho horas.'),('Hue escanso en casa.','Hoy descanso en casa.'),('Soi feliz.','Soy feliz.')],
    ('Hue','en casa.','Hoy descanso en casa.',['escanso','duermo','soi'],'escanso'), ['descanso','horas'])])

unit('u16', 'El pasado', 'Ahier, yera, chugaba, estió…',
 '<p>Para lo que pasó ayer, el pasado simple: <i>charré</i> (hablé), <i>chugué</i> (jugué), <i>minchemos</i> (comimos), <i>trobó</i> (encontró).</p><p>Para lo que pasaba antes, el pasado de costumbre: <i>chugaba</i> (jugaba), <i>viviba</i> (vivía), <i>yera</i> (era / estaba).</p><p>El pasado de «ser»: <i>estió</i> (fue). <i>Aragón estió un reino.</i></p>',
 [L('Ahier', [('ahier','ayer','📅'),("antis d'ahier",'anteayer','🗓️'),('chugué','jugué','⚽'),('charré','hablé','💬'),('minché','comí','🍽️'),('trobé','encontré','🔍')],
    [('Ahier chugué con os amigos.','Ayer jugué con los amigos.'),('Ahier charré con mi pai.','Ayer hablé con mi padre.'),('Ahier minchemos pescau.','Ayer comimos pescado.')],
    ('Ahier','con mi pai.','Ayer hablé con mi padre.',['charré','charro','charrará'],'charré'), ['hablé','hoy']),
  L('Cuan yera chiquet', [('yera','era','🧒'),('viviba','vivía','🏡'),('chugaba','jugaba','🪀'),('antis','antes','⏪'),('agora','ahora','⏺️'),('nineza','niñez','👶')],
    [('Cuan yera chiquet, viviba en Chaca.','Cuando era pequeño, vivía en Jaca.'),('Chugaba en a plaza.','Jugaba en la plaza.'),('Mi lolo yera pastor.','Mi abuelo era pastor.')],
    ('Mi lolo','pastor.','Mi abuelo era pastor.',['yera','ye','estió'],'yera'), ['era','jugaba']),
  L('Historias', [('rei','rey','👑'),('reino','reino','🏰'),('castiello','castillo','🏯'),('monesterio','monasterio','⛪'),('año','año','📆'),('estió','fue','📜')],
    [('Aragón estió un reino.','Aragón fue un reino.'),('O rei viviba en o castiello.','El rey vivía en el castillo.'),('O monesterio ye viello.','El monasterio es viejo.')],
    ('Aragón','un reino.','Aragón fue un reino.',['estió','yera','ye'],'estió'), ['fue','rey'])])

unit('u17', 'Fiestas y tradiciones', 'Jota, dance, foguera, Nadal…',
 '<p>La <b>fiesta gran</b> es la fiesta mayor del pueblo. En ella hay <b>chigans</b> (gigantes), <b>capezudos</b> (cabezudos) y <b>codetes</b> (cohetes).</p><p>El <b>dance</b> es una representación con bailes y diálogos; los <b>danzans</b> bailan el <b>palotiau</b> (paloteado). Y, claro, la <b>jota</b>.</p><p>La Navidad es <b>Nadal</b> y la hoguera, la <b>foguera</b>.</p>',
 [L("Fiestas de l'año", [('Nadal','Navidad','🎄'),('carnaval','carnaval','🎭'),('fiesta gran','fiesta mayor','🎉'),('foguera','hoguera','🔥'),('codete','cohete','🎆'),('procesión','procesión','🕯️')],
    [('En Nadal minchamos con a familia.','En Navidad comemos con la familia.'),('A fiesta gran ye en agosto.','La fiesta mayor es en agosto.'),('Fan una foguera en a plaza.','Hacen una hoguera en la plaza.')],
    ('Fan una','en a plaza.','Hacen una hoguera en la plaza.',['foguera','codete','fiesta'],'foguera'), ['hacen','Navidad']),
  L('A jota y o dance', [('jota','jota','💃'),('dance','dance','🎭'),('danzán','danzante','🕺'),('palotiau','paloteado','🥢'),('gaita','gaita','🎶'),('tambor','tambor','🥁')],
    [('Bailamos a jota.','Bailamos la jota.'),('Os danzans bailan o palotiau.','Los danzantes bailan el paloteado.'),('Mi chirmán toca a gaita.','Mi hermano toca la gaita.')],
    ('Mi chirmán toca o','.','Mi hermano toca el tambor.',['tambor','gaita','dance'],'tambor'), ['la','bailo']),
  L('En a fiesta', [('chigán','gigante','🗿'),('capezudo','cabezudo','🎃'),('trache','traje','🥻'),('baile','baile','🪩'),('cantar','cantar','🎤'),('tocar','tocar','🎻')],
    [('Veigo os chigans y os capezudos.','Veo los gigantes y los cabezudos.'),('Ella leva un trache nuevo.','Ella lleva un traje nuevo.'),('Cantamos y bailamos.','Cantamos y bailamos.')],
    ('Veigo os','.','Veo los gigantes.',['chigans','chigán','capezudo'],'chigans'), ['veo','gigantes'])])

unit('u18', 'La cocina aragonesa', 'Migas, ternasco, borraja, corta…',
 '<p>Platos de Aragón: <b>migas</b>, <b>ternasco</b>, <b>borraja</b>… y de postre, <b>presiego</b> (melocotón).</p><p>En la cocina: <b>sartana</b> (sartén), <b>olla</b>, <b>cullara</b> (cuchara), <b>forqueta</b> (tenedor), <b>cuitiello</b> (cuchillo).</p><p>Para dar instrucciones se usa el imperativo: <i>corta</i> (corta), <i>chita</i> (echa), <i>cuece</i> (cuece). <i>Chita sal y aceite.</i></p>',
 [L("Platos d'Aragón", [('migas','migas','🍞'),('ternasco','ternasco','🐑'),('borraja','borraja','🥬'),('presiego','melocotón','🍑'),('castaña','castaña','🌰'),('fongos','setas','🍄')],
    [('Me cuaca o ternasco.','Me gusta el ternasco.'),('As migas son muito buenas.','Las migas son muy buenas.'),('En agüerro minchamos castañas.','En otoño comemos castañas.')],
    ('En agüerro minchamos','.','En otoño comemos setas.',['fongos','presiegos','migas'],'fongos'), ['comemos','setas']),
  L('En a cocina', [('sartana','sartén','🍳'),('olla','olla','🍲'),('cullara','cuchara','🥄'),('forqueta','tenedor','🍴'),('cuitiello','cuchillo','🔪'),('plato','plato','🍽️')],
    [('A cullara y a forqueta.','La cuchara y el tenedor.'),('O cuitiello ye en a mesa.','El cuchillo está en la mesa.'),('Bi ha aceite en a sartana.','Hay aceite en la sartén.')],
    ('Bi ha aceite en a','.','Hay aceite en la sartén.',['sartana','olla','cullara'],'sartana'), ['el','cuchara.']),
  L('Una receta', [('cortar','cortar','🔪'),('chitar','echar','🫗'),('sal','sal','🧂'),('aceite','aceite','🫒'),('cocer','cocer','♨️'),('guisar','cocinar','👩‍🍳')],
    [('Corta o pan.','Corta el pan.'),('Chita sal y aceite.','Echa sal y aceite.'),('Cuece as borrajas.','Cuece las borrajas.')],
    ('','sal y aceite.','Echa sal y aceite.',['Chita','Corta','Cuece'],'Chita'), ['echa','el'])])

unit('u19', 'Planes y vacaciones', 'Maitín, viacharé, voi a…',
 '<p>Para el futuro: <i>viacharé</i> (viajaré), <i>visitarás</i>, <i>tornaremos</i> (volveremos). O, más fácil, <b>voi a</b> + infinitivo: <i>maitín voi a viachar</i>.</p><p>«Mañana» es <b>maitín</b> y «la semana que viene», <i>a semana prosima</i>.</p><p>La playa es la <b>placha</b>, y «volver», <b>tornar</b>.</p>',
 [L('Maitín', [('maitín','mañana','🌅'),('semana','semana','📅'),('prosimo','próximo','⏭️'),('luego','pronto','⏩'),('vacacions','vacaciones','🏖️'),('tornar','volver','🔙')],
    [('Maitín voi a viachar.','Mañana voy a viajar.'),('A semana prosima visitaré a mi lola.','La semana que viene visitaré a mi abuela.'),('Tornaremos luego.','Volveremos pronto.')],
    ('Maitín voi a','.','Mañana voy a viajar.',['viachar','viacharé','viacho'],'viachar'), ['voy','viajar']),
  L('Viaches', [('tren','tren','🚆'),('autobús','autobús','🚌'),('coche','coche','🚗'),('avión','avión','✈️'),('maleta','maleta','🧳'),('billete','billete','🎫')],
    [('Viacharemos en tren.','Viajaremos en tren.'),('A mía maleta ye gran.','Mi maleta es grande.'),('¿Tiens o billete?','¿Tienes el billete?')],
    ('Viacharemos en','.','Viajaremos en avión.',['avión','maleta','billete'],'avión'), ['tren','viajaremos']),
  L('Viacharé…', [('mar','mar','🌊'),('placha','playa','🏖️'),('visitar','visitar','🗺️'),('viachar','viajar','🧭'),('nadaremos','nadaremos','🏊'),('tornaremos','volveremos','🔙')],
    [('En vacacions viacharemos ta o mar.','En vacaciones viajaremos al mar.'),('Visitaré Uesca y Chaca.','Visitaré Huesca y Jaca.'),('Nadaremos en a placha.','Nadaremos en la playa.')],
    ('Nadaremos en a','.','Nadaremos en la playa.',['placha','mar','tren'],'placha'), ['playa','nadamos'])])

unit('u20', 'La montaña', 'Tuca, refuchio, nieu, plegar…',
 '<p>En la montaña: la cumbre es la <b>tuca</b>, el refugio es el <b>refuchio</b>, la nieve es la <b>nieu</b> y el glaciar, la <b>chelera</b>.</p><p>«Viento» se dice <b>aire</b>: <i>fa aire</i> (hace viento). La mochila es la <b>muchila</b>.</p><p>«Llegar» es <b>plegar</b>; «arriba», <b>alto</b>, y «abajo», <b>abaixo</b>. <i>¡Hemos puyau ta o pico!</i></p>',
 [L('Tucas y ibons', [('tuca','cumbre','⛰️'),('ibón','lago de montaña','💧'),('chelera','glaciar','🧊'),('nieu','nieve','❄️'),('peña','roca','🪨'),('val','valle','🏞️')],
    [('Bi ha nieu en a tuca.','Hay nieve en la cumbre.'),('O ibón ye en a val.','El lago está en el valle.'),('A chelera ye muito gran.','El glaciar es muy grande.')],
    ('Bi ha nieu en a','.','Hay nieve en la cumbre.',['tuca','val','peña'],'tuca'), ['nieve','el']),
  L('O refuchio', [('refuchio','refugio','🛖'),('muchila','mochila','🎒'),('aire','viento','🌬️'),('fa frío','hace frío','🥶'),('escansar','descansar','😌'),('dormir','dormir','😴')],
    [('Dormimos en o refuchio.','Dormimos en el refugio.'),('Fa aire.','Hace viento.'),('Escansamos en o refuchio.','Descansamos en el refugio.')],
    ('Dormimos en o','.','Dormimos en el refugio.',['refuchio','muchila','aire'],'refuchio'), ['refugio','viento.']),
  L('¡Hemos plegau!', [('plegar','llegar','🏁'),('alto','arriba','⬆️'),('abaixo','abajo','⬇️'),('puyar','subir','🧗'),('baixar','bajar','🥾'),('pico','pico','🏔️')],
    [('¡Hemos puyau ta o pico!','¡Hemos subido al pico!'),('Agora baixamos ta o refuchio.','Ahora bajamos al refugio.'),('Mira abaixo: bi ha un ibón.','Mira abajo: hay un lago.')],
    ('¡Hemos','ta o pico!','¡Hemos subido al pico!',['puyau','baixau','plegar'],'puyau'), ['subido','abajo:'])])

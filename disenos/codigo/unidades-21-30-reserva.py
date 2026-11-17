# Lecciones preparadas el 17/11/2026 y guardadas para las unidades 21-30 (mismo formato que unidades-11-20-datos.py)
# Cada una: nombre, 6 palabras (ar, es, emoji), 3 frases, un hueco y fichas de despiste.
def L(nombre, words, sents, fill, extra, nombres=None): return dict(nombre=nombre, words=words, sents=sents, fill=fill, extra=extra, nombres=nombres)
RESERVA = [
  L('En o campo', [('olivera','olivo','🫒'),('almendrera','almendro','🌸'),('noguera','nogal','🥜'),('uga','uva','🍇'),('ordio','cebada','🌾'),('tocino','cerdo','🐖')],
    [('En o campo bi ha oliveras y almendreras.','En el campo hay olivos y almendros.'),('A noguera ye muito gran.','El nogal es muy grande.'),('Minchamos uga en agüerro.','Comemos uva en otoño.')],
    ('En o campo bi ha','.','En el campo hay cebada.',['ordio','uga','noguera'],'ordio'), ['el','muy']),
  L('En o lugar', [('pardal','gorrión','🐦'),('ababol','amapola','🌺'),('abella','abeja','🐝'),('caragol','caracol','🐌'),('granota','rana','🐸'),('sargantana','lagartija','🦎')],
    [('Bi ha ababols en o campo.','Hay amapolas en el campo.'),('A granota ye en o río.','La rana está en el río.'),('Un pardal canta en a plaza.','Un gorrión canta en la plaza.')],
    ('Veigo una','en a peña.','Veo una lagartija en la roca.',['sargantana','abella','granota'],'sargantana'), ['veo','la']),
  L("Animals d'o monte", [('rabosa','zorro','🦊'),('sarrio','sarrio, rebeco','🐐'),('chabalín','jabalí','🐗'),('voltor','buitre','🦅'),('crebantagüesos','quebrantahuesos','🦴'),('esquirol','ardilla','🐿️')],
    [('Bi ha sarrios en a tuca.','Hay sarrios en la cumbre.'),('A rabosa vive en o monte.','El zorro vive en el monte.'),('Veigo un voltor en o cielo.','Veo un buitre en el cielo.')],
    ('Bi ha un','en o monte.','Hay un jabalí en el monte.',['chabalín','esquirol','voltor'],'chabalín'), ['hay','el']),
  L('Árbols y flors', [('carrasca','encina','🌳'),('fau','haya','🍂'),('abet','abeto','🌲'),('chinebro','enebro','🫐'),('buxo','boj','🌿'),('flor de nieu','edelweiss','⭐')],
    [('A carrasca ye un árbol muito viello.','La encina es un árbol muy viejo.'),('En a val bi ha faus.','En el valle hay hayas.'),('A flor de nieu ye blanca.','La flor de nieve (edelweiss) es blanca.')],
    ('En a val bi ha un','.','En el valle hay un enebro.',['chinebro','buxo','abet'],'chinebro'), ['hay','el']),
]

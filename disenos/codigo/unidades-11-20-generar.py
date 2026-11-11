import json, random, sys
sys.path.insert(0, '.')
from datos import U
random.seed(11)
out = []
for u in U:
    allS = [s for l in u['lessons'] for s in l['sents']]
    vocab = []; lessons = []
    for li, l in enumerate(u['lessons'], 1):
        lid = f"{u['id']}-l{li}"; ex = []
        def add(e, lid=lid, ex=ex):
            ex.append({'id': f'{lid}-e{len(ex) + 1}', **e})
        W = l['words']; S = l['sents']
        vocab += [{'ar': a, 'es': e} for a, e, _ in W]
        for k in (0, 1):  # dos palabras nuevas
            w = W[k]; others = random.sample([x for x in W if x != w], 2)
            opts = [[w[0], w[2]]] + [[o[0], o[2]] for o in others]; random.shuffle(opts)
            add({'t': 'pick', 'es': w[1], 'answer': w[0], 'options': opts})
        add({'t': 'match', 'pairs': [[a, e] for a, e, _ in W[2:6]]})
        def choice(s):
            wrong = random.sample([x[1] for x in allS if x != s], 2)
            opts = [s[1]] + wrong; random.shuffle(opts)
            add({'t': 'choice', 'ar': s[0], 'options': opts, 'answer': opts.index(s[1])})
        choice(S[0])
        b, a, es, opts, right = l['fill']
        add({'t': 'fill', 'before': b, 'after': a, 'es': es, 'options': opts, 'answer': right})
        toks = S[1][0].split(' ')
        tiles = toks + l['extra']; random.shuffle(tiles)
        add({'t': 'build', 'es': S[1][1], 'answer': S[1][0], 'tiles': tiles})
        choice(S[2])
        add({'t': 'write', 'es': S[2][1], 'answer': S[2][0]})
        lessons.append({'id': lid, 'nombre': l['nombre'], 'ejercicios': ex})
    lessons.append({'id': f"{u['id']}-l4", 'nombre': 'Repaso', 'repaso': True})
    out.append({'id': u['id'], 'titulo': u['titulo'], 'tema': u['tema'],
                'consejo': {'titulo': 'Consejo de Dragolingüe', 'html': u['tip']},
                'vocabulario': vocab, 'lecciones': lessons, 'revisar': []})
json.dump({'secciones': [{'nombre': 'Sección 4 · La vida de cada día', 'unidades': ['u11', 'u12', 'u13', 'u14', 'u15']},
                         {'nombre': 'Sección 5 · Historia, fiestas y montaña', 'unidades': ['u16', 'u17', 'u18', 'u19', 'u20']}],
           'unidades': out}, open(sys.argv[1], 'w'), ensure_ascii=False, indent=2)
print(sum(len(l.get('ejercicios', [])) for u in out for l in u['lecciones']), 'ejercicios')

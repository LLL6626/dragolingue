import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

// Muestra el HTML sencillo de los consejos (<p>, <b>, <i>, <table><tr><td>) con componentes nativos.

function decode(s: string): string {
  return s.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
}

function Inline({ html }: { html: string }) {
  // Trocea por etiquetas <b> e <i> (se admiten anidadas de forma simple).
  const parts = html.split(/(<\/?(?:b|i|strong|em)>)/g);
  let bold = false;
  let italic = false;
  const out: { text: string; bold: boolean; italic: boolean }[] = [];
  for (const p of parts) {
    if (/^<(b|strong)>$/.test(p)) bold = true;
    else if (/^<\/(b|strong)>$/.test(p)) bold = false;
    else if (/^<(i|em)>$/.test(p)) italic = true;
    else if (/^<\/(i|em)>$/.test(p)) italic = false;
    else if (p) out.push({ text: decode(p.replace(/<[^>]+>/g, '')), bold, italic });
  }
  return (
    <>
      {out.map((o, i) => (
        <Text key={i} style={[o.bold && styles.bold, o.italic && styles.italic]}>
          {o.text}
        </Text>
      ))}
    </>
  );
}

export default function TipText({ html }: { html: string }) {
  const blocks = html.match(/<p>[\s\S]*?<\/p>|<table>[\s\S]*?<\/table>/g) ?? [html];
  return (
    <View style={{ gap: 12 }}>
      {blocks.map((block, i) => {
        if (block.startsWith('<table>')) {
          const rows = block.match(/<tr>[\s\S]*?<\/tr>/g) ?? [];
          return (
            <View key={i} style={styles.table}>
              {rows.map((row, r) => {
                const cells = row.match(/<t[dh]>([\s\S]*?)<\/t[dh]>/g) ?? [];
                return (
                  <View key={r} style={[styles.row, r > 0 && styles.rowLine]}>
                    {cells.map((c, k) => (
                      <Text key={k} style={[styles.cell, k === 0 && styles.cellAr]}>
                        <Inline html={c.replace(/<\/?t[dh]>/g, '')} />
                      </Text>
                    ))}
                  </View>
                );
              })}
            </View>
          );
        }
        return (
          <Fragment key={i}>
            <Text style={styles.p}>
              <Inline html={block.replace(/<\/?p>/g, '')} />
            </Text>
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  p: { fontSize: 16, lineHeight: 23, color: colors.ink },
  bold: { fontWeight: '700' },
  italic: { fontStyle: 'italic', color: colors.monte },
  table: { borderWidth: 1, borderColor: colors.line, borderRadius: 12, overflow: 'hidden', backgroundColor: colors.surface },
  row: { flexDirection: 'row' },
  rowLine: { borderTopWidth: 1, borderTopColor: colors.line },
  cell: { flex: 1, padding: 10, fontSize: 15, color: colors.ink },
  cellAr: { fontWeight: '700', color: colors.monte },
});

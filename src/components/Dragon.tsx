import { useId } from 'react';
import Svg, { Circle, ClipPath, Defs, Ellipse, G, Path, Rect } from 'react-native-svg';

export type Mood = 'happy' | 'cheer' | 'sad' | 'think';

const WING = 'M66 122 C34 102 12 78 14 50 C25 60 35 64 45 62 C41 74 46 84 57 88 C51 98 56 108 66 114 Z';
const STROKE = '#8E1B16';

/** Ala con la bandera de Aragón: 9 franjas (5 amarillas y 4 rojas) recortadas por la forma del ala. */
function Wing({ clipId }: { clipId: string }) {
  return (
    <G transform="translate(66 122) scale(1.3) translate(-66 -122)">
      <G clipPath={`url(#${clipId})`}>
        <G transform="rotate(-35.8 66 122)">
          {Array.from({ length: 9 }, (_, i) => (
            <Rect key={i} x={-40} y={30 + i * 10.4} width={200} height={10.6} fill={i % 2 === 0 ? '#FCDD09' : '#DA121A'} />
          ))}
        </G>
      </G>
      <Path d={WING} fill="none" stroke={STROKE} strokeWidth={3} strokeLinejoin="round" />
    </G>
  );
}

function Mouth({ mood }: { mood: Mood }) {
  switch (mood) {
    case 'cheer':
      return (
        <G>
          <Path d="M88 101 Q100 118 112 101 Z" fill="#6E1612" />
          <Path d="M93 107 Q100 112 107 107" fill="#F07A86" />
        </G>
      );
    case 'sad':
      return <Path d="M90 108 Q100 101 110 108" fill="none" stroke="#6E1612" strokeWidth={3} strokeLinecap="round" />;
    case 'think':
      return <Path d="M93 105 L108 103" fill="none" stroke="#6E1612" strokeWidth={3} strokeLinecap="round" />;
    default:
      return <Path d="M90 103 Q100 112 110 103" fill="none" stroke="#6E1612" strokeWidth={3} strokeLinecap="round" />;
  }
}

export default function Dragon({ mood = 'happy', size = 120 }: { mood?: Mood; size?: number }) {
  const clipId = 'ala' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const wingL = mood === 'cheer' ? 'rotate(14 66 120)' : mood === 'sad' ? 'rotate(-10 66 120)' : undefined;
  const wingR = mood === 'cheer' ? 'rotate(-14 134 120)' : mood === 'sad' ? 'rotate(10 134 120)' : undefined;
  const look = mood === 'think' ? -3 : 0;

  return (
    <Svg width={size} height={(size * 200) / 236} viewBox="-18 0 236 200" accessibilityLabel="Dragolingüe">
      <Defs>
        <ClipPath id={clipId}>
          <Path d={WING} />
        </ClipPath>
      </Defs>
      {/* cola */}
      <Path
        d="M128 162 C160 178 180 166 182 144 L192 148 L186 132 L176 142 C172 158 152 164 132 150 Z"
        fill="#C92A22" stroke={STROKE} strokeWidth={3} strokeLinejoin="round"
      />
      {/* alas */}
      <G transform={wingL}>
        <Wing clipId={clipId} />
      </G>
      <G transform={wingR}>
        <G transform="translate(200 0) scale(-1 1)">
          <Wing clipId={clipId} />
        </G>
      </G>
      {/* cuerpo */}
      <Ellipse cx={100} cy={142} rx={43} ry={44} fill="#D6332A" stroke={STROKE} strokeWidth={3} />
      <Ellipse cx={100} cy={150} rx={27} ry={31} fill="#F6E2B3" />
      <Path d="M78 142 H122 M76 154 H124 M79 166 H121" stroke="#E2C88E" strokeWidth={2.5} fill="none" />
      <Ellipse cx={68} cy={142} rx={9} ry={14} transform="rotate(20 68 142)" fill="#C92A22" stroke={STROKE} strokeWidth={2.5} />
      <Ellipse cx={132} cy={142} rx={9} ry={14} transform="rotate(-20 132 142)" fill="#C92A22" stroke={STROKE} strokeWidth={2.5} />
      <Ellipse cx={80} cy={184} rx={15} ry={8} fill="#C92A22" stroke={STROKE} strokeWidth={2.5} />
      <Ellipse cx={120} cy={184} rx={15} ry={8} fill="#C92A22" stroke={STROKE} strokeWidth={2.5} />
      {/* cresta y cuernos */}
      <Path d="M95 48 C86 32 98 22 104 12 C106 24 120 28 110 48 Z" fill="#B8221B" stroke={STROKE} strokeWidth={2.5} strokeLinejoin="round" />
      <Path d="M70 58 L64 42 L78 52 Z M130 58 L136 42 L122 52 Z" fill="#F6E2B3" stroke={STROKE} strokeWidth={2} strokeLinejoin="round" />
      {/* cabeza */}
      <Ellipse cx={100} cy={78} rx={41} ry={35} fill="#D6332A" stroke={STROKE} strokeWidth={3} />
      <Ellipse cx={100} cy={98} rx={23} ry={14} fill="#DE4A3F" />
      <Circle cx={93} cy={93} r={2.2} fill="#7A1A15" />
      <Circle cx={107} cy={93} r={2.2} fill="#7A1A15" />
      <Ellipse cx={70} cy={90} rx={7} ry={4} fill="#F07A86" opacity={0.7} />
      <Ellipse cx={130} cy={90} rx={7} ry={4} fill="#F07A86" opacity={0.7} />
      {/* ojos */}
      <Ellipse cx={84} cy={74} rx={11} ry={13} fill="#fff" />
      <Ellipse cx={116} cy={74} rx={11} ry={13} fill="#fff" />
      <Circle cx={85} cy={76 + look} r={8} fill="#2F7FC1" />
      <Circle cx={115} cy={76 + look} r={8} fill="#2F7FC1" />
      <Circle cx={85} cy={77 + look} r={4} fill="#0F2233" />
      <Circle cx={115} cy={77 + look} r={4} fill="#0F2233" />
      <Circle cx={88} cy={72 + look} r={2.6} fill="#fff" />
      <Circle cx={118} cy={72 + look} r={2.6} fill="#fff" />
      {mood === 'sad' && <Path d="M74 58 L92 63 M126 58 L108 63" stroke="#7A1A15" strokeWidth={3} strokeLinecap="round" />}
      <Mouth mood={mood} />
      {/* pañoleta */}
      <Path d="M70 110 Q100 118 130 110 L100 134 Z" fill="#C9A26B" stroke="#8C6A3C" strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}

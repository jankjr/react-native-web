import React from 'react';
import { interpolatePurples, interpolateBuPu, interpolateRdPu } from 'd3-scale-chromatic';

const targetSize = 25;

export default function SierpinskiTriangle({ x, y, s, depth = 0, renderCount = 0, Dot }) {
  if (s <= targetSize) {
    let fn;
    switch (depth) {
      case 1:
        fn = interpolatePurples;
        break;
      case 2:
        fn = interpolateBuPu;
        break;
      case 3:
      default:
        fn = interpolateRdPu;
    }

    return (
      <Dot
        color={fn(renderCount / 20)}
        size={targetSize}
        x={x - targetSize / 2}
        y={y - targetSize / 2}
      />
    );
  }

  s /= 2;

  return [
    <SierpinskiTriangle
      depth={1}
      Dot={Dot}
      key={1}
      renderCount={renderCount}
      s={s}
      x={x}
      y={y - s / 2}
    />,
    <SierpinskiTriangle
      depth={2}
      Dot={Dot}
      key={2}
      renderCount={renderCount}
      s={s}
      x={x - s}
      y={y + s / 2}
    />,
    <SierpinskiTriangle
      depth={3}
      Dot={Dot}
      key={3}
      renderCount={renderCount}
      s={s}
      x={x + s}
      y={y + s / 2}
    />
  ];
}

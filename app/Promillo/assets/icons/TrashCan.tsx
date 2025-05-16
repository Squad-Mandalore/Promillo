import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const TrashCan = ({ size = 24, color = 'black' }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M10 2L9 3H4v2h1v15c0 .522.191 1.055.568 1.432S6.478 22 7 22h10c.522 0 1.055-.191 1.432-.568S19 20.522 19 20V5h1V3h-5l-1-1zM7 5h10v15H7zm2 2v11h2V7zm4 0v11h2V7z"
      fill={color}
    />
  </Svg>
);

export default TrashCan;

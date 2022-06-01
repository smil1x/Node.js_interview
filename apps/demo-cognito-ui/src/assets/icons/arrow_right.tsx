import * as React from 'react';

const SvgArrowRight = (props: any) => (
  <svg width={8} height={12} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 0 .59 1.41 5.17 6 .59 10.59 2 12l6-6-6-6Z"
      fill="#000"
      fillOpacity={0.38}
    />
  </svg>
);

export default SvgArrowRight;

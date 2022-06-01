import * as React from 'react';

const SvgArrowLeft = (props: any) => (
  <svg width={8} height={12} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.41 1.41 6 0 0 6l6 6 1.41-1.41L2.83 6l4.58-4.59Z"
      fill="#000"
      fillOpacity={0.38}
    />
  </svg>
);

export default SvgArrowLeft;

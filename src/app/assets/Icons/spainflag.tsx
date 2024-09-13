import * as React from "react"
import { SVGProps } from "react"
const Spainflag = (props: SVGProps<SVGSVGElement>) => (
  <div>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={28}
    fill="none"
    {...props}
  >
    <mask
      id="a"
      width={40}
      height={28}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <rect width={40} height={28} fill="#D9D9D9" rx={4} />
    </mask>
    <g mask="url(#a)">
      <path fill="#FF473E" d="M0 19h40v9H0z" />
      <path fill="#FFB636" d="M0 9h40v10H0z" />
      <path fill="#FF473E" d="M0 0h40v9H0z" />
    </g>
  </svg>
  </div>
)
export default Spainflag

import * as React from "react"
import { SVGProps } from "react"
const Iconsearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke="#6335FF"
      strokeLinejoin="round"
      strokeWidth={0.9}
      d="M6.737 12.255a5.737 5.737 0 1 0 0-11.475 5.737 5.737 0 0 0 0 11.475Z"
    />
    <path
      stroke="#6335FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.9}
      d="M8.647 4.27a2.692 2.692 0 0 0-1.91-.79 2.692 2.692 0 0 0-1.909.79m6.034 6.372 2.864 2.864"
    />
  </svg>
)
export default Iconsearch

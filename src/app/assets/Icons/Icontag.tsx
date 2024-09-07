import * as React from "react"
import { SVGProps } from "react"
const IconTag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      stroke="#6335FF"
      d="M3.182 12.31c-1.236-1.237-1.854-1.855-2.084-2.657-.23-.802-.033-1.654.36-3.358l.227-.982c.33-1.434.496-2.15.986-2.642.491-.49 1.208-.656 2.642-.986l.982-.227C8 1.065 8.85.868 9.653 1.098c.802.23 1.42.849 2.656 2.085l1.464 1.464C15.925 6.799 17 7.874 17 9.21c0 1.337-1.075 2.412-3.227 4.563C11.621 15.925 10.546 17 9.21 17c-1.336 0-2.412-1.075-4.563-3.226L3.182 12.31Z"
    />
    <path
      stroke="#6335FF"
      d="M7.417 7.635a1.6 1.6 0 1 0-2.263-2.263 1.6 1.6 0 0 0 2.263 2.263Z"
    />
    <path stroke="#6335FF" strokeLinecap="round" d="m8.633 14.2 5.584-5.584" />
  </svg>
)
export default IconTag

import * as React from "react"
import { SVGProps } from "react"
const IconLink = (props: SVGProps<SVGSVGElement>) => (
  <div className="logout">
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    
    <path className="svg-logout"
      fill="#EBEBEB"
      d="M5.333 4A1.333 1.333 0 0 0 4 5.333V16a1.333 1.333 0 0 0 1.333 1.333H16A1.333 1.333 0 0 0 17.333 16v-.667a2 2 0 0 1 4 0V16A5.333 5.333 0 0 1 16 21.333H5.333A5.333 5.333 0 0 1 0 16V5.333A5.333 5.333 0 0 1 5.333 0H6a2 2 0 1 1 0 4h-.667Zm7.334 0a2 2 0 1 1 0-4h6.666a2 2 0 0 1 2 2v6.667a2 2 0 1 1-4 0v-1.84L14.08 10.08a2 2 0 0 1-2.827-2.827L14.507 4h-1.84Z"
    />
  </svg>
  </div>
)
export default IconLink

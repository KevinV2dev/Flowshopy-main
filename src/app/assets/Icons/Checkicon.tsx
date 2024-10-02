import * as React from "react"
import { SVGProps } from "react"
const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={32}
    fill="none"
    {...props}
  >
    <path
      fill="#3EE9B0"
      fillRule="evenodd"
      d="M16.143 32A16.001 16.001 0 0 0 27.456 4.686 16 16 0 1 0 16.143 32Zm-.413-9.529 8.889-10.667-2.73-2.275-7.645 9.171-3.956-3.957-2.513 2.514 5.333 5.333 1.376 1.376 1.246-1.495Z"
      clipRule="evenodd"
    />
  </svg>
)
export default CheckIcon

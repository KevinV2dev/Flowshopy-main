import * as React from "react"
import { SVGProps } from "react"
const CopyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#6335FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.418 14.5H6.915a.628.628 0 0 1-.411-.148.476.476 0 0 1-.17-.358V5.72c0-.134.06-.263.17-.358a.628.628 0 0 1 .411-.149h9.503c.155 0 .303.054.412.149.109.095.17.224.17.358v8.273a.476.476 0 0 1-.17.358.629.629 0 0 1-.412.148Z"
    />
    <path
      stroke="#6335FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.733 4.286V2.108a.593.593 0 0 0-.187-.43.658.658 0 0 0-.453-.178H1.64a.658.658 0 0 0-.453.178.593.593 0 0 0-.187.43v9.927c0 .161.067.316.187.43.12.114.283.178.453.178H5.4"
    />
  </svg>
)
export default CopyIcon

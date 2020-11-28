import React from "react"
import SVG from "react-inlinesvg"

// import icons (from icons folder - local file system)
import back from "./back.svg"
import backArrow from "./left-arrow.svg"
import backArrowFull from "./left.svg"
import email from "./envelope-neat.svg"
import instagram from "./instagram-simple.svg"
import facebook from "./facebook.svg"
import FaRegCopyright from "react-icons/fa"
import globe from "./globe.svg"
import message from "./smartphone-text.svg"
import messenger from "./messenger-rect.svg"
import pencil from "./pencil.svg"
import phone from "./phone-ring.svg"
import send from "./forward.svg"
import tea from "./tea.svg"
import upArrow from "./up-arrow.svg"
import upChevron from "./up-chevron.svg"
import upChevronDouble from "./up-chevron-double.svg"

const Icon = props => {
  switch (props.name) {
    case "back":
      return <SVG src={back} {...props} />
    case "back-arrow":
      return <SVG src={backArrow} {...props} />
    case "back-arrow-full":
      return <SVG src={backArrowFull} {...props} />
    case "email":
      return <SVG src={email} {...props} />
    case "facebook":
      return <SVG src={facebook} {...props} />
    case "instagram":
      return <SVG src={instagram} {...props} />
    case "location":
      return <SVG src={globe} {...props} />
    case "message":
      return <SVG src={message} {...props} />
    case "messenger":
      return <SVG src={messenger} {...props} />
    case "pencil":
      return <SVG src={pencil} {...props} />
    case "phone":
      return <SVG src={phone} {...props} />
    case "send":
      return <SVG src={send} {...props} />
    case "tea":
      return <SVG src={tea} {...props} />
    case "up-arrow":
      return <SVG src={upArrow} {...props} />
    case "up-chevron":
      return <SVG src={upChevron} {...props} />
    case "up-chevron-double":
      return <SVG src={upChevronDouble} {...props} />
    default:
      return null
  }
}

export default Icon

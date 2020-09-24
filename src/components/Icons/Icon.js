import React from "react";
import SVG from "react-inlinesvg";

// import icons (from icons folder - local file system)
import FaRegCopyright from "react-icons/fa";
import email from "./envelope-neat.svg";
import facebook from "./facebook.svg";
import messenger from "./messenger-rect.svg";
import instagram from "./instagram-simple.svg";
import globe from "./globe.svg";
import phone from "./phone-ring.svg";
import send from "./forward.svg";
import message from "./smartphone-text.svg";
import id from "./id.svg";
import fingerprint from "./fingerprint.svg";
import tea from "./tea.svg";
import subject from "./book-with-owl.svg";
import idea from "./light-bulb-idea.svg";
import pencil from "./pencil.svg";
import back from "./back.svg";
import backArrow from "./left-arrow.svg";
import backArrowFull from "./left.svg";

const Icon = props => {
	switch (props.name) {
		case "copyright":
			return <FaRegCopyright {...props} />;
		case "email":
			return <SVG src={email} {...props} />;
		case "facebook":
			return <SVG src={facebook} {...props} />;
		case "messenger":
			return <SVG src={messenger} {...props} />;
		case "instagram":
			return <SVG src={instagram} {...props} />;
		case "location":
			return <SVG src={globe} {...props} />;
		case "phone":
			return <SVG src={phone} {...props} />;
		case "send":
			return <SVG src={send} {...props} />;
		case "back":
			return <SVG src={back} {...props} />;
		case "back-arrow":
			return <SVG src={backArrow} {...props} />;
		case "back-arrow-full":
			return <SVG src={backArrowFull} {...props} />;
		case "message":
			return <SVG src={message} {...props} />;
		case "pencil":
			return <SVG src={pencil} {...props} />;
		case "tea":
			return <SVG src={tea} {...props} />;
		default:
			return null;
	}
};

export default Icon;

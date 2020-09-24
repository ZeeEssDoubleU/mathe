// @ts-nocheck
import React from "react";

// ************
// component
// ************

export const ExternalLink = React.memo((props) => {
	let target = props.href.toLowerCase();
	if (props.email) {
		target = `mailto: ${target}`;
	} else if (props.phone) {
		target = `tel: ${target}`;
	} else if (props.address) {
		target = `http://maps.google.com/?q=${target}`;
	}

	let display = props.href;
	if (props.facebook || props.instagram) {
		display = display.replace("https://www.", "");
	}

	return (
		<a
			className={props.className}
			href={target}
			rel="_blank"
			target="noopener noreferrer"
		>
			{display}
		</a>
	);
});

import React, { useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
// import components
import Nav from "../Nav/Nav";
import Background from "../elements/Background";
// impprt store
import {
	useStore,
	savePrevPath,
	saveCurrentPath,
	transitionTriggered,
} from "../../store/useStore";
// import animations
import * as anim from "../../utils/animations";

// ************
// component
// ************

const Layout = ({ children, location }) => {
	const { state, dispatch } = useStore();
	const didMountRef = useRef(false);
	const { pathname } = location;

	useEffect(() => {
		saveCurrentPath(dispatch, pathname);
		return () => {
			savePrevPath(dispatch, pathname);
		};
	}, [dispatch, pathname]);

	// effect sets nav (actually whole app) position when mounted and when pathname changes
	useLayoutEffect(() => {
		// check if transition was triggered from button press (Link, BackButton, etc)
		// if not, set page-transition elem position
		if (state.transition_triggered_page === false) {
			pathname === "/"
				? anim.enter_top_set(".page-transition")
				: anim.exit_top_set(".page-transition");
		} else {
			transitionTriggered(dispatch, false);
		}
	}, [pathname]);

	// // effect transitions nav (actually whole app) position when navigating away from home (nav)
	// // transition ignored on initial component mount
	// useEffect(() => {
	// 	if (didMountRef.current) {
	// 		if (pathname !== "/")
	// 			anim.exit_top(".page-transition", state.transition_duration_page);
	// 	} else {
	// 		didMountRef.current = true;
	// 	}
	// }, [pathname === "/"]);

	return (
		<Container>
			<Background />
			<PageTransition className="page-transition">
				<Nav pathname={pathname} />
				{children}
			</PageTransition>
		</Container>
	);
};
Layout.propTypes = {};
export default Layout;

// ************
// styles
// ************

const Container = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;

	/* TODO: debug adjust height width and positioning back */
	/* left: 0%;
	top: 33%;
	height: 33%;
	width: 25%; */

	overflow: hidden;
`;
const PageTransition = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
`;

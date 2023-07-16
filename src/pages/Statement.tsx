import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

export default function Statement() {
	const location = useLocation();
	const transfers = location.state.transfers || [];

	return (
		<h1>dasd</h1>
	);
}
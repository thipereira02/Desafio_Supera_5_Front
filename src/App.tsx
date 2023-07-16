import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import GlobalStyle from "./layouts/GlobalStyle";
import Home from "./pages/Home";
import Statement from "./pages/Statement";

function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/statement" element={<Statement />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

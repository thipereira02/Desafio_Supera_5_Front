import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import GlobalStyle from "./layouts/GlobalStyle";
import Home from "./pages/Home";

function App() {
	return (
		<>
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
			<Home />
		</>
	);
}

export default App;

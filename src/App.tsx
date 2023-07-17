import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import GlobalStyle from "./layouts/GlobalStyle";
import Home from "./pages/Home";
import Statement from "./pages/Statement";
import TransfersContext from "./contexts/TransfersContext";

import { TransfersData, Transfer } from "./interfaces/types";
import OriginalTransfersContext from "./contexts/OriginalTransfersContext";

export default function App() {
	const [transfersData, setTransfersData] = useState<TransfersData>({
		transfers: [],
		totalBalance: 0
	});
	const [originalTransfers, setOriginalTransfers] = useState<Transfer[]>([]);

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
			<TransfersContext.Provider value={{ transfersData, setTransfersData }}>
				<OriginalTransfersContext.Provider value={{ originalTransfers, setOriginalTransfers }}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/statement" element={<Statement />} />
					</Routes>
				</OriginalTransfersContext.Provider>
			</TransfersContext.Provider>
		</BrowserRouter>
	);
}
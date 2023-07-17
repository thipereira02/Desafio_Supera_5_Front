import { createContext, Dispatch, SetStateAction } from "react";
import { TransfersData } from "../interfaces/types";

interface TransfersContextProps {
    transfersData: TransfersData;
    setTransfersData: Dispatch<SetStateAction<TransfersData>>;
}

const TransfersContext = createContext<TransfersContextProps>({
	transfersData: { transfers: [], totalBalance: 0 },
	setTransfersData: () => {
		throw new Error(
			"setTransfersData function not implemented in TransfersContext"
		);
	},
});

export default TransfersContext;

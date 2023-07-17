import { createContext, useContext } from "react";

import { Transfer } from "../interfaces/types";

interface OriginalTransfersContextProps {
    originalTransfers: Transfer[];
    setOriginalTransfers: (originalTransfers: Transfer[]) => void;
}

const OriginalTransfersContext = createContext<OriginalTransfersContextProps>({} as OriginalTransfersContextProps);

export function useOriginalTransfers() {
	return useContext(OriginalTransfersContext);
}

export default OriginalTransfersContext;
import { createContext } from "react";

import { TransfersData } from "../interfaces/types";

interface TransfersContextProps {
    transfersData: TransfersData;
    setTransfersData: (transfersData: TransfersData) => void;
}

const TransfersContext = createContext<TransfersContextProps>({} as TransfersContextProps);

export default TransfersContext;
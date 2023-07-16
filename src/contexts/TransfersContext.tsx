import { createContext } from "react";

import { TransferItem } from "../interfaces/types";

interface TransfersContextProps {
    transfers: TransferItem[];
    setTransfers: (transfers: TransferItem[]) => void;
}

const TransfersContext = createContext({} as TransfersContextProps);

export default TransfersContext;
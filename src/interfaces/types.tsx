interface Transfer {
	dataTransferencia: string;
	valor: number;
	tipo: string;
	nomeOperadorTransacao: string | null;
}

export interface TransfersData {
	transfers: Transfer[];
	totalBalance: number;
}
export interface TransferItem {
	idTransferencia: number;
	dataTransferencia: string;
	valor: number;
	tipo: string;
	nomeOperadorTransacao: string | null;
	conta: {
		idConta: number;
		nomeResponsável: string;
	};
}
import React, { useContext } from "react";
import styled from "styled-components";
import { format } from "date-fns";

import TransfersContext from "../contexts/TransfersContext";

export default function Transfers() {
	const { transfersData } = useContext(TransfersContext);
	const periodBalance = transfersData.transfers.reduce((acc, transfer) => acc + transfer.valor, 0).toLocaleString("pt-BR");

	return (
		<TableContainer>
			<tbody>
				<FirstRow>
					<td colSpan={4}>
						<span>Saldo total: R$ {transfersData.totalBalance.toLocaleString("pt-BR")} </span> <span>Saldo no período: R$ {periodBalance}</span>
					</td>
				</FirstRow>
				<TableHeaderRow>
					<td>Data</td>
					<td>Valor</td>
					<td>Tipo</td>
					<td>Nome do operador transacionado</td>
				</TableHeaderRow>
				{transfersData.transfers.map((transfer, index) => (
					<TableRow key={index}>
						<td>{format(new Date(transfer.dataTransferencia), "dd/MM/yyyy")}</td>
						<td>R$ {transfer.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
						<td>{transfer.tipo}</td>
						<td>{transfer.nomeOperadorTransacao || ""}</td>
					</TableRow>
				))}
				<LastRow>
					<td colSpan={4}>Linha 7 Centralizada</td>
				</LastRow>
			</tbody>
		</TableContainer>
	);
}

const TableContainer = styled.table`
	width: 100%;
	border-collapse: collapse;
	margin-top: 2rem;
`;

const TableRow = styled.tr`
	td {
		padding: 8px;
		border: 1px solid #ccc;
	}
`;

const FirstRow = styled(TableRow)`
	span {
		font-size: 1.2rem;
		margin-right: 4rem;
	}
`;

const TableHeaderRow = styled(TableRow)`
	td {
		width: 25%;
		text-align: left;
		font-weight: 700;
	}
`;

const LastRow = styled(TableRow)`
	td {
		text-align: center;
	}
`;

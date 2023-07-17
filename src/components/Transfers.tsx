import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";

import TransfersContext from "../contexts/TransfersContext";

const pageSize = 4;

export default function Transfers() {
	const { transfersData } = useContext(TransfersContext);
	const [periodBalance, setPeriodBalance] = useState("0");
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(transfersData.transfers.length / pageSize);
	
	useEffect(() => {
		const newPeriodBalance = transfersData.transfers.length
			? transfersData.transfers.reduce((acc, transfer) => acc + transfer.valor, 0).toLocaleString("pt-BR")
			: "0";
		setPeriodBalance(newPeriodBalance);
	}, [transfersData.transfers]);

	function goToPage(page: number) {
		console.log("asdsa");
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	}

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
					<td colSpan={4}>
						<PaginationContainer>
							<ArrowButton
								onClick={() => goToPage(1)}
								disabled={totalPages <= 1 || currentPage === 1}
							>
								&lt;&lt;
							</ArrowButton>
							<ArrowButton
								onClick={() => goToPage(currentPage - 1)}
								disabled={totalPages <= 1 || currentPage === 1}
							>
								&lt;
							</ArrowButton>
							{Array.from({ length: totalPages }).map((_, index) => (
								<PageNumber
									key={index}
									onClick={() => goToPage(index + 1)}
									data-active={index + 1 === currentPage}
								>
									{index + 1}
								</PageNumber>
							))}
							<ArrowButton
								onClick={() => goToPage(currentPage + 1)}
								disabled={totalPages <= 1 || currentPage === totalPages}
							>
								&gt;
							</ArrowButton>
							<ArrowButton
								onClick={() => goToPage(totalPages)}
								disabled={totalPages <= 1 || currentPage === totalPages}
							>
								&gt;&gt;
							</ArrowButton>
						</PaginationContainer>
					</td>
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
		padding: 12px;
		border: 1px solid #e0e0e0;
		color: #333;
		background-color: #f1f7ff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
`;

const FirstRow = styled(TableRow)`
	background-color: #e4effe;
	font-weight: bold;

	span {
		font-size: 1.2rem;
		margin-right: 2rem;
	}
`;

const TableHeaderRow = styled(TableRow)`
	td {
		text-align: left;
		font-weight: bold;
		background-color: #e4effe;
		border-bottom: 2px solid #d1d9e6;
		color: #4a6da7;
	}
`;

const LastRow = styled(TableRow)`
	td {
		text-align: center;
		font-weight: bold;
		background-color: #e4effe;
		border-top: 2px solid #d1d9e6;
	}
`;

const PaginationContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const PageNumber = styled.span`
	color: #333;
	border: none;
	border-radius: 5px;
	font-size: 1rem;
	cursor: pointer;
`;

const ArrowButton = styled.button`
	color: #333;
	border: none;
	font-size: 1rem;
	cursor: pointer;
	transition: background-color 0.3s ease;
	margin: 0 0.25rem;
	pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

	&:hover {
		background-color: #34517a;
	}
`;
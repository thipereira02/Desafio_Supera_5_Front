import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Transfers from "../components/Transfers";
import TransfersContext from "../contexts/TransfersContext";
import OriginalTransfersContext from "../contexts/OriginalTransfersContext";
import { getTransferByDateAndOperator, getTransferByOperatorName, getTransfersByDate } from "../services/requests";

export default function Statement() {
	const { transfersData, setTransfersData } = useContext(TransfersContext);
	const { originalTransfers } = useContext(OriginalTransfersContext);
	const [isFilterApplied, setIsFilterApplied] = useState(false);
	const location = useLocation();
	const accountId = location.state.accountId;
	const { control, handleSubmit, watch, reset } = useForm();

	function onSubmit() {
		const formData = {
			startDate: watch("startDate"),
			endDate: watch("endDate"),
			operatorName: watch("operatorName"),
		};

		const { startDate, endDate, operatorName } = formData;

		if (startDate && endDate && operatorName) {
			getTransferByDateAndOperator(accountId, startDate, endDate, operatorName)
				.then((res) => {
					setTransfersData({
						...transfersData,
						transfers: res.data,
					});
					setIsFilterApplied(true);
				}).catch((err) => {
					toast.error("Ocorreu um erro ao buscar as transações! Tente novamente.");
					console.log(err);
				});
		} else if (startDate && endDate) {
			getTransfersByDate(accountId, startDate, endDate)
				.then((res) => {
					setTransfersData({
						...transfersData,
						transfers: res.data,
					});
					setIsFilterApplied(true);
				}).catch((err) => {
					toast.error("Ocorreu um erro ao buscar as transações! Tente novamente.");
					console.log(err);
				});
		} else if (operatorName) {
			getTransferByOperatorName(accountId, operatorName)
				.then((res) => {
					setTransfersData({
						...transfersData,
						transfers: res.data,
					});
					setIsFilterApplied(true);
				}).catch((err) => {
					toast.error("Ocorreu um erro ao buscar as transações! Tente novamente.");
					console.log(err);
				});
		}		
	}

	function handleClearFilters() {
		reset();
		setTransfersData({
			...transfersData,
			transfers: [...originalTransfers],
		});
		setIsFilterApplied(false);
	}


	return (
		<Body>
			<FormContainer 
				onSubmit={handleSubmit(onSubmit)} 
				isFilterApplied={isFilterApplied}
			>
				<InputContainer>
					<Label>Data de início</Label>
					<Controller
						name="startDate"
						control={control}
						defaultValue={null}
						render={({ field }) => (
							<StyledDatePicker
								selected={field.value}
								onChange={(date) => field.onChange(date)}
								dateFormat="dd/MM/yyyy"
							/>
						)}
					/>
				</InputContainer>

				<InputContainer>
					<Label>Data de fim</Label>
					<Controller
						name="endDate"
						control={control}
						defaultValue={null}
						render={({ field }) => (
							<StyledDatePicker
								selected={field.value}
								onChange={(date) => field.onChange(date)}
								dateFormat="dd/MM/yyyy"
							/>
						)}
					/>
				</InputContainer>

				<InputContainer>
					<Label>Nome do operador transacionado</Label>
					<Controller
						name="operatorName"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<Input {...field} type="text" />
						)}
					/>
				</InputContainer>

				<SubmitButton type="submit">Pesquisar</SubmitButton>

				{isFilterApplied && (
					<ClearFiltersButton type="button" onClick={handleClearFilters}>
						Limpar filtros
					</ClearFiltersButton>
				)}
			</FormContainer>
			<Transfers />
		</Body>
	);
}

const Body = styled.div`
    width: 100%;
    padding: 4rem 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const FormContainer = styled.form<{ isFilterApplied: boolean }>`
    display: grid;
	grid-template-rows: ${(props) => props.isFilterApplied ? "repeat(3, 1fr)" : "repeat(2, 1fr)"};
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    align-items: center;
    width: 100%;
`;

const Label = styled.label`
    color: #0d47a1;
    font-size: 1.125rem;
	font-weight: 700;
    margin-bottom: 0.5rem;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledDatePicker = styled(DatePicker)`
	padding: 0.5rem 1rem;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-size: 1rem;
	outline: none;
	background-color: #fff;
	color: #0d47a1;
`;

const Input = styled.input`
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
`;

const SubmitButton = styled.button`
    background-color: #0d47a1;
    color: #fff;
	width: 150px;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 1rem;
	grid-row: 2;
	grid-column: 3;
	justify-self: flex-end;

    &:hover {
        background-color: #003366;
        transform: scale(1.05);
    }
`;

const ClearFiltersButton = styled.button`
    background-color: #607d8b;
    color: #fff;
    width: 150px;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 1rem;
    grid-row: 3;
    grid-column: 3;
    justify-self: flex-end;

    &:hover {
        background-color: #455a64;
        transform: scale(1.05);
    }
`;
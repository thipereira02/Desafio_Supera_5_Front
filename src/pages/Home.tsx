import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";

import { getTransfers } from "../services/requests";
import TransfersContext from "../contexts/TransfersContext";

export default function Home() {
	const [accountId, setAccountId] = useState<string>("");
	const { setTransfersData } = useContext(TransfersContext);
	const navigate = useNavigate();

	function sendId(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const accountIdNumber = Number(accountId);

		const req = getTransfers(accountIdNumber);
		req.then((res) => {
			setTransfersData(res.data);
			navigate("/statement");
		}
		).catch((err) => {
			toast.error("Não foi possível encontrar o ID da conta!");
			console.log(err);
			setAccountId("");
		});
	}

	return (
		<Body>
			<Title>
				<First>Extrato</First>
				<Second>Bank</Second>
			</Title>
			<Subtitle>
                Sua vida financeira sob controle!
			</Subtitle>
			<WelcomeMessage>
                Digite o ID da sua conta para acessar todas as suas transações no ExtratoBank.
			</WelcomeMessage>
			<StyledForm onSubmit={sendId}>
				<Input 
					type="number" 
					placeholder="Digite seu ID de conta..." 
					value={accountId}
					onChange={(event) => setAccountId(String(event.target.value))}
				/>
				<SubmitButton type="submit">Buscar</SubmitButton>
			</StyledForm>
		</Body>
	);
}

const Body = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    font-size: 4rem;
    font-weight: 700;
    background-image: linear-gradient(45deg, #0d47a1, #2196f3);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
`;

const First = styled.span`
    font-weight: 900;
`;

const Second = styled.span`
    font-weight: 400;
`;

const Subtitle = styled.h2`
    color:  #4d82b8;
    margin-top: 0.5rem;
    font-size: 2rem;
`;

const WelcomeMessage = styled.p`
    color:  #4d82b8;
    margin-top: 2rem;
    font-size: 1.5rem;
    line-height: 1.5rem;
`;

const StyledForm = styled.form`
    display: flex;
    align-items: center;
    margin-top: 1rem;
`;

const Input = styled.input`
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 5px 0 0 5px;
    font-size: 1rem;
    outline: none;
    flex: 1;
    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const SubmitButton = styled.button`
    background-color: #0d47a1;
    color: #fff;
    border: none;
    border-radius: 0 5px 5px 0;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #003366;
        transform: scale(1.05);
    }
`;

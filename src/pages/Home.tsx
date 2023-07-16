import React from "react";
import styled from "styled-components";
import background from "../assets/subtle-prism.png";

export default function Home() {
	return (
		<Body>
			<Title>
				<First>Extrato</First>
				<Second>Bank</Second>
			</Title>
			<WelcomeMessage>
        Sua vida financeira sob controle! <br /> Digite o ID da sua conta para
        acessar todas as suas transações no ExtratoBank.
			</WelcomeMessage>
			<StyledForm>
				<Input type="text" placeholder="Digite seu ID de conta..." />
				<SubmitButton>Buscar</SubmitButton>
			</StyledForm>
		</Body>
	);
}

const Body = styled.div`
    background-image: url(${background});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
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

const WelcomeMessage = styled.p`
    color: #0d47a1;
    margin-top: 2rem;
    font-size: 1.5rem;
    text-align: center;
    line-height: 1.5rem;
    animation: slideIn 2s forwards;

    @keyframes slideIn {
        0% {
            opacity: 0;
            transform: translateX(-50px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

const StyledForm = styled.form`
    display: flex;
    align-items: center;
    margin-top: 2.5rem;
`;

const Input = styled.input`
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 5px 0 0 5px;
    font-size: 1rem;
    outline: none;
    flex: 1;
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

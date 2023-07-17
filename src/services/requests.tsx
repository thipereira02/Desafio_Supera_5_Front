import axios from "axios";

const BASE_URL = "http://localhost:8080";

export function getTransfers(accountId: number) {
	return axios.get(`${BASE_URL}/transfers/${accountId}`);
}

export function getTransfersByDate(accountId: number, startDate: string, endDate: string) {
	return axios.get(`${BASE_URL}/transfers/${accountId}/by-date`, {
		params: {
			startDate,
			endDate,
		}
	});
}

export function getTransferByOperatorName(accountId: number, operatorName: string) {
	return axios.get(`${BASE_URL}/transfers/${accountId}/by-operator`, {
		params: {
			operatorName,
		}
	});
}

export function getTransferByDateAndOperator(accountId: number, startDate: string, endDate: string, operatorName: string) {
	return axios.get(`${BASE_URL}/transfers/${accountId}/by-date-and-operator`, {
		params: {
			startDate,
			endDate,
			operatorName,
		}
	});
}
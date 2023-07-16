import axios from "axios";

const BASE_URL = "http://localhost:8080";

export function getTransfers(accountId: number) {
	return axios.get(`${BASE_URL}/transfers/${accountId}`);
}
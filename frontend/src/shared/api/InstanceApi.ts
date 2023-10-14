import axios, { AxiosInstance } from 'axios'
import { useSelector } from 'react-redux'

import { IToken } from 'entities/Authorization/types'
import { getUserToken } from 'entities/Users/CustomUser'

import { TOKEN_LOCALSTORAGE_KEY } from 'shared/const'

const version = '/api/v1'
const host_url = __IS_DEV__ ? process.env.REACT_APP_API_URL + version : process.env.REACT_APP_API_PROD + version
const token: IToken = JSON.parse(String(localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)))
// const token = user?.token.access

export let $api: AxiosInstance
axios.defaults.withCredentials = true
if (token?.access) {
	$api = axios.create({
		baseURL: host_url,
		headers: { Authorization: `Bearer ${token?.access}` },
	})
} else {
	$api = axios.create({
		baseURL: host_url,
	})
}

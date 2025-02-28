import { Request, response, Response } from "express"
import {
	getProductsByBrand,
	getProductPCTECHByID,
	getProductSYSCOMByID,
	getProductsPcTech, 
	getProductsSYSCOM
} from "../services/products.service"

import { handleHttp } from "../utils/error.handle"

const productsPcTech = async (req: Request, res: Response) => {
	try {
		const response = await getProductsPcTech()
		res.send(response)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEMS")
	}
}

const productsSYSCOM = async ({ body }: Request, res: Response) => {
	const { find } = body
	try {
		const response = await getProductsSYSCOM(find)
		res.send(response)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEMS")
	}
}

const productSingle = async ({ body }: Request, res: Response) => {

	try {
		const { id, origin } = body
		const response = origin ? await getProductPCTECHByID(id) : await getProductSYSCOMByID(id)
		const data = response ? response : "NOT_FOUND"
		res.send(data)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEM")
	}
}

const productByBrand = async ({ params }: Request, res: Response) => {
	try {
		const { brand } = params
		const response = await getProductsByBrand(brand)
		const data = response ? response : "NOT_FOUND"
		res.send(data)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEM")
	}
}

export { productsPcTech, productsSYSCOM, productSingle, productByBrand }

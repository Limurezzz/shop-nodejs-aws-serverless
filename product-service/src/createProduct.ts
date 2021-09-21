import { ProductServiceInterface } from "./services/products";
import { winstonLogger } from "./utils/winstonLogger";
import { errorResponse, successResponse } from "./utils/apiResponseBuilder";

export const createProductHandler = (productService: ProductServiceInterface) => async (event, _context) => {
    try {
        winstonLogger.logRequest(`Incoming event: ${ JSON.stringify( event ) }`);

        let body = event.body;
        if (typeof body === 'string') {
            body = JSON.parse(body);
        }
        const product = await productService.create(body);

        winstonLogger.logRequest(`Created product: ${ JSON.stringify( product ) }`);

        return successResponse( product );
    } 
    catch (err) {
        return errorResponse( err );
    }
}

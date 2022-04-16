import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import CognitoService from '../services/cognito';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { username } = JSON.parse(event.body);
        await CognitoService.resendConfirmationCode(username);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Successfully resent confirmation code',
            }),
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: error.message,
            }),
        }
    }
}
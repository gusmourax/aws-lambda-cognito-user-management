import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import CognitoService, { IConfirmRegistrationData } from '../services/cognito';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { username, confirmationCode } = JSON.parse(event.body) as IConfirmRegistrationData;
        await CognitoService.confirmRegistration({ confirmationCode, username });
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Successfully confirmed registration',
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
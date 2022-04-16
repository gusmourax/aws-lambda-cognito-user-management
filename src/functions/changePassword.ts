import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import CognitoService, { IChangePasswordData } from "src/services/cognito";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { newPassword, oldPassword, username } = JSON.parse(event.body) as IChangePasswordData;
        await CognitoService.changePassword({ newPassword, oldPassword, username });
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Successfully changed password',
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
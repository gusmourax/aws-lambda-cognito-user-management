import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import CognitoService, { ILoginUserData } from '../services/cognito';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { username, password } = JSON.parse(event.body) as ILoginUserData;
        const loginResult = await CognitoService.login({ username, password });
        return {
            statusCode: 200,
            body: JSON.stringify({
                username: loginResult.getIdToken().payload['cognito:username'],
                accessToken: loginResult.getAccessToken().getJwtToken(),
                refreshToken: loginResult.getRefreshToken().getToken(),
            }),
        }
    } catch (error) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: error.message,
            }),
        }
    }
}
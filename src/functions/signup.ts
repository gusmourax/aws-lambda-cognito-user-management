import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import CognitoService, { ISignupUserData } from '../services/cognito';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { email, password, phone_number, username } = JSON.parse(event.body) as ISignupUserData;
        const signupResult = await CognitoService.signup({ email, password, phone_number, username });
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Successfully signed up',
                username: signupResult.user.getUsername(),
            })
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
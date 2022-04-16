import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
    CognitoUserSession,
    ICognitoUserPoolData,
    ISignUpResult
} from "amazon-cognito-identity-js";

export interface ISignupUserData {
    username: string;
    email: string;
    password: string;
    phone_number: string;
}

export interface ILoginUserData {
    username: string;
    password: string;
}

export interface IConfirmRegistrationData {
    username: string;
    confirmationCode: string;
}

export interface IChangePasswordData {
    username: string;
    oldPassword: string;
    newPassword: string;
}

class CognitoService {
    private userPool: CognitoUserPool;

    constructor(userPoolData: ICognitoUserPoolData) {
        this.userPool = new CognitoUserPool(userPoolData);
    }

    signup({ username, email, password, phone_number }: ISignupUserData): Promise<ISignUpResult> {
        const userAttributes: CognitoUserAttribute[] = [];
        userAttributes.push(new CognitoUserAttribute({ Name: "email", Value: email }));
        userAttributes.push(new CognitoUserAttribute({ Name: "phone_number", Value: phone_number }));
        return new Promise((resolve, reject) => {
            this.userPool.signUp(username, password, userAttributes, [], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }

    confirmRegistration({ confirmationCode, username }: IConfirmRegistrationData): Promise<void> {
        const cognitoUser = new CognitoUser({ Username: username, Pool: this.userPool });
        return new Promise((resolve, reject) => {
            cognitoUser.confirmRegistration(confirmationCode, true, (err) => {
                if (err) reject(err);
                resolve();
            })
        });
    }

    resendConfirmationCode(username: string): Promise<void> {
        const cognitoUser = new CognitoUser({ Username: username, Pool: this.userPool });
        return new Promise((resolve, reject) => {
            cognitoUser.resendConfirmationCode((error) => {
                if (error) reject(error);
                resolve();
            })
        })
    }

    login({ username, password }: ILoginUserData): Promise<CognitoUserSession> {
        const cognitoUser = new CognitoUser({ Username: username, Pool: this.userPool });
        return new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(
                new AuthenticationDetails({ Username: username, Password: password }),
                {
                    onSuccess: resolve,
                    onFailure: reject,
                }
            );
        })
    }

    changePassword({ newPassword, oldPassword, username }: IChangePasswordData): Promise<void> {
        const cognitoUser = new CognitoUser({ Username: username, Pool: this.userPool });
        return new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(
                new AuthenticationDetails({ Username: username, Password: oldPassword }),
                {
                    onSuccess: () => {
                        cognitoUser.changePassword(oldPassword, newPassword, (error) => {
                            if (error) reject(error);
                            resolve();
                        })
                    },
                    onFailure: reject,
                }
            );
        });
    }
}

export default new CognitoService({
    ClientId: process.env.COGNITO_CLIENT_ID || '',
    UserPoolId: process.env.COGNITO_USER_POOL_ID || '',
});
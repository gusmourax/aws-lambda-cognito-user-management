## Gerenciador de usuários com AWS Lambda e Cognito

## Funções

- Registrar usuário
- Confirmar usuário (com código enviado por e-mail)
- Reenviar código de confirmação para o e-mail
- Login
- Alteração de senha do usuário

## Tecnologias

- [Serverless](https://www.serverless.com/) - Framework para desenvolver funções serverless com JavaScript/TypeScript.
- [AWS Cognito](https://aws.amazon.com/pt/cognito/) - Tecnologia da Amazon para gerenciamento de usuários.
- [AWS Lambda](https://aws.amazon.com/pt/lambda/) - Tecnologia da Amazon para funções Lambda.

## Antes de executar deverá configurar as variáveis de ambiente

```sh
COGNITO_CLIENT_ID=cognito_client_id
COGNITO_USER_POOL_ID=cognito_user_pool_id
```

## Como executar
```sh
yarn install
yarn dev
```

## Fazer deploy

```sh
yarn deploy
```
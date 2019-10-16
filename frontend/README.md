# Causas Comunes - Frontend

Tal vez salgan errores por la versión de node que usen.
Sugiero utilizar `nvm` como manejador de versiones de node.
A mí me funciona con lts/carbon (v8.16.1).

## DEV

```
yarn
yarn start
```

## Deployment

Nunca olvidarse de hacer build antes de pushear!

```
yarn build
git push
```


## Docker

About the making of the Dockerfile 

https://denys.dev/2018-03-02/your-angular-apps-as-docker-containers/


```
docker build --tag=causas-comunes-frontend .
docker run -dit --name ccf -p 8080:80 causas-comunes-frontend
```

## Iniciando

Para inicializar a aplicação, basta ter o Docker e o Docker Composer instalados, e rodar o seguinte comando:

```console
docker-compose up
```

## Testes

Para rodar os testes, basta rodar os seguintes comandos com os containers ainda rodando:
```console
docker-compose exec app sh -c "npm run test"
```

Se der erro no windows, adicione o prefixo "winpty" antes de todo o comando.

## Endpoints

Utilize o Insomnia para importar o insomnia.json na raiz do projeto.




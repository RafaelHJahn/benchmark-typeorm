## Descrição

Benchmark do TypeORM

## Instalação e configuração

```bash
$ npm install
```

Para configurar um banco de dados é possível utilizar o _docker-compose_ e subir o arquivo encontrado em
`./docker/postgres.yaml`.

```bash
$ docker-compose -f docker/postgres.yaml up -d
```

Caso optar por usar outro banco ou mudar a configuração do arquivo `./docker/postgres.yaml` será necessário alterar
também os dados de conexão com o banco localizada no arquivo `./src/data-source.ts`.

## Rodando a aplicação

```bash
$ npm start
```

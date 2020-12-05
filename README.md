# 포켓약국 웹 어플리케이션

## www.pocketpharm.tk

---

## 개발 환경

- Node.js 12.x LTS Erbium
- Yarn

### 1. 개발용 서버 실행

```shell
$ yarn dev
```

서버 시작 후,
[`http://localhost:3000`](http://localhost:3000) 에 접속

### 2. 배포용 서버 실행

```shell
$ yarn build & yarn start
```

서버 시작 후, nginx로 proxy 설정

---

### FrontEnd

- React.js
- Next.js

### BackEnd

- Node.js
- Express
- Sequelize
- Database: Mysql
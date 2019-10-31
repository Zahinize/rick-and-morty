# rick-and-morty
Fan page of popular American sitcom, *Rick And Morty*

## Introduction
**Rick And Morty** is a fan page that allows you to learn more about the popular characters of this American sitcom.

## Setup
Do the following steps after cloning this repository.

- Install Dependencies
```bash
npm i
```

- Run production server (default)
```bash
npm start
```
**Alternate Step**
- Run development server
  - Update `HOST_ENV` value in `./configs/config.js` file to `commonConsts.ENVIRONMENT.DEVELOPMENT` like below.
    - `HOST_ENV: commonConsts.ENVIRONMENT.DEVELOPMENT`

```bash
npm run launch
```

- Visit app url on local machine and check it in live action
```bash
App Localhost url: http://localhost:8080/
```

## React Components Architecture
```bash
<ErrorBoundary>
  <Shell>
    <MainContent>
        <Header>
        <Content>
          <CharacterCards>
            <CardContainer>
              <Card>
        <Footer>
```
All react components are self-explainable by their name. They are designed to ensure S.R.P. (Single Responsibility Principle) principle, code reusability, code quality and code testability purposes.

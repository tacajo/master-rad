# Nortik React Typescript Boilerplate

---

## Table of content

- [Description](#description)
- [Before you start](#before-you-start)
- [Project commands](#project-commands)
- [Environment variables](#environment-variables)
- [Directory structure](#directory-structure)

<a name="description"></a>

## Description

This boilerplate consist multiple templates, that can be found on different branches and includes various configurations of technologies.

| Branch Name          | Template Description                                                                                               | Is the template finished? |
| :------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------------------ |
| `templates/basic`    | React Hooks, React Router, Typescript, Aphrodite, i18next, Axios                                                   | Yes                       |
| `templates/graphql`  | React Hooks, React Router, Typescript, Aphrodite, i18next, Axios, Apollo with GraphQL                              | No                        |
| `templates/redux`    | React Hooks, React Router, Typescript, Aphrodite, i18next, Axios, Redux, Redux-Saga, Reselect                      | Yes                       |
| `templates/combined` | React Hooks, React Router, Typescript, Aphrodite, i18next, Axios, Redux, Redux-Saga, Reselect, Apollo with GraphQL | No                        |

<a name="before-you-start"></a>

## Before you start

Before you start using the application, you need to have `node` and `yarn` installed globally.

To have the code linter and formatter work properly please install the following VSCode extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

and copy the following snippet into the users settings.json:

```
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.wordWrapColumn": 120,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.eol": "\n"
```

<a name="project-commands"></a>

## Project commands

- `yarn` - Install all dependencies
- `yarn start` - Start the React application in the browser
- `yarn build` - Build the React application for the web

<a name="environment-variables"></a>

## Environment variables

The following environment variables are used in this application:

| Name | Description | Required |
| :--- | :---------- | :------- |
|      |             |          |

<a name="directory-structure"></a>

## Directory structure

```bash
build/                                           # Directory contains the generated build files (this directory is ignored by git)
node_modules/                                    # All the installed modules (this directory is ignored by git)
public/                                          # Contains the HTML file we can tweak (favicon, index.html, manifest.json, robots.txt, etc.)
src/
    |-- assets/
        |-- fonts/                               # Contains all the fonts used in the application
        |-- images/                              # Contains the images used in the application
            |-- ...

        |-- style/                               # Contains all the style used globally in components
            |-- ...

        |-- translations/                        # Contains all the translation files

    |-- components/                              # React components
        |-- container/
            |-- example-container/
                |-- ExampleContainerStyle.ts     # Component styles
                |-- ExampleContainer.tsx         # Component
        |-- ui/
            |-- example-ui/
                |-- ExampleUiStyle.ts            # Component styles
                |-- ExampleUi.tsx                # Component

    |-- config/
        |-- axios.config.ts                      # Configuration for axios
        |-- i18n.config.ts                       # Configuration for translations

    |-- hooks/                                   # Custom React hooks
        |-- ...

    |-- interface/                               # Shared Typescript interfaces
        |-- ...

    |-- pages/
        |-- example-page/
            |-- ExamplePage.tsx                  # Component
            |-- ExamplePageStyle.ts              # Component styles (CSS modules)

    |-- services/                                # Shared TypeScript services
        |-- ...

    |-- types/                                   # Shared TypeScript types
        |-- ...

    |-- utils/                                   # Utility functions
        |-- ...

    |-- constats.ts                              # Constant variables that are used in this application
    |-- index.tsx                                # Entry file
    |-- react-app-env.d.ts                       # React default type declaration
    |-- declaration.d.ts                         # Type declaration for modules that do not have @types

|-- .env                                         # Environment variables (this file is ignored by git)
|-- .eslintignore                                # File for ESlint to ignore
|-- .eslintrc                                    # ESLint configuration
|-- .gitignore                                   # File for Git to ignore
|-- .prettierignore                              # File for Prettier to ignore
|-- .prettierrc                                  # Prettier configuration
|-- package.json                                 # Dependencies and project configuration
|-- README.md                                    # This file
|-- tsconfig.json                                # TypeScript configuration
|-- yarn.lock                                    # Dependencies lock file
```

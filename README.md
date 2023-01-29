This project was bootstrapped with [Create Next App](https://nextjs.org/docs/api-reference/create-next-app), using the [TypeScript](https://nextjs.org/docs/basic-features/typescript) template.

# Walkthrough

## Setup

### Versions used

-   Node : 16.18.1
-   Yarn : 1.22.19
-   Next : 13.1.5

### Starting the app

-   **Clone this repo** <br>
-   **Run `yarn install`** <br> Install the dependecies locally.
-   **Run `yarn dev`** <br> Starts the app in development mode.

### Building the app

-   **Run `yarn build`** <br>Builds the app for production to the `build` folder.<br>

### Learn More

You can learn more in the [NextJS Documentation](https://nextjs.org/).

## References

-   Design : [Figma link](https://www.figma.com/file/ItrMUKnbUQ84zKSPDZVCEM/Unifika-2.0?node-id=24%3A2&t=UV6ZD2xHmr7pOvyN-1)

## About the code

Key dependecies :

-   `next-i18n`
-   `Zustand`
-   `SASS`
-   `Ant Design`
-   `Cypress`

### Code Style

Prettier + Lint rules are defined at the project's root.

All imports in the Next App should be absolute (with the `src/` folder as the base for all imports). See `tsconfig.json`.

Services are used to group all the interractions between the front-end and the back-end. When using services functions, make sure you have a basic error handling mechanism set in place.

To simplify imports, when creating a new component, please add its reference in the `components/index.ts` file. After, you can easily import any component with :

```
import { Component } from 'components'
```

The same should apply to pages, utilities functions and services.

### Translations

`i18n` is used to handle all the translations of the app. The basic setup is done in `src/next-i18next.config.js`.

The locales files (containing the actual translations) are stored in the `public/locales/{"en"|"fr"}/common.json`.

To access the translations in the React App, see the `useTranslation` hook [documentation](https://react.i18next.com/latest/usetranslation-hook).

There is a component (`<IntlBtn>`) already implemented to handle the switch between languages. It also changes the locales for `dayjs` and `Ant Design`.

### Stores

`Zustand` is used to handle the data in the store. You cand find more information on their [documentation](https://zustand-demo.pmnd.rs/)

The store is configured in the `src/store/{slice}.ts` file. Each slice handle a specific data key in the store (`UserSlice` = `state.user`). See the configuration file and the documentation for more informations.

### Forms

Insted of implementing a validation logic for each form, please refer to [Ant Design's Form Component](https://ant.design/components/form/#API).

<!-- ### Tables

With the help of `AG-Grid`, the tables are managed through 2 main files.

-   `src/components/Table.js`
    <br>This file acts as an interface over `AG-Grid`. Normally, this file should not have to be modified (except in the early stages of the project). When given an instance, it loads the data, displays the rows/columns, handles the pagination and implements the filtering/sorting system.

-   `src/constants/tables.js`
    <br>Here, declare all the possible tables the can be instantiated. A definition usually includes the columns, the fetcher and the possible actions that can be done one this Table.
    <br><br>To help manage some entities, `TableForms` can be setup (see `useTableFrom` hook and `src/components/TableForms/`).

Once a table instance is defined, all you have to do to display it in the app is :

```
<Table instance='instance_name' />
``` -->

<!-- ### Charts

The charts should be developped using `Highcharts` ([documentation](https://www.highcharts.com/)). -->

<!-- ### Abilities Manager

To handle the permissions in the app, `CASL` ([documentation](https://casl.js.org/v4/en/package/casl-react)) is used. After definining the abilities for a specific user, you can use the `<Can>` component to display contents according to the level of access of said user.

`src/ability.js` is the basic configuration file, while `src/contants/abilities` defines the specific actions possible to each user rank.

After signing in, the abilities are automatically updated.

Here is a basic example on how to use the `<Can>` component :

```
// constants/abilities.js
...
if (user.rank === 1)
	can(['read', 'edit'], 'book')
if (user.rank === 2)
	can(['read'], 'book')
...

// index.js
<Can do='read' on='book>
	<button>Read book !</button>
</Can>

<Can do='edit' on='book>
	<button>Edit book ...</button>
</Can>
```

The two buttons will be visible if the user's rank = 1. If it is = 2, only the first button will be visible. Else, no button will be shown. -->

### Assets

The `src/assets/` folder contains all the assets for the app :

-   Images
-   Scripts
-   Styles

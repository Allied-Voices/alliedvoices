# Allied Voices

This web app is intended to help users navigate their racial landscape through data and positive resources.

## Tech Stack

We are building the front-end with [React](https://reactjs.org/) and deploying it to [Netlify](https://www.netlify.com/). Data is stored on [Airtable](https://airtable.com/tblQ7bsHsatEqVdV0/viwUWfuMz2txq5h50?blocks=bipaNlSeLZIeB6tl3).

## Getting Started

1. Clone this project and navigate to the project directory.

2. Install dependencies: `npm install`. If you are using npm 7 +, use the `--legacy-peer-deps` flag.

3. Install git hooks: `npm run prepare`. We are using [Husky](https://github.com/typicode/husky#usage).

4. Set environment variables in a `.env` file in the root directory of the project.

```
AIRTABLE_API_KEY=(KEY)

AIRTABLE_BASE_ID=(BASE_ID)
```

The [Airtable API](https://airtable.com/appO27pGCbnEq4l31/api/docs#javascript/introduction) for this project provides these values.

5. Run the dev server: `npm run dev`.

## Environments

[Staging](https://alliedvoices-staging.netlify.app) will be redeployed any time a merge request is done on the `staging` branch.

[Production](https://www.alliedvoices.org) will be redeployed any time a merge request is done on the `master` branch.

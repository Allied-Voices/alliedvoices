# Allied Voices 
A web applicaion intended to help users navigate their racial landscape through data and positive resources.

The application uses React on the frontend and is deployed through Netlify. Data for Allied Voices is stored in [Airtables](https://airtable.com/tblQ7bsHsatEqVdV0/viwUWfuMz2txq5h50?blocks=bipaNlSeLZIeB6tl3).

## Development
To set up locally:
1. Clone project
2. npm install inside of the project
3. To use serverless functions locally we need to use netlify dev. To do so, follow the prerequisites in the following guide: https://github.com/netlify/cli/blob/master/docs/netlify-dev.md. The step on linking the project to a siteID can be ignored.
4. When running locally, the serverless functions will make requests to Airtable's endpoints. For this work, the following must be done:
  a. Create .env file in the root of the AlliedVoices
  b. Add AIRTABLE_API_KEY={Airtable API Key Goes Here} and AIRTABLE_BASE_ID={Base ID Goes here} to the .env file
  c. Find the API Key and Base Id [here](https://airtable.com/appO27pGCbnEq4l31/api/docs#javascript/introduction) and add it to the statements in step b above accordingly.
5. Run 'netlify dev' in the terminal to run the applcation locally.

## Environment
Allied Voices is currently deployed into two environments, staging, and production.

Staging can be found [here](https://alliedvoices-staging.netlify.app) and will be redeployed anytime a merge request is done on the staging branch.

Production can be found [here](https://www.alliedvoices.org) and will be redeployed anytime a merge request is done on the master branch.

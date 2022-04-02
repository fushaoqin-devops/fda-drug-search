##Installing Mongodb Atlas to use the database server
- https://www.mongodb.com/try/download download appropriate installation file for Mongodb Atlas according to your system specifications and setup Atlas with your username and password.
- Open terminal and run DATABASE_URL=“mongodb+srv://yourName:YourPassword@cluster0.p2buc.mongodb.net/fda_drug?retryWrites=true&w=majority”
- BASE_URL=“http://localhost:3000”

## Running Local Development
Open a terminal inside your project repository and run the following commands
- [http://localhost:3000](http://localhost:3000).
- Reference [Next.js Documentation](https://nextjs.org/docs) for features and API.

## Dev Workflow

- Checkout a local feature branch
- git checkout -b <your_name>-<short_description>
- Save changes and push to remote feature branch
- git add . && git commit "commit description"
- git push origin <feature-branch-name> (Add -u after push to set up upstream so can use git push later instead)
- Create a PR
- Merge if approved

## Search Functionality

- Used Vector Space Model for each token of the drug name
- If no token from query string found in db, fall back to edit distance on wildcard search of product names
- Once user confirms on a search result, direct to the drug information page and use inverted index on ingredients to show other drugs with same ingredients

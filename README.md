## Running Local Development

- npm run dev
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

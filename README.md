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
- Each token's weight are extracted as a vector, then multiplied and normalized with query
- Restuls are sorted in cosine similarity from high to low, with pageinated result (10 per page)
- If no token from query string found in db, fall back to edit distance on wildcard search of product names
- Query is run against all wildcard search returned names to calculat edit distance
- Results are ranked based on the number of edit distance, from low to high
- Once user confirms on a search result, direct to the drug information page
- Uses openFDA drug api endpoint (https://open.fda.gov/apis/drug/label/) to retrieve relevant drug information
- Uses UCI ML Drug Review dataset (https://www.kaggle.com/datasets/jessicali9530/kuc-hackathon-winter-2018) for drug reviews
- Uses inverted index on drug ingredients to retrieve other drugs that have the exact same active ingredients

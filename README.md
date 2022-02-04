## Setting Up For Local Development

- Sample Data included in repo

- Install Postgresql (mostly SQL statements, details here: https://www.postgresql.org/docs)
- Create new user and database with superuser
  - psql -U postgres
  - CREATE DATABASE fda_drug;
  - CREATE USER <your_user_name> WITH PASSWORD 'your_password';
  - GRANT ALL PRIVILEGES ON DATABASE fda_drug TO <your_user_name>;
  - \c fda_drug
  - CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  - \q
- Login with new user
  - psql -d fda_drug -U <your_user_name>
  - CREATE TABLE ingredients (
    id uuid DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    product_name TEXT,
    PRIMARY KEY (id)
    );
  - load data into db: \copy ingredients(name, product_name) FROM 'path_to_csv' with (format csv, header true, delimiter ',');
- Install Dependencies
  - npm ci
- Prisma basic operations (Details here: https://www.prisma.io/docs)

  - Create a .env file with key value pair: DATABASE_URL:"postgresql://<user_name>:<password>@localhost:5432/<db_name>?schema=public"
  - Pull schema from db (if changes made in db from psql cli): npx prisma db pull
  - Push schema from prisma (if changes made in schema.prisma file): npx prism db push
  - Generate client: npx prisma generate
  - Viewing data: npx prisma studio

- Running Local Development
  - npm run dev
  - [http://localhost:3000](http://localhost:3000).
  - Reference [Next.js Documentation](https://nextjs.org/docs) for features and API.

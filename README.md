- npm install
- Run postgres either locally or on the cloud (neon.tech)
  docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
- Copy over all .env.example files to .env
- Update .env files everywhere with the right db url
- Go to `packages/db`
  - npx prisma migrate dev
  - npx prisma db seed
- Go to `apps/user-app` , run `npm run dev`
- Try logging in using phone - 1111111111 , password - alice
~
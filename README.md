## Project Title
### SectionX App

## Description

This is a web application that allows users to create and manage their own sections and posts in a portfolio. Users can log in securely and add new sections or posts, which will only be visible to themselves. The app is built with Next.js, Prisma (PostgreSQL), CSS, JavaScript, React Redux, RTK Query, React Spring and NextAuth.

## Getting Started

### Prerequisites
Node.js (v14 or later)
PostgreSQL database
### Installation
1. Clone the repository:
```bash
git clone https://github.com/Madina-12/SectionX.git

cd 12_prisma_auth
```

2. Install the dependencies:
```bash
npm install
```

3. Setup the database and NextAuth:
  - Create a new PostgreSQL database, OAuth apps for both Github and Google and user with the required permissions.
  - Copy the .env.example file to .env.local and update the DATABASE_URL, GITHUB_ID,GITHUB_SECRET,GOOGLE_ID,GOOGLE_SECRET variables with your own database credentials.

4. Start the development server:
```bash
npm run dev
```

5. Open the app in your browser:
```bash
http://localhost:3000/
```
## Features
 - User authentication with NextAuth
 - Create new sections and posts
 - Edit or delete existing sections and posts
 - Private sections and posts that are only visible to the owner
 - Responsive design with CSS
 - Animations with React Spring

## Technologies Used
 - Next.js
 - Prisma (PostgreSQL)
 - CSS
 - JavaScript
 - React Redux
 - RTK Query
 - NextAuth
 - React Spring

## Contributing
Contributions are welcome! If you have any suggestions or find any bugs, please create an issue or submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE.txt).

## Acknowledgments
 - Thanks to OpenAI for providing the GPT-3 language model that was used to generate this README file!

<div align='center'>
  <img
    width='250'
    src='./client/src/img/logo.png'
    alt='logo'
  />
</div>

<p align='center'>
  A recipe application based on allergens, preferences, and meal planning.
</p>

<hr>

<details>
  <summary>Table of Contents</summary>
  <ul>
    <li>
      <a href='#conversion-statistics'>
        Conversion Statistics
      </a>
    </li>
    <li>
      <a href='#about-the-project'>
        About the Project
      </a>
      <ul>
        <li>
          <a href='#built-with'>
            Built With
          </a>
        </li>
      </ul>
    </li>
    <li>
      <a href='#getting-started'>
        Getting Started
      </a>
      <ul>
        <li>
          <a href='#prerequisites'>
            Prerequisites
          </a>
        </li>
        <li>
          <a href='#installation'>
            Installation
          </a>
        </li>
      </ul>
    </li>
    <li>
      <a href='#contributing'>
        Contributing
      </a>
    </li>
    <li>
      <a href='#contact'>
        Contact
      </a>
    </li>
    <li>
      <a href='#acknowledgements'>
        Acknowledgements
      </a>
    </li>
  </ul>
</details>

## Conversion Statistics

- Test coverage:&emsp;&emsp;0%&ensp;-->&ensp;25%
- Longest line length:&emsp;&emsp;188&ensp;-->&ensp;94 chars
- Longest file length:&emsp;&emsp;177&ensp;-->&ensp;162 lines
- Front-End JS -> TS files:&emsp;&emsp;19&ensp;-->&ensp;28
- Back-End JS -> TS files:&emsp;&emsp;8&ensp;-->&ensp;15
- Unused variables/imports:&emsp;&emsp;51&ensp;-->&ensp;0
- Other ES Lint errors:&emsp;&emsp;4&ensp;-->&ensp;0
- Commented out code:&emsp;&emsp;35&ensp;-->&ensp;0 lines

## About the Project

Users can sign up to **Safood** to save their allergens, allowing it to filter out recipes that don't conform to their dietary needs. They can choose times for events, enabling it to come up with a meal plan based on the group's combined allergies.

### Built With

- [React](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

You need to have:

- A [Firebase](https://firebase.google.com/) account
- Installed Node Version Manager
- Installed the latest LTS version of Node

```shell
nvm install npm@latest -g
```

### Installation

- Clone the repo

```shell
git clone https://github.com/OmarZubaidi/safood.git
```

- Install NPM packages

```shell
cd client
npm i
cd ../server
npm i
```

- Create your `.env` file in the `server` folder as below.abs

```
HOST=Your_host_name_if_deployed
PORT=Your_chosen_port_number
```

- Similarly for the `.env.local` file in the `client` folder.

```
REACT_APP_FIREBASE_API_KEY=Your_Firebase_API_Key
REACT_APP_FIREBASE_AUTH_DOMAIN=Your_Your_Firebase_Authentication_Domain
REACT_APP_FIREBASE_PROJECT_ID=Your_Firebase_Project_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=Your_Firebase_Storage_Bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=Your_Firebase_Sender_ID
REACT_APP_FIREBASE_APP_ID=Your_Firebase_Application_ID
REACT_APP_SERVER_HOST=As_above
REACT_APP_SERVER_PORT=As_above
```

- Run the server in a terminal

```
cd server
npm start
```

- Run the client in another terminal (should automatically open to http://localhost:3000/)

```
cd client
npm start
```

## Contributing

Contributions are welcome!

If you have a suggestion that would make this better:

- [Fork the project](https://github.com/OmarZubaidi/safood/fork).
- Create a branch using `git checkout -b feature-YOUR_FEATURE_NAME`.
- Work on it and commit changes using `git commit -m 'YOUR_COMMIT_MESSAGE'`.
- Push to your branch using `git push origin feature-YOUR_FEATURE_NAME`.
- [Open a pull request](https://github.com/OmarZubaidi/safood/compare).

## Contact

Original Project Owner: [Gabriele Zannini](https://github.com/CosmicZanna/).

Original Project Link: [on GitHub](https://github.com/CosmicZanna/safood/).

Creators: [Nick Allen](https://github.com/nicallennn/) and [Omar Zubaidi](https://github.com/OmarZubaidi/).

Project Link: [on GitHub](https://github.com/OmarZubaidi/safood/).

## Acknowledgements

- [Spoonacular](https://spoonacular.com/)
<h1 align="center">
  👨‍💻 Devcord 💬
</h1>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=79A6F5&labelColor=0A1033">
</p>

## 💻 Project

Chat application inspired on Discord, developed with, NextJs and Supabase.
Enter with your github username to have your profile image and name, and chat with your friends!

## 🛠 Features

- [ ] Realtime update;
- [ ] Send/Delete stickers and messages;
- [ ] Database storage (create and delete messages/sticker);
- [ ] Responsive layout;
- [ ] GithubAPI fetch (username and location);
- [ ] Navigation with parameters;
- [ ] State management with hooks (useState, useEffect);
- [ ] Deploy (Vercel);

## ✨ Technologies

- [ ] React
- [ ] Next
- [ ] Javascript
- [ ] Supabase
- [ ] Fetch
- [ ] React Navigation
- [ ] Vercel Deploy
- [ ] SkynexUI components

## 🔖 Layout

![login](.github/login.png?style=flat)
![chat](.github/chat.png?style=flat)

## 👨‍💻 Getting started

Git clone this repository, run **yarn** or **npm install** to install project dependencies. After that, start the project:

```cl
yarn dev
```

Create a new project on Supabase, and create a table with the following attributes:

```
id: int8
createdAt: timestamp
from: text
text: text
```

Replace the following values in the project:

```javascript
//chat.js
const SUPABASE_ANNON_KEY = 'YOUR_KEY';
const SUPABASE_URL = 'YOUR_URL';

supabaseClient.from('YOUR_TABLE_NAME');
```

## 📄 Licence

This project is under MIT license. Check the [LICENSE](LICENSE.md) file for more details.

<br />

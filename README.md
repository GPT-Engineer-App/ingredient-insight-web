# ingredient-insight-web

A web app that takes camera capture, finds and reads the ingredients of the product in the image using an existing backend (write a placeholder for the API call), it responds with the explanation for each of the ingredients.
- Use the getUserMedia API
- When the user clicks to capture photo, the app should ask for permissions to use the camera. 
- Once permissions are granted, it should display the video stream.
- The user should be able to capture a image, which gets saved to a variable in base64.

- The ingredients are returned in risk order, from least beneficial for health to most benign. 

INGREDIENT NAME
LEVEL OF RISK FOR HEALTH 
WHY IS IT RISKY 

This is a prototype but please sure you implement ALL the user stories, mocking and using dummy data when possible. We will validate the prototype by running through EVERY SINGLE user story, so we should be able to complete every single task.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/ingredient-insight-web.git
cd ingredient-insight-web
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Tech stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Chakra UI](https://chakra-ui.com/)

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

# Ordinateur

<!-- Badge(s) -->

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
![Dropbox](https://img.shields.io/badge/Dropbox-%233B4D98.svg?style=for-the-badge&logo=Dropbox&logoColor=white)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

<!-- End of Badge(s) -->

This is the repository for the official website of Ordinateur, the Computer Science Society of Hansraj College, University of Delhi.

## Architecture

The website uses Next.js, with Typescript and Tailwind. It is deployed as a static site on Render.com's CDN.
There are two branches `main` and `dev`. `dev` acts as the development branch, reflecting the current state of development of the project. `main` acts as the release branch.

A distinction has been made between the _code_ and the _content_. The content visible on the website is not present in this repository. It is stored in a Dropbox folder. When the app is built on Render's server, the content is downloaded from Dropbox and used to build the "contentful" website. This saves the code and content from being coupled (however, the code expects the content to be in a certain format, reflected in the Typescript interface in `utils/getContent.ts`).

Every time a PR from `dev` to `main` is merged, Render makes an automatic deployment. Thereafter, _Render_ purges the cache on its CDN and deploys the latest code on `main`.

## How to Replicate

**Case in point**: You want to use this repo to create a similar website (maybe make a few changes with the _code_, and not just the _content_) and deploy it as you please, on a Render account that is in your name.

Here are the steps you can follow:

1. Fork this repo into your GitHub account.
2. Create a Render account.
3. Create a Dropbox account. Create a scoped app from the App Console. You can now place your content in a subfolder of this app folder, in Dropbox. Note the path of the subfolder relative to the app folder (for example, `/content`). Obtain a refresh token for the app.
4. Deploy your forked repo to Render, as a static site.
5. Use `.env.example` in the repo to provide environment variables to Render (provide the correct values as obtained in step 3)
6. In your repo, create a `dev` branch. Protect the `main` branch if you want to avoid direct pushes.
7. Attach a domain, if you have one, through the Render dashboard for your static site.

## License

MIT

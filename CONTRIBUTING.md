# How to contribute?

This repo has two branches: `main` and `dev`. `main` is a protected branch and serves as the release branch for the project. `dev` shows the current development state of the project.

`dev` is periodically merged into `main` when it reaches a stage of maturity, through a PR. A GitHub Actions workflow takes care of building the website as a static site, and deploying it onto _Render.com_'s CDN.

Here are the rules of contribution:

- To make a change or to address an issue, fork the `dev` branch and make a PR.
- Use `commitizen` to make commits in your fork. Either install `commitizen` globally using `npm install -g commitizen` and make commits using `git cz`, or use `npm run com` instead.

**Note**: This project uses `husky` for git hooks. Whenever you make a commit, the hooks make sure that there are no formatting, linting and type issues. The commit is rejected if there are any such issues. If for whatever reason, `husky` does not seem to be working, just run `npm run prepare`.

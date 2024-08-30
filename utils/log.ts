import chalk from "chalk";

export const logError = (message: string) => {
  console.error(`${chalk.bgRed(" ERROR! ")} ${chalk.redBright(message)}`);
};

export const logSuccess = (message: string) => {
  console.log(`${chalk.bgGreen(" SUCCESS! ")} ${chalk.greenBright(message)}`);
};

export const logInfo = (message: string) => {
  console.log(message);
};

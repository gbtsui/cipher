import chalk from "chalk"

export default function help() {
    console.log(chalk.blue("help! \n"))
    // lowkey gotta fill this out innit
    console.log(chalk.greenBright("help") + "\n\twhat you're seeing rn.")
    console.log(chalk.greenBright("create-encryption-system") + "\n\tcreate an encryption system!!!" + chalk.redBright("NOT IMPLEMENTED YET")) 
    console.log(chalk.greenBright("exit") + "\n\tclose the program.")
    console.log(chalk.greenBright("list-ciphers") + "\n\tget a list of ciphers from your config folder.")
}
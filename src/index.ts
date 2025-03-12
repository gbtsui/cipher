import { program } from "commander";
import chalk from "chalk";
import * as readline from "readline";
import fs from "node:fs/promises";
import path from "node:path"

import addslashes from "./dev-utils/add-slashes"

import help from "./commands/help"
import { GetCipherConfigs, ListCiphers } from "./dev-utils/config-loader";
import { Cipher } from "./types";

console.log("hello world!");

let isInteractiveMode: boolean = false

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "==> "
})

program
    .version("1.0.0")
    .description("a cli tool for encrypting and decrypting data based on a set of rules.")

function printIntroText() {
    console.clear()
    console.log(chalk.green(" ______     __     ______   __  __     ______     ______    "));
    console.log(chalk.green("/\\  ___\\   /\\ \\   /\\  == \\ /\\ \\_\\ \\   /\\  ___\\   /\\  == \\   "));
    console.log(chalk.green("\\ \\ \\____  \\ \\ \\  \\ \\  _-/ \\ \\  __ \\  \\ \\  __\\   \\ \\  __<   "));
    console.log(chalk.green(" \\ \\_____\\  \\ \\_\\  \\ \\_\\    \\ \\_\\ \\_\\  \\ \\_____\\  \\ \\_\\ \\_\\ "));
    console.log(chalk.green("  \\/_____/   \\/_/   \\/_/     \\/_/\\/_/   \\/_____/   \\/_/ /_/ "))
    console.log(chalk.gray("run ") + chalk.blue("help") + chalk.gray(" to get a list of commands."))
}

async function startInteractiveMode() {
    printIntroText();

    isInteractiveMode = true;
    rl.prompt();

    rl.on("line", async (line: string) => {
        const args = line.trim().split(" ");
        const command = args[0].toLowerCase();

        switch (command) {
            case "help":
                help();
                break;
            case "exit":
                exit();
                break;
            case "biofuel":
                biofuel();
                break;
            case "list-ciphers":
                await ListCiphers();
                break;
            case "load-config":
                //await loadConfig();
                break;
            case "get-cipher":
                await GetCipherConfigs(args[1]);
                break;
            case "encode":
                const ciphers: Array<Cipher> | null | undefined = await GetCipherConfigs(args[1]);
                
                if (!ciphers) {
                    return
                }

                let result: string = addslashes(args.slice(2).join(" "));
                

                ciphers.forEach(cipher => {
                    result = cipher.encode(result)
                })
                    
                //let result = ciphers[0].encode(args.slice(2).join(" "))
                console.log(result);
                break;
            default:
                console.log(chalk.red("command not found! run " + chalk.blue("help") + chalk.red(" to find a list of available commands.")))
        }
        rl.prompt()

    }) 

}

/*
async function loadConfig() {
    try {
        const configPath = path.join(__dirname, "../config/config.json")
        const fileExists: boolean = await fs.access(configPath).then(() => true).catch(() => false)

        if (!fileExists) {
            console.log("config file doesn't exist, creating default file...")
            const defaultConfigData = {
                "skibidi": true
            }
            await fs.writeFile(configPath, JSON.stringify(defaultConfigData));
            console.log("config file written.")
            return
        } else {
            console.log(await fs.readFile(configPath, "utf8"));
            return;
        }
    } catch (error) {
        console.error(error)
    }
}
*/
function exit() {
    console.log(chalk.green("thanks for using this tool!"))
    process.exit(0)
}

function biofuel() {
    console.log(chalk.redBright("err: in_progress"))
}

startInteractiveMode()
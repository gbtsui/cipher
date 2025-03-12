import path from "node:path"
import fs from "node:fs/promises"
import chalk from "chalk"

import { AlphabetList, Cipher, CipherConfiguration } from "../types"
import { CaesarCipher } from "../functions/caesar"

export async function ListCiphers() {
    const files = await fs.readdir(path.join(__dirname, "../../config"))
    files.forEach(file => {
        console.log(chalk.blue(file.split(".")[0]))
    })
    return;
}

export async function GetCipherConfigs(name: string) {
    if (name === undefined || name === null || name === "") {
        console.log(chalk.red(`Please provide a cipher name!!`))
        return
    }
    const filePath = path.join(__dirname, "../../config/ciphers/" + name + ".json")
    console.log(`Reading cipher from ${filePath}.`)
    const fileExists: boolean = await fs.access(filePath).then(() => true).catch(() => false)
    
    if (!fileExists) {
        console.log(chalk.red(`Cipher ${name} not found!!! Are you sure you have the right name?`))
        return null
    }

    const config: {ciphers: Array<CipherConfiguration>, alphabets: Array<string>} = JSON.parse(await fs.readFile(filePath, "utf8"))
    
    let alphabets: AlphabetList = []

    for (const alphabet of config.alphabets) {
        const charsetFilePath = path.join(__dirname, "../../config/charsets/" + alphabet + ".json")
        await fs.readFile(charsetFilePath, "utf8")
            .then((result) => alphabets.push(JSON.parse(result)))
            .catch(() => {console.error(`Alphabet ${alphabet} not found!!! Did you spell it correctly?`); return;})
    }

    let ciphers: Array<Cipher> = []
    //temp code for debugging? idk
    config.ciphers.forEach(configuration => {
        switch (configuration.type) {
            case "caesar":
                ciphers.push(new CaesarCipher(configuration, alphabets))
                break;
            case "substitution":
                console.log("substitution cipher :3 " + chalk.red("NOT IMPLEMENTED YET AAAA"))
                break;
            default:
                throw new Error(`No cipher type ${configuration.type} found. Did you misspell something?`)
        }
    });

    return ciphers
}
import { Cipher, CipherConfiguration } from "../types"

export class SubstitutionCipher implements Cipher {
    private key: {[key: string] : string} = {}
    private caseSensitive: boolean = false
    
    constructor(config: CipherConfiguration) {
        this.key = config.key
        this.caseSensitive = config.caseSensitive? config.caseSensitive : false
    }

    public encode(data: string) {
        let i: number = 0;
        let result: string = ""
        const keys = Object.keys(this.key).sort((a,b) => a.length - b.length)
        const dataArray = data.split("")
        console.log(dataArray)
        console.log(keys)
        while (i < data.length) {
            let matched = false;

            for (const char of keys) {
                console.log(dataArray.slice(i, i+char.length).join("") + " : " + char)
                console.log(char)
                if (dataArray.slice(i, i+char.length).join("") === char) {
                    result += this.key[char];
                    i += char.length;
                    matched = true;
                    break;
                }
            }
            
            if (!matched) {
                result += dataArray[i]
                i += 1
            }
        }

        return result
    }

    public decode(data: string) {

        return "UNFINISHED"
    }
}
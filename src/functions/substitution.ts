import { Cipher, CipherConfiguration } from "../types"

export class SubstitutionCipher implements Cipher {
    private key: {}
    private caseSensitive: boolean = false
    
    constructor(config: CipherConfiguration) {
        this.key = config.key
        this.caseSensitive = config.caseSensitive? config.caseSensitive : false
    }

    encode(data: string) {


        return "UNFINISHED"
    }

    decode(data: string) {

        return "UNFINISHED"
    }
}
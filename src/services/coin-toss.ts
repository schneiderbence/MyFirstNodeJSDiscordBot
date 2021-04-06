import {injectable} from "inversify";

@injectable()
export class CoinToss {

    private regexp = '=ct';

    public isCoinToss(stringToSearch: string): boolean {
        return stringToSearch.search(this.regexp) >= 0;
    }
}
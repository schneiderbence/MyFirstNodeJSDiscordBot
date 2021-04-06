import {expect} from "chai";
import {CoinToss} from "../../../src/services/coin-toss";

describe('CoinToss', () => {
    let service: CoinToss;
    beforeEach(() => {
        service = new CoinToss();
    })

    it('should find "=ct" in the string', () => {
        expect(service.isCoinToss('=ct')).to.be.true;
    })
});
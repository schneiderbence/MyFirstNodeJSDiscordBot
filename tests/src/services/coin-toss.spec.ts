import {expect} from "chai";
import {CoinToss} from "../../../src/services/coin-toss";

describe('CoinToss', () => {
    let service: CoinToss;
    beforeEach(() => {
        service = new CoinToss();
    })

    it('should only return true for =ct and nothing else', () => {
        expect(service.isCoinToss('TEST =ct TEST')).to.be.false;
        expect(service.isCoinToss('   ')).to.be.false;
        expect(service.isCoinToss('')).to.be.false;
        expect(service.isCoinToss('TEST =ct')).to.be.false;
        expect(service.isCoinToss('=ct')).to.be.true;
    })
});
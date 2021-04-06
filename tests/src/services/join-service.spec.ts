import {expect} from "chai";
import {JoinService} from "../../../src/services/join-service";
import {Message, User} from "discord.js";
import {instance, mock} from "ts-mockito";

describe('JoinService', () => {
    let service: JoinService;

    let mockedMessageClass: Message;
    let mockedMessageInstance: Message;

    beforeEach(() => {
        service = new JoinService();

        mockedMessageClass = mock(Message);
        mockedMessageInstance = instance(mockedMessageClass);
        mockedMessageInstance.content = '=j';
    })

    it('test that the service matches for "=j"', () => {
        expect(service.isJoinMessage('=j')).to.be.true;
    })

    it('test that the service returns the joined player', () => {
        const username = "TEST_PLAYER";
        setupMockMessageWithUsername(username, mockedMessageInstance);

        let result = service.handleMessage(mockedMessageInstance);

        expect(result).contain(username)
        expect(service.getJoinedPlayersCount()).equal(1);
    })

    it('test that when multiple players join return all their names and correct player count', () => {
        let playerNames = ["A", "B", "C"];
        let result;

        for (let playerName of playerNames) {
            setupMockMessageWithUsername(playerName, mockedMessageInstance);

            result = service.handleMessage(mockedMessageInstance);
        }

        for (let playerName of playerNames) {
            expect(result).contain(playerName);
        }

        expect(service.getJoinedPlayersCount()).equal(3);
    })

    function setupMockMessageWithUsername(playerName: string, mockedMessageInstance: Message) {
        mockedMessageInstance.author = mock(User);
        mockedMessageInstance.author.username = playerName;
    }
});
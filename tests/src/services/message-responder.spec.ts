import "reflect-metadata";
import 'mocha';
import {expect} from 'chai';
import {PingFinder} from "../../../src/services/ping-finder";
import {MessageResponder} from "../../../src/services/message-responder";
import {anyString, instance, mock, verify, when} from "ts-mockito";
import {Message, TextChannel, User} from "discord.js";
import {CoinToss} from "../../../src/services/coin-toss";
import {JoinService} from "../../../src/services/join-service";

describe('MessageResponder', () => {
    let mockedPingFinderClass: PingFinder;
    let mockedPingFinderInstance: PingFinder;
    let mockedCoinTossClass: CoinToss;
    let mockedCoinTossInstance: CoinToss;
    let mockedJoinServiceClass: JoinService;
    let mockedJoinServiceInstance: JoinService;
    let mockedMessageClass: Message;
    let mockedMessageInstance: Message;

    let service: MessageResponder;

    const channelId = "TEST_CHANNEL_ID"
    const username = "TEST_USERNAME"

    beforeEach(() => {
        mockedPingFinderClass = mock(PingFinder);
        mockedPingFinderInstance = instance(mockedPingFinderClass);
        mockedCoinTossClass = mock(CoinToss);
        mockedCoinTossInstance = instance(mockedCoinTossClass);
        mockedMessageClass = mock(Message);
        mockedMessageInstance = instance(mockedMessageClass);
        mockedJoinServiceClass = mock(JoinService);
        mockedJoinServiceInstance = instance(mockedJoinServiceClass);
        setupMockMessage();

        service = new MessageResponder(mockedPingFinderInstance, mockedCoinTossInstance,
            mockedJoinServiceInstance, channelId);
    })

    it('should reply', async () => {
        setupServiceMocks(true);

        await service.handle(mockedMessageInstance);

        verify(mockedMessageClass.reply('pong!')).once();
    })

    it('should not reply', async () => {
        setupServiceMocks(false);

        await service.handle(mockedMessageInstance).then(() => {
            // Successful promise is unexpected, so we fail the test
            expect.fail('Unexpected promise');
        }).catch(() => {
            // Rejected promise is expected, so nothing happens here
        });

        verify(mockedMessageClass.reply('pong!')).never();
    })

    it('should handle =ct', async () => {
        setupServiceMocks(true)

        await service.handle(mockedMessageInstance);

        verify(mockedMessageClass.reply(anyString())).once();
    })

    it('should not handle =ct', async () => {
        setupServiceMocks(false)

        await service.handle(mockedMessageInstance).then(() => {
            expect.fail('Unexpected promise');
        }).catch(() => {
            // Rejected promise is expected, so nothing happens here
        });

        verify(mockedMessageClass.reply(anyString())).never();
    })

    it('should handle =j', async () => {
        setupServiceMocks(true)

        await service.handle(mockedMessageInstance);

        verify(mockedMessageClass.reply(anyString())).once();
    })

    it('should not handle =j', async () => {
        setupServiceMocks(false)

        await service.handle(mockedMessageInstance).then(() => {
            expect.fail('Unexpected promise');
        }).catch(() => {
            // Rejected promise is expected, so nothing happens here
        });

        verify(mockedMessageClass.reply(anyString())).never();
    })

    function setupMockMessage() {
        mockedMessageInstance.content = "Non-empty string";
        mockedMessageInstance.channel = mock(TextChannel);
        mockedMessageInstance.channel.id = channelId;
        mockedMessageInstance.author = mock(User);
        mockedMessageInstance.author.username = username;
    }

    function setupServiceMocks(result: boolean) {
        when(mockedPingFinderClass.isPing(anyString())).thenReturn(result);
        when(mockedCoinTossClass.isCoinToss(anyString())).thenReturn(result);
        when(mockedJoinServiceClass.isJoinMessage(anyString())).thenReturn(result);
    }
});
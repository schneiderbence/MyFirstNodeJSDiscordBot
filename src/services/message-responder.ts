import {Message} from "discord.js";
import {PingFinder} from "./ping-finder";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {CoinToss} from "./coin-toss";
import {JoinService} from "./join-service";

@injectable()
export class MessageResponder {
    private pingFinder: PingFinder;
    private coinToss: CoinToss;
    private joinService: JoinService;
    private readonly channelId: string;

    constructor(@inject(TYPES.PingFinder) pingFinder: PingFinder,
                @inject(TYPES.CoinToss) coinToss: CoinToss,
                @inject(TYPES.JoinService) joinService: JoinService,
                @inject(TYPES.ChannelId) channelId: string) {
        this.pingFinder = pingFinder;
        this.coinToss = coinToss;
        this.joinService = joinService;
        this.channelId = channelId;
    }

    handle(message: Message): Promise<Message | Message[]> {
        if (this.pingFinder.isPing(message.content)) {
            return message.reply('pong!');
        }

        if (this.coinToss.isCoinToss(message.content)) {
            if (Math.random() >= 0.5) {
                return message.reply(' won, its heads!');
            } else {
                return message.reply(' lost, its tails!');
            }
        }

        if (this.joinService.isJoinMessage(message.content)) {
            return message.reply(this.joinService.handleMessage(message));
        }

        return Promise.reject();
    }
}

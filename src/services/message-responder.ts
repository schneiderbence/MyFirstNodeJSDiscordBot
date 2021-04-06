import {Message} from "discord.js";
import {PingFinder} from "./ping-finder";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {CoinToss} from "./coin-toss";

@injectable()
export class MessageResponder {
    private pingFinder: PingFinder;
    private coinToss: CoinToss;
    private readonly channelId: string;

    constructor(@inject(TYPES.PingFinder) pingFinder: PingFinder,
                @inject(TYPES.CoinToss) coinToss: CoinToss,
                @inject(TYPES.ChannelId) channelId: string) {
        this.pingFinder = pingFinder;
        this.coinToss = coinToss;
        this.channelId = channelId;
    }

    handle(message: Message): Promise<Message | Message[]> {
        if (this.pingFinder.isPing(message.content)) {
            return message.reply('pong!');
        }

        if (this.coinToss.isCoinToss(message.content)) {
            if (Math.random() >= 0.5) {
                return message.reply(message.author.toString() + ' won, its heads!');
            } else {
                return message.reply(message.author.toString() + ' lost, its tails!');
            }
        }

        return Promise.reject();
    }
}

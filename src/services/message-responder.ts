import {Message} from "discord.js";
import {PingFinder} from "./ping-finder";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {CoinToss} from "./coin-toss";
import {JoinService} from "./join-service";
import {LeaveService} from "./leave-service";
import {AddService} from "./add-service";
import {RemoveService} from "./remove-service";
import {WhoService} from "./who-service";
import {ResetService} from "./reset-service";

@injectable()
export class MessageResponder {
    private pingFinder: PingFinder;
    private coinToss: CoinToss;
    private joinService: JoinService;
    private leaveService: LeaveService;
    private addService: AddService;
    private removeService: RemoveService;
    private whoService: WhoService;
    private resetService: ResetService;
    private readonly channelId: string;

    constructor(@inject(TYPES.PingFinder) pingFinder: PingFinder,
                @inject(TYPES.CoinToss) coinToss: CoinToss,
                @inject(TYPES.JoinService) joinService: JoinService,
                @inject(TYPES.LeaveService) leaveService: LeaveService,
                @inject(TYPES.AddService) addService: AddService,
                @inject(TYPES.RemoveService) removeService: RemoveService,
                @inject(TYPES.WhoService) whoService: WhoService,
                @inject(TYPES.ResetService) resetService: ResetService,
                @inject(TYPES.ChannelId) channelId: string) {
        this.pingFinder = pingFinder;
        this.coinToss = coinToss;
        this.joinService = joinService;
        this.leaveService = leaveService;
        this.addService = addService;
        this.removeService = removeService;
        this.whoService = whoService;
        this.resetService =resetService;
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
            return message.channel.send(this.joinService.handleMessage(message));
        }

        if (this.leaveService.isLeaveMessage(message.content)) {
            return message.channel.send(this.leaveService.handleMessage(message));
        }

        if (this.addService.isAddMessage(message.content)) {
            return message.channel.send(this.addService.handleMessage(message));
        } 

        if (this.removeService.isRemoveMessage(message.content)) {
            return message.channel.send(this.removeService.handleMessage(message));
        } 

        if (this.whoService.isWhoMessage(message.content)) {
            return message.channel.send(this.whoService.handleMessage());
        } 

        if (this.resetService.isResetMessage(message.content)) {
            return message.channel.send(this.resetService.handleMessage());
        }

        return Promise.reject();
    }
}

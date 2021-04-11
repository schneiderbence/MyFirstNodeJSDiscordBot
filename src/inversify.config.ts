import "reflect-metadata";
import {Container} from "inversify";
import {TYPES} from "./types";
import {Bot} from "./bot";
import {Client} from "discord.js";
import {MessageResponder} from "./services/message-responder";
import {PingFinder} from "./services/ping-finder";
import {CoinToss} from "./services/coin-toss";
import {JoinService} from "./services/join-service";
import {LeaveService} from "./services/leave-service";
import {AddService} from "./services/add-service";
import {RemoveService} from "./services/remove-service";
import {WhoService} from "./services/who-service";
import {ResetService} from "./services/reset-service";

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<string>(TYPES.ChannelId).toConstantValue(process.env.CHANNEL_ID);
container.bind<MessageResponder>(TYPES.MessageResponder).to(MessageResponder).inSingletonScope();
container.bind<PingFinder>(TYPES.PingFinder).to(PingFinder).inSingletonScope();
container.bind<CoinToss>(TYPES.CoinToss).to(CoinToss).inSingletonScope();
container.bind<JoinService>(TYPES.JoinService).to(JoinService).inSingletonScope();
container.bind<LeaveService>(TYPES.LeaveService).to(LeaveService).inSingletonScope();
container.bind<AddService>(TYPES.AddService).to(AddService).inSingletonScope();
container.bind<RemoveService>(TYPES.RemoveService).to(RemoveService).inSingletonScope();
container.bind<WhoService>(TYPES.WhoService).to(WhoService).inSingletonScope();
container.bind<ResetService>(TYPES.ResetService).to(ResetService).inSingletonScope();


export default container;
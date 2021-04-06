import "reflect-metadata";
import {Container} from "inversify";
import {TYPES} from "./types";
import {Bot} from "./bot";
import {Client} from "discord.js";
import {MessageResponder} from "./services/message-responder";
import {PingFinder} from "./services/ping-finder";
import {CoinToss} from "./services/coin-toss";
import {JoinService} from "./services/join-service";

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<string>(TYPES.ChannelId).toConstantValue(process.env.CHANNEL_ID);
container.bind<MessageResponder>(TYPES.MessageResponder).to(MessageResponder).inSingletonScope();
container.bind<PingFinder>(TYPES.PingFinder).to(PingFinder).inSingletonScope();
container.bind<CoinToss>(TYPES.CoinToss).to(CoinToss).inSingletonScope();
container.bind<JoinService>(TYPES.JoinService).to(JoinService).inSingletonScope();

export default container;
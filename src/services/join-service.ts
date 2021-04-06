import {injectable} from "inversify";
import {Message, User} from "discord.js";

@injectable()
export class JoinService {

    private regexp = '^=j';
    private queue = [];
    private readonly queueLength = 12;

    public isJoinMessage(stringToSearch: string): boolean {
        return stringToSearch.search(this.regexp) >= 0;
    }

    public handleMessage(message: Message): string {
        this.queue.push(message.author);
        return '**Champions League (' + this.queue.length + '**' + ' **/** ' + '**' + this.queueLength + ')**' +
            ' **|** ' + this.generateUsernames();
    }

    getJoinedPlayersCount(): number {
        return this.queue.length;
    }

    private generateUsernames() {
        return this.queue.map((user: User) => "`" + user.username + "`").join(' / ');
    }
}
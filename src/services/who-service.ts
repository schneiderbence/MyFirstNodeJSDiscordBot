import {injectable, tagged} from "inversify";
import {Message, User} from "discord.js";

@injectable()
export class WhoService {

    private regexp = '^=who';
    private queue = [];
    private readonly queueLength = 12;

    public isWhoMessage(stringToSearch: string): boolean {
        return stringToSearch.search(this.regexp) >= 0;
    }

    public handleMessage(): string {
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
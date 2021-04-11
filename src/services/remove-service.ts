import {injectable, tagged} from "inversify";
import {Message, User} from "discord.js";

@injectable()
export class RemoveService {

    private regexp = '^=remove';
    private queue = [];
    private readonly queueLength = 12;
    private taggedName;

    public isRemoveMessage(stringToSearch: string): boolean {
        return stringToSearch.search(this.regexp) >= 0;
    }

    public handleMessage(message: Message): string {
        if (this.queueLength !== this.queue.length && message.mentions.users.size && message.member.hasPermission('ADMINISTRATOR')) {
            this.taggedName = message.mentions.users.first();
            if (this.isJoined(this.taggedName)) {
                this.queue.filter(e => e != this.taggedName);
                return '**Champions League (' + this.queue.length + '**' + ' **/** ' + '**' + this.queueLength + ')**' +
                ' **|** ' + this.generateUsernames();
            } else {
                return this.taggedName + ' is not joined!';
            }
        }  
    }

    getJoinedPlayersCount(): number {
        return this.queue.length;
    }

    private generateUsernames() {
        return this.queue.map((user: User) => "`" + user.username + "`").join(' / ');
    }

    public isJoined(username: User): boolean {
        return this.queue.includes(username);
    }
}
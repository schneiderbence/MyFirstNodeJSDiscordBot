import {injectable, tagged} from "inversify";
import {Message, User} from "discord.js";

@injectable()
export class AddService {

    private regexp = '^=add';
    private queue = [];
    private readonly queueLength = 12;
    private taggedName;

    public isAddMessage(stringToSearch: string): boolean {
        return stringToSearch.search(this.regexp) >= 0;
    }

    public handleMessage(message: Message): string {
        if (this.queueLength !== this.queue.length && message.mentions.users.size && message.member.hasPermission('ADMINISTRATOR')) {
            this.taggedName = message.mentions.users.first();
            if (!this.isJoined(this.taggedName)) {
                this.queue.push(this.taggedName);
                return '**Champions League (' + this.queue.length + '**' + ' **/** ' + '**' + this.queueLength + ')**' +
                ' **|** ' + this.generateUsernames();
            } else {
                return this.taggedName + ' has already joined!';
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
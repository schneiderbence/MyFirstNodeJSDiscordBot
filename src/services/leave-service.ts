import {injectable} from "inversify";
import {Message, User} from "discord.js";

@injectable()
export class LeaveService {

    private regexp = '^=l';
    private queue = [];
    private readonly queueLength = 12;

    public isLeaveMessage(stringToSearch: string): boolean {
        return stringToSearch.search(this.regexp) >= 0;
    }

    public handleMessage(message: Message): string {
        if (this.isJoined(message.author)) {
            this.queue = this.queue.filter(e => e != message.author);
            return '**Champions League (' + this.queue.length + '**' + ' **/** ' + '**' + this.queueLength + ')**' +
            ' **|** ' + this.generateUsernames();
        } else {
            return 'You havent joined yet!';
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
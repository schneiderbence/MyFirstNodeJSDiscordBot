require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client();
const pickPhase = require('./picking');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);

var lobbyName = [];
var lobbyId = [];
var tempLobby = [];
var red_team = [];
var blue_team = [];
var unpicked = [];
var red_captain;
var red_name;
var blue_captain;
const MAX_PLAYER = 12;
const CHANNEL_ID = '824737460230946888';
var MANAGE_ROLE;


function lobbyPrint () {
    tempLobby = [];
    for (let i = 0; i < lobbyName.length; i++) {
        tempLobby.push("`" + lobbyName[i] + "`");
    }
}

//role who can use =add, =remove, ... and manage the lobby and the Bot
client.on('message', (message) => {
    if (message.content === '=manage' && message.channel.id === CHANNEL_ID) {
        if (message.mentions.roles.size) {
            MANAGE_ROLE = message.mentions.roles.forEach(e => {e.name});
        } else {
            message.channel.send({embed: {
                color: 0x0099ff,
                author: { name: 'This command should look like this: "=manage SERVER_ROLE SERVER_ROLE"'},
            }});
        }
    }
});

//joining
client.on('message', (message) => {
    if (message.content === '=j' && message.channel.id === CHANNEL_ID) {
        if (!lobbyName.includes(message.author.username) && !lobbyId.includes(message.author.id) && lobbyName.length !== MAX_PLAYER) {
            lobbyName.push(message.author.username);
            lobbyId.push(message.author.id);
            lobbyPrint();
            message.channel.send('**Champions League (' + lobbyName.length + '**' + ' **/** ' + '**' + MAX_PLAYER + ')**' + ' **|** ' + tempLobby.join('/'));
        } else if (lobbyName.includes(message.author.username) && lobbyId.includes(message.author.id)) {
            message.channel.send({embed: {
                color: 0x0099ff,
                author: { name: 'You have already joined the lobby!'},
            }});
        } else {
            message.channel.send({embed: {
                color: 0x0099ff,
                author: { name: 'The lobby is full!'},
            }});
        }
    }
});

//leaving
client.on('message', (message) => {
    if (message.content === '=l' && message.channel.id === CHANNEL_ID) {
        if (lobbyName.includes(message.author.username) && lobbyId.includes(message.author.id)) {
            lobbyName = lobbyName.filter(e => e != message.author.username);
            lobbyId = lobbyId.filter(e => e != message.author.id);
            lobbyPrint();
            message.channel.send('**Champions League (' + lobbyName.length + '**' + ' **/** ' + '**' + MAX_PLAYER + ')**' + ' **|** ' + tempLobby.join('/'));
        } else {
            message.channel.send({embed: {
                color: 0x0099ff,
                author: { name: 'You are not in the lobby!'},
            }});
        }
    }
});

//who is in the lobby
client.on('message', (message) => {
    if (message.content === '=who' && message.channel.id === CHANNEL_ID) {
        lobbyPrint();
        message.channel.send('**Champions League (' + lobbyName.length + '**' + ' **/** ' + '**' + MAX_PLAYER + ')**' + ' **|** ' + tempLobby.join('/'));
    }
});

//cointoss
client.on('message', (message) => {
    if (message.content === '=ct' && message.channel.id === CHANNEL_ID) {
        if (Math.random() >= 0.5 ) {
            message.channel.send(message.author.toString() + ' won, its heads!');
        } else {
            message.channel.send(message.author.toString() + ' lost, its tails!');
        }
    }
});


//remove player
client.on('message', (message) => {
    if (message.member.hasPermission('ADMINISTRATOR') && message.content.startsWith('=remove') && message.channel.id === CHANNEL_ID) {
        if (message.mentions.users.size) {
            const taggedUser = message.mentions.users.first();
            if (lobbyName.includes(taggedUser.username) && lobbyId.includes(taggedUser.id)) {
                lobbyName = lobbyName.filter(e => e != taggedUser.username);
                lobbyId = lobbyId.filter(e => e != taggedUser.id);
                lobbyPrint();
                message.channel.send('**Champions League (' + lobbyName.length + '**' + ' **/** ' + '**' + MAX_PLAYER + ')**' + ' **|** ' + tempLobby.join('/'));
            } else {
                message.channel.send({embed: {
                    color: 0x0099ff,
                    author: { name: taggedUser.username + ' is not in the lobby!'},
                }});
            }
        } else {
            message.channel.send({embed: {
                color: 0x0099ff,
                author: { name: 'This command should look like this: "=remove @playername"'},
            }});
        }
    }
});


//add player
client.on('message', (message) => {
    if (message.member.hasPermission('ADMINISTRATOR') && message.content.startsWith('=add') && message.channel.id === CHANNEL_ID) {
        if (message.mentions.users.size) {
            const taggedUser = message.mentions.users.first();
            if (!lobbyName.includes(taggedUser.username) && !lobbyId.includes(taggedUser.id) && lobbyName.length !== MAX_PLAYER) {
                lobbyName.push(taggedUser.username);
                lobbyId.push(taggedUser.id);
                lobbyPrint();
                message.channel.send('**Champions League (' + lobbyName.length + '**' + ' **/** ' + '**' + MAX_PLAYER + ')**' + ' **|** ' + tempLobby.join('/'));
            } else {
                message.channel.send({embed: {
                    color: 0x0099ff,
                    author: { name: taggedUser.username + ' has already joined the lobby!'},
                }});
            }
        } else {
            message.channel.send({embed: {
                color: 0x0099ff,
                author: { name: 'This command should look like this: "=add @playername"'},
            }});
        }
    }
});


//reset lobby
client.on('message', (message) => {
    if (message.content.startsWith('=reset') && message.channel.id === CHANNEL_ID) {
        lobbyName = [];
        lobbyId = [];
        tempLobby = [];
        message.channel.send('**Champions League (' + lobbyName.length + '**' + ' **/** ' + '**' + MAX_PLAYER + ')**' + ' **|** ' + tempLobby.join('/'));
    }
});


//teams

client.on('message', (message) => {
    if (message.content === '=teams' && red_team.length !== 0 && blue_team.length !==0) {
        unpicked = templobby.filter(e => e != tempLobby[blue_captain] && e!= tempLobby[red_captain]);
        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_captain + "\n\n" + 
        "**Blue Captain:**\n" + blue_captain + "\n\n" + "**Unpicked:**\n" + unpicked.join(', '));
    }
});


if (lobbyName.length === MAX_PLAYER) {
    unpicked = tempLobby;

    message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + "\n\n" + 
    "**Blue Captain:**\n" + "\n\n" + "**Unpicked:**\n" + unpicked.join(', '));

    client.on('message', (message) => {
        if (message.content === '=capfor red' && red_captain == '' && red_team.length == 0) {
            red_captain = "`" + message.author.username + "`";
            red_team.push(red_captain);
            unpicked.filter(e => e != red_captain);
            message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
            "**Blue Captain:**\n" + blue_team[0] + "\n\n" + "**Unpicked:**\n" + unpicked.join(', '));

        } else if (message.content === '=capfor red' && red_team.length == 1) {
            red_captain = "`" + message.author.username + "`";
            red_team.filter(e => e == "`" + message.author.username + "`");
            unpicked.filter(e => e != red_captain);
            message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
            "**Blue Captain:**\n" + blue_team[0] + "\n\n" + "**Unpicked:**\n" + unpicked.join(', '));

        } else if (message.content === '=capfor blue' && blue_team.length == 0) {
            blue_captain = "`" + message.author.username + "`";
            blue_team.push(blue_captain);
            unpicked.filter(e => e != blue_captain);
            message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
            "**Blue Captain:**\n" + blue_team[0] + "\n\n" + "**Unpicked:**\n" + unpicked.join(', '));

        } else if (message.content === '=capfor blue' && blue_team.length == 1) {
            blue_captain = "`" + message.author.username + "`";
            blue_team.filter(e => e == "`" + message.author.username + "`");
            unpicked.filter(e => e != blue_captain);
            message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
            "**Blue Captain:**\n" + blue_team[0] + "\n\n" + "**Unpicked:**\n" + unpicked.join(', '));
        }
    });

    pickPhase.pickingWithRules(tempLobby, red_team, red_captain, blue_team, blue_captain, unpicked, CHANNEL_ID);

}


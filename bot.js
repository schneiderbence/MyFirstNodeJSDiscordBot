require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);

var lobbyName = [];
var lobbyId = [];
const MAX_PLAYER = 12;
const CHANNEL_ID = '828935609149947944';
var MANAGE_ROLE;
var lobbyList = new Discord.MessageEmbed();

function embedMaker () {
    lobbyList.setTitle('Lobby (' + lobbyName.length + ' / 12) | ');
    lobbyList.fields = [];
    lobbyList.description = '';
    for (let i = 0; i < lobbyName.length; i++) {
        lobbyList.addFields({
            name: '\u200B',
            value: '**'+ lobbyName[i] + '**',
            inline: true,
        });
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
                timestamp: new Date(),
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
            embedMaker();
            lobbyList.setDescription(message.author.username + ' joined the lobby!');
            message.channel.send(lobbyList);
        } else {
            message.channel.send({embed: {
                color: 0x0099ff,
                author: { name: 'You have already joind the lobby!'},
                timestamp: new Date(),
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
            embedMaker();
            lobbyList.setDescription(message.author.username + ' left the lobby! ');
            message.channel.send(lobbyList);
        } else {
            message.channel.send({embed: {
                color: 0x0099ff,
                author: { name: 'You are not in the lobby!'},
                timestamp: new Date(),
            }});
        }
    }
});

//who is in the lobby
client.on('message', (message) => {
    if (message.content === '=who' && message.channel.id === CHANNEL_ID) {
        embedMaker();
        message.channel.send(lobbyList);
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
                embedMaker();
                lobbyList.setDescription(taggedUser.username + ' removed from the lobby!');
                message.channel.send(lobbyList);
            } else {
                message.channel.send({embed: {
                    color: 0x0099ff,
                    author: { name: taggedUser.username + ' is not in the lobby!'},
                    timestamp: new Date(),
                }});
            }
        } else {
            message.channel.send({embed: {
                color: 0x0099ff,
                author: { name: 'This command should look like this: "=remove @playername"'},
                timestamp: new Date(),
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
                embedMaker();
                lobbyList.setDescription(taggedUser.username + ' added from the lobby!');
                message.channel.send(lobbyList);
            } else {
                message.channel.send({embed: {
                    color: 0x0099ff,
                    author: { name: taggedUser.username + ' has already joined the lobby!'},
                    timestamp: new Date(),
                }});
            }
        } else {
            message.channel.send({embed: {
                color: 0x0099ff,
                author: { name: 'This command should look like this: "=add @playername"'},
                timestamp: new Date(),
            }});
        }
    }
});


//reset lobby
client.on('message', (message) => {
    if (message.content.startsWith('=reset') && message.channel.id === CHANNEL_ID) {
        lobbyName = [];
        lobbyId = [];
        embedMaker();
        message.channel.send(lobbyList);
    }
});


const exampleEmbed = {
    color: 0x0099ff,
    title: 'JK2 Champions League Picking',
    fields: [
        {
            name: 'Red Captain',
        },
        {
            name: 'Blue Captain',
        },
        {
            name: '\u200B',
            value:'\u200B',
        },
        {
            name: 'Unpicked:',
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
    ],
    timestamp: new Date(),
};

//table
client.on('message', (message) => {
    if (message.content === '=table') {
        message.channel.send({ embed: exampleEmbed });
    }
});

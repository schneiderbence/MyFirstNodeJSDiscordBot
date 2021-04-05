require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login('ODI4NzA1NDAyMTc0MzA4NDM1.YGteDA.b_V_ZNmnJdhLIAK1sPrdWiRW6_E');

var lobbyName = [];
var lobbyId = [];
const MAX_PLAYER = 12;
var MANAGE_ROLE;
const lobbyList = new Discord.MessageEmbed();

//role who can use =add, =remove, ... and manage the lobby and the Bot
client.on('message', (message) => {
    if (message.content === '=manage') {
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
    if (message.content === '=j') {
        if (!lobbyName.includes(message.author.username) && !lobbyId.includes(message.author.id) && lobbyName.length !== MAX_PLAYER) {
            lobbyName.push(message.author.username);
            lobbyId.push(message.author.id);
            message.channel.send(message.author.username + ' have joined the lobby! ' + ' Lobby (' + lobbyName.length + ' / 12) | ' + lobbyName.join('/'));
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
    if (message.content === '=l') {
        if (lobbyName.includes(message.author.username) && lobbyId.includes(message.author.id)) {
            lobbyName.pop(message.author.username);
            lobbyId.pop(message.author.id);
            message.channel.send(message.author.username + ' left the lobby! ' + ' Lobby (' + lobbyName.length + ' / 12) | ' + lobbyName.join('/'));
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
    if (message.content === '=who') {
        message.channel.send('Lobby (' + lobbyName.length + ' / 12) | ' + lobbyName.join('/'));
    }
});

//cointoss
client.on('message', (message) => {
    if (message.content === '=ct') {
        if (Math.random() >= 0.5 ) {
            message.channel.send(message.author.toString() + ' won, its heads!');
        } else {
            message.channel.send(message.author.toString() + ' lost, its tails!');
        }
    }
});


//remove player
client.on('message', (message) => {
    if (message.member.hasPermission('ADMINISTRATOR') && message.content.startsWith('=remove')) {
        if (message.mentions.users.size) {
            const taggedUser = message.mentions.users.first();
            if (lobbyName.includes(taggedUser.username) && lobbyId.includes(taggedUser.id)) {
                lobbyName.pop(taggedUser.username);
                lobbyId.pop(taggedUser.id);
                message.channel.send(taggedUser.username + ' removed from the lobby! ' + ' Lobby (' + lobbyName.length + ' / 12) | ' + lobbyName.join('/'));
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
    if (message.member.hasPermission('ADMINISTRATOR') && message.content.startsWith('=add')) {
        if (message.mentions.users.size) {
            const taggedUser = message.mentions.users.first();
            if (!lobbyName.includes(taggedUser.username) && !lobbyId.includes(taggedUser.id) && lobbyName.length !== MAX_PLAYER) {
                lobbyName.push(taggedUser.username);
                lobbyId.push(taggedUser.id);
                message.channel.send(taggedUser.username + ' added from the lobby! ' + ' Lobby (' + lobbyName.length + ' / 12) | ' + lobbyName.join('/'));
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
    if (message.content.startsWith('=reset')) {
        lobbyName = [];
        lobbyId = [];
        message.channel.send({embed: {
            color: 0x0099ff,
            author: { name: 'Lobby (' + lobbyName.length + ' / 12) | ' + lobbyName.join('/') + ' | The Lobby has been restored!'},
            timestamp: new Date(),
          }});
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

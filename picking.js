const Discord = require('discord.js');
const client = new Discord.Client();

//module.exports = { tempLobby, red_team, red_captain, blue_team, blue_captain, unpicked, CHANNEL_ID };


function nameGenerator(name) {
    const generatedName = '`'+ name + '`';
    return generatedName;
}


function pickingWithRules(tempLobby, red_team, red_captain, blue_team, blue_captain, unpicked, CHANNEL_ID) {
    client.on('message', (message) => {
        if (message.content == '=pickrule capper' && nameGenerator(message.author.username) === red_captain || nameGenerator(message.author.username) === red_captain) {
            message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team.join(', ') + "\n\n" + 
            "**Blue Captain:**\n" + blue_team[0] + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + red_captain + " pick a returner!");

            client.on('message', (message) => {
                if (message.content === '=pick' && message.channel.id === CHANNEL_ID && message.mentions.users.size) {
                    const taggedUser = message.mentions.users.first();
                    //First red pick, red_team has 2 member with captain
                    if (lobbyName.includes(taggedUser) && '`' + message.author.name + '`' === tempLobby[red_captain] && unpicked.length !== 0) {
                        red_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team.join(', ') + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team[0] + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + blue_captain + " pick a returner!");
                    
                    //First blue pick, blue_team has 2 member with captain
                    } else if (lobbyName.includes(taggedUser) && '`' + message.author.name + '`' === tempLobby[blue_captain] && unpicked.length !== 0 && red_team.length == 2) {
                        blue_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + blue_captain + " pick a returner!");
                    
                    //Second blue pick, blue_team has 3 member with captain
                    } else if (lobbyName.includes(taggedUser) && '`' + message.author.name + '`' === tempLobby[blue_captain] && unpicked.length !== 0 && red_team.length == 2 && blue_team.length == 2) {
                        blue_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + red_captain + " pick a returner!");
                    
                    //Second red pick, red_team has 3 member with captain
                    } else if (lobbyName.includes(taggedUser) && '`' + message.author.name + '`' === tempLobby[red_captain] && unpicked.length !== 0 && red_team.length == 2 && blue_team.length == 3) {
                        red_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team.join(', ') + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + blue_captain + " pick a returner!");
                    
                    //Third blue pick, blue_team has 4 member with captain
                    } else if (lobbyName.includes(taggedUser) && unpicked.includes(nameGenerator(taggedUser)) && nameGenerator(message.author.name) === tempLobby[blue_captain] && unpicked.length !== 0 && red_team.length == 3 && blue_team.length == 3) {
                        blue_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + red_captain + " pick a capper!");
                    
                    //Third red pick, red_team has 4 member with captain
                    } else if (lobbyName.includes(taggedUser) && unpicked.includes(nameGenerator(taggedUser)) && nameGenerator(message.author.name) === tempLobby[red_captain] && unpicked.length !== 0 && red_team.length == 3 && blue_team.length == 4) {
                        red_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team.join(', ') + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + blue_captain + " pick a capper!");
                    
    
                    //Fourth blue pick, blue_team has 5 member with captain
                    } else if (lobbyName.includes(taggedUser) && unpicked.includes(nameGenerator(taggedUser)) && nameGenerator(message.author.name) === tempLobby[blue_captain] && unpicked.length !== 0 && red_team.length == 4 && blue_team.length == 4) {
                        blue_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + red_captain + " pick a support!");
                    
                    //Fourth red pick, red_team has 5 member with captain
                    } else if (lobbyName.includes(taggedUser) && unpicked.includes(nameGenerator(taggedUser)) && nameGenerator(message.author.name) === tempLobby[red_captain] && unpicked.length !== 0 && red_team.length == 4 && blue_team.length == 5) {
                        red_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team.join(', ') + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + blue_captain + " pick a capper!");
                    

                    //Fifth blue pick, blue_team has 6 member with captain
                    } else if (lobbyName.includes(taggedUser) && unpicked.includes(nameGenerator(taggedUser)) && nameGenerator(message.author.name) === tempLobby[blue_captain] && unpicked.length !== 0 && red_team.length == 4 && blue_team.length == 4) {
                        blue_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + red_captain + " pick a support!");
                        red_team.push(unpicked[0]);
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', '));
                    
                    } else {
                        message.channel.send({embed: {
                            color: 0x0099ff,
                            author: { name: 'Not your turn!'},
                        }});
                    } 
                }
            });
        } else if (message.content == '=pickrule returner' && nameGenerator(message.author.username) === red_captain || nameGenerator(message.author.username) === red_captain) {
            client.on('message', (message) => {
                if (message.content === '=pick' && message.channel.id === CHANNEL_ID && message.mentions.users.size) {
                    const taggedUser = message.mentions.users.first();
                    //First red pick, red_team has 2 member with captain
                    if (lobbyName.includes(taggedUser) && '`' + message.author.name + '`' === tempLobby[red_captain] && unpicked.length !== 0) {
                        red_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team.join(', ') + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team[0] + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + blue_captain + " pick a capper!");
                    
                    //First blue pick, blue_team has 2 member with captain
                    } else if (lobbyName.includes(taggedUser) && '`' + message.author.name + '`' === tempLobby[blue_captain] && unpicked.length !== 0 && red_team.length == 2) {
                        blue_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + blue_captain + " pick a capper!");
                    
                    //Second blue pick, blue_team has 3 member with captain
                    } else if (lobbyName.includes(taggedUser) && '`' + message.author.name + '`' === tempLobby[blue_captain] && unpicked.length !== 0 && red_team.length == 2 && blue_team.length == 2) {
                        blue_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + red_captain + " pick a capper!");
                    
                    //Second red pick, red_team has 3 member with captain
                    } else if (lobbyName.includes(taggedUser) && '`' + message.author.name + '`' === tempLobby[red_captain] && unpicked.length !== 0 && red_team.length == 2 && blue_team.length == 3) {
                        red_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team.join(', ') + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + blue_captain + " pick a capper!");
                    
                    //Third blue pick, blue_team has 4 member with captain
                    } else if (lobbyName.includes(taggedUser) && unpicked.includes(nameGenerator(taggedUser)) && nameGenerator(message.author.name) === tempLobby[blue_captain] && unpicked.length !== 0 && red_team.length == 3 && blue_team.length == 3) {
                        blue_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + red_captain + " pick a support!");
                    
                    //Third red pick, red_team has 4 member with captain
                    } else if (lobbyName.includes(taggedUser) && unpicked.includes(nameGenerator(taggedUser)) && nameGenerator(message.author.name) === tempLobby[red_captain] && unpicked.length !== 0 && red_team.length == 3 && blue_team.length == 4) {
                        red_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team.join(', ') + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + blue_captain + " pick a support!");
                    
    
                    //Fourth blue pick, blue_team has 5 member with captain
                    } else if (lobbyName.includes(taggedUser) && unpicked.includes(nameGenerator(taggedUser)) && nameGenerator(message.author.name) === tempLobby[blue_captain] && unpicked.length !== 0 && red_team.length == 4 && blue_team.length == 4) {
                        blue_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + red_captain + " pick a bc!");
                    
                    //Fourth red pick, red_team has 5 member with captain
                    } else if (lobbyName.includes(taggedUser) && unpicked.includes(nameGenerator(taggedUser)) && nameGenerator(message.author.name) === tempLobby[red_captain] && unpicked.length !== 0 && red_team.length == 4 && blue_team.length == 5) {
                        red_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team.join(', ') + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + blue_captain + " pick a bc!");
                    

                    //Fifth blue pick, blue_team has 6 member with captain
                    } else if (lobbyName.includes(taggedUser) && unpicked.includes(nameGenerator(taggedUser)) && nameGenerator(message.author.name) === tempLobby[blue_captain] && unpicked.length !== 0 && red_team.length == 4 && blue_team.length == 4) {
                        blue_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + red_captain + " pick a returner!");
                        red_team.push(unpicked[0]);
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', '));

                    } else {
                        message.channel.send({embed: {
                            color: 0x0099ff,
                            author: { name: 'Not your turn!'},
                        }});
                    } 
                }
            });
        } else if (message.content == '=pickrule bc' && nameGenerator(message.author.username) === red_captain || nameGenerator(message.author.username) === red_captain) {
            client.on('message', (message) => {
                if (message.content === '=pick' && message.channel.id === CHANNEL_ID && message.mentions.users.size) {
                    const taggedUser = message.mentions.users.first();
                    //First red pick, red_team has 2 member with captain
                    if (lobbyName.includes(taggedUser) && '`' + message.author.name + '`' === tempLobby[red_captain] && unpicked.length !== 0) {
                        red_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team.join(', ') + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team[0] + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + blue_captain + " pick a capper!");
                    
                    //First blue pick, blue_team has 2 member with captain
                    } else if (lobbyName.includes(taggedUser) && '`' + message.author.name + '`' === tempLobby[blue_captain] && unpicked.length !== 0 && red_team.length == 2) {
                        blue_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + blue_captain + " pick a capper!");
                    
                    //Second blue pick, blue_team has 3 member with captain
                    } else if (lobbyName.includes(taggedUser) && '`' + message.author.name + '`' === tempLobby[blue_captain] && unpicked.length !== 0 && red_team.length == 2 && blue_team.length == 2) {
                        blue_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + red_captain + " pick a capper!");
                    
                    //Second red pick, red_team has 3 member with captain
                    } else if (lobbyName.includes(taggedUser) && '`' + message.author.name + '`' === tempLobby[red_captain] && unpicked.length !== 0 && red_team.length == 2 && blue_team.length == 3) {
                        red_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team.join(', ') + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + blue_captain + " pick a capper!");
                    
                    //Third blue pick, blue_team has 4 member with captain
                    } else if (lobbyName.includes(taggedUser) && unpicked.includes(nameGenerator(taggedUser)) && nameGenerator(message.author.name) === tempLobby[blue_captain] && unpicked.length !== 0 && red_team.length == 3 && blue_team.length == 3) {
                        blue_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + red_captain + " pick a support!");
                    
                    //Third red pick, red_team has 4 member with captain
                    } else if (lobbyName.includes(taggedUser) && unpicked.includes(nameGenerator(taggedUser)) && nameGenerator(message.author.name) === tempLobby[red_captain] && unpicked.length !== 0 && red_team.length == 3 && blue_team.length == 4) {
                        red_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team.join(', ') + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + blue_captain + " pick a support!");
                    
    
                    //Fourth blue pick, blue_team has 5 member with captain
                    } else if (lobbyName.includes(taggedUser) && unpicked.includes(nameGenerator(taggedUser)) && nameGenerator(message.author.name) === tempLobby[blue_captain] && unpicked.length !== 0 && red_team.length == 4 && blue_team.length == 4) {
                        blue_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + red_captain + " pick a returner!");
                    
                    //Fourth red pick, red_team has 5 member with captain
                    } else if (lobbyName.includes(taggedUser) && unpicked.includes(nameGenerator(taggedUser)) && nameGenerator(message.author.name) === tempLobby[red_captain] && unpicked.length !== 0 && red_team.length == 4 && blue_team.length == 5) {
                        red_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team.join(', ') + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + red_captain + " pick a returner!");
                    

                    //Fifth blue pick, blue_team has 6 member with captain
                    } else if (lobbyName.includes(taggedUser) && unpicked.includes(nameGenerator(taggedUser)) && nameGenerator(message.author.name) === tempLobby[blue_captain] && unpicked.length !== 0 && red_team.length == 5 && blue_team.length == 5) {
                        blue_team.push("`" + taggedUser + "`");
                        unpicked.filter(e => e != "`" + taggedUser + "`");
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', ') + "\n\n" + blue_captain + " pick a returner!");
                        red_team.push(unpicked[0]);
                        message.channel.send("__**JK2 Champions League Picking**__\n" + "**Red Captain:**\n" + red_team[0] + "\n\n" + 
                        "**Blue Captain:**\n" + blue_team.join(', ') + "\n\n" + "**Unpicked:**\n" + unpicked.join(', '));
                    
                    } else {
                        message.channel.send({embed: {
                            color: 0x0099ff,
                            author: { name: 'Not your turn!'},
                        }});
                    } 
                }
            });
        } else {
            message.channel.send({embed: {
                color: 0x0099ff,
                author: { name: 'Write ' + '`=pickrule bc` or `=pickrule returner` or `=pickrule capper` to get the picking rule!'},
            }});
        }
    });
}

module.exports = { pickingWithRules };
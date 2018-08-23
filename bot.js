const prefix = "!"; // Set bot prefix here

const auth = require("./auth.json"); // Load token
const Discord = require("discord.io"); // Load discord.io
const bot = new Discord.Client({ // Load bot
    token: auth.token,
    autorun: true
});

const stdin = process.stdin; // Use the terminal to run JS code
stdin.on("data", function(input) {
    input = input.toString();
    try { // Attempt to run input
        let output = eval(input);
        console.log(output);
    } catch (e) { // Failed
        console.log("Error in eval.\n"+e.stack);
    }
});

bot.on("ready", function() { // When the bot comes online...
    console.log("I'm online!");
});

bot.on("message", function(user, userID, channelID, message, event) { // Message detected
    if (message.startsWith(prefix)) { // Message starts with prefix
        let command = message.slice(prefix.length).split(" "); // Split message into words
        switch (command[0]) { // Execute code depending on first word
        case "ping": // ping: reply "pong"
            bot.sendMessage({to: channelID, message: "Pong!"});
            break;
        case "roll": // roll: choose a random number
            let max = parseInt(command[1]) || 100;
            let min = 1;
            let result = Math.floor(Math.random()*(max-min+1)+min);
            bot.sendMessage({to: channelID, message: "From "+min+" to "+max+", you rolled: **"+result+"**"});
            break;
       case "hi": // hi: reply "hi the dummies"
            bot.sendMessage({to: channelID, message: "hi the dummies"});
            break;
       case "rotten": // rotten: reply "she was rotten but she was right"
            bot.sendMessage({to: channelID, message: "she was rotten but she was right"})
            break;
       case "rome": // rome: reply "AND I WILL BE NERON TEL AT THE FIRST LODGES TO SEE ROME BURN"
            bot.sendMessage({to: channelID, message: "AND I WILL BE NERON TEL AT THE FIRST LODGES TO SEE ROME BURN"})
            break;
       case "bye": // bye: reply "bye the tasks"
            bot.sendMessage({to: channelID, message: "bye the tasks"})
            break;
       case "commands": // commands: reply "choose one of the commands - ping, roll, hi, rotten, rome, bye"
            bot.sendMessage({to: channelID, message: "choose one of the commands - ping, roll, hi, rotten, rome, bye"})
            break;
        }
    }
});

bot.on("disconnect", function() { // Occasionally the bot disconnects.
    bot.connect(); // Just reconnect when that happens.
});
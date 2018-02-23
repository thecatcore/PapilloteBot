const { Command } = require("discord.js-commando");

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "reply",
            group: "group2",
            memberName: "reply",
            description: "Répond avec un Message.",
            examples: ["reply"]
        });
    }

    run(msg) {
        return msg.say("Je suis là!");
    }
};

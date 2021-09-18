const { readdirSync } = require('fs');

module.exports = (client) => {
    readdirSync('./cmds/').forEach(dir => {
        const commands = readdirSync(`./cmds/${dir}/`).filter(f => f.endsWith('.js'));

        for (let file of commands) {
            let pull = require(`../cmds/${dir}/${file}`);

            if (pull.name) {
                client.commands.set(pull.name, pull)
                console.info(`[COMMAND] ${pull.name} загружен!`)
            } else {
                continue;
            }
        }
    })
}
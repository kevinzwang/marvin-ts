import * as Commando from 'discord.js-commando'
import * as path from 'path'

import * as config from './config';

const client = new Commando.CommandoClient({
    owner: config.getOwner(),
    commandPrefix: config.getPrefix(),
    invite: config.getSupportServer(),
    unknownCommandResponse: false
})

client.registry
    .registerGroups([
        ['fun', 'Fun'],
        ['weeb', 'Weeb'],
        ['misc', 'Miscellaneous'],
        ['frc', 'FIRST Robotics Competition'],
        ['game', 'Seasonal bot game']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'))

if (config.getGame()) {
    client.registry.registerCommandsIn(path.join(__dirname, 'games', config.getGame(), 'commands'))
}
client.on('ready', () => {
    console.log(`Bot logged in as ${client.user.tag}!`)
});

client.on('error', () => {
    console.log(new Date() + ' - uncaught error from bot')
})

client.login(config.getBotToken())

export function exit() {
    client.destroy()
    console.log('\nQuitting...')
    process.exit()
}
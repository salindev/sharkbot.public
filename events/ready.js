module.exports = (client) => {
    client.user.setStatus('idle');
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setActivity(`@Shark`,{type:"WATCHING"})
}
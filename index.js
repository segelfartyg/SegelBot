//MTAzOTQ3ODkxODY5NDA1MTg1MA.GrhYgt.aEa5a9H7BBBQqxtj64wzk-pZJhNdUy9qVlZeuM
const discord = require("discord.js")
const client = new discord.Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildVoiceStates",
        "MessageContent"
    ]
})

const { distube, default: DisTube } = require("distube");

client.DisTube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false

})

client.on("messageCreate", async message => {
    if(message.author.bot || !message.guild) return;
 
    const prefix = "?"
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    
    if(!message.content.toLowerCase().startsWith(prefix)) return;

    commandCheck = false;
    searchstring = "";
    args.forEach((element) => {

        if(!commandCheck){
            commandCheck = true;      
        } 
        else{
            searchstring += element + " "
        }
    })
    
    try{
        switch(args[0]){
            case "play":        
                    try{
                        await client.DisTube.play(message.member.voice.channel, searchstring, {
                            member: message.member,
                            textChannel: message.channel,
                            message
                        })
                        message.channel.send("fasen vad najs med lite " + searchstring + `, den köar vi.`)
                    }
                    catch{
                        message.channel.send("Nu blev det lite fel med kommandot va? ?play {låtval} är det som gäller.")
                    }          
                break;
            case "skip":
           
            try{       
                    const queue = await client.DisTube.getQueue(message)
                    console.log("KNAS")
                       
             if (!queue) return message.channel.send("Men hörru, det finns inget i kön?")
          
              const song = await queue.skip()
                  message.channel.send(`Usch den här sög, vi skipper den och kör nästa istället.`)
                } catch (e) {
                 message.channel.send(`Men hörru, det finns inget i kön?`)
                 }
                break;
            default:
                console.log("no command")
            break;
        }
    }
    catch(error){
        console.log("error, restarting sequence: " + error)
        message.channel.send("Nu blev det lite fel med kommandot va? ?play {låtval} är det som gäller. Om du vill skippa kassa låtar får nu använda ?skip")
    }
      
})

client.on("ready", client => {
    console.log("BOT ONLINE")

} )

// client.DisTube.on("playSong", (queue, song) => {
// queue.message.textChannel.send("NOW PLAYING: " + song.name)
// })
client.login("")
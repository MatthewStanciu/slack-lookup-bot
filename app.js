const { App } = require('@slack/bolt');

const app = new App({
  signingSecret: process.env.SIGNING_SECRET,
  token: process.env.BOT_TOKEN
})

app.command('/lookup', async ({ command, ack, respond }) => {
  await ack();
  if (command.text.includes('@')) {
    const id = command.text.split('|')[0].slice(2)
    await respond({ text: `<@${id}>’s User ID is ${id}`, response_type: 'ephemeral' })
  }
  else
    await respond({ text: `${command.text}’s display name is <@${command.text}>`, response_type: 'ephemeral' })
})

function reply(channel, text, user) {
  app.client.chat.postEphemeral({
    token: process.env.BOT_TOKEN,
    attachments: [],
    channel: channel,
    text: text,
    user: user
  }).catch(err => {
    if (err.data.error === 'channel_not_found') {
      app.client.chat.postMessage({
        token: process.env.BOT_TOKEN,
        channel: user,
        text: text
      })
    }
  })
}

(async () => {
  await app.start(process.env.PORT || 3000)
  console.log("⚡️ Bolt app is running!")
})()

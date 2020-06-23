import fetch from 'isomorphic-unfetch'

export default async (req, res) => {
  const { text, response_url } = req.body
  if (text.includes('@')) {
    const id = text.split('|')[0].slice(2)
    sendCommandResponse(response_url, `<@${id}>’s User ID is ${id}`, res)
  } else {
    sendCommandResponse(response_url, `${text}’s display name is <@${text}>`, res)
  }
}

const sendCommandResponse = (responseUrl, text, res) => {
  fetch(responseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: text,
      response_type: 'ephemeral'
    })
  }).then(() => res.status(200).end())
}
import ollama from 'ollama'

export default async function getResponse1(val, Option) {
    if (Option == "Spotify") {
        const response = await ollama.chat({
            model: 'roaster',
            messages: [{ role: 'user', content: val }],
        })
        let content = response.message.content;
        // let content =response;
        return content
    }
    if(Option=="Chess")
    {
        const response = await ollama.chat({
            model: 'roasterChess',
            messages: [{ role: 'user', content: val }],
        })
        let content = response.message.content;
        // let content =response;
        return content

    }

}
getResponse1();

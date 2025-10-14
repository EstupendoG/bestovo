import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const database_id = process.env.NOTION_DATABASE_ID

async function handler(req, res) {
    try{
        const data = await getNotionDatabase()
        res.status(200).json(data || [])
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error getting Notion database' })
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function getNotionDatabase() {
    try{
        let cursor = undefined
        let database = []
        while(true){
            console.log(`## Buscando Página`)
            console.log(`Cursor Atual: ${cursor}`)

            let data = await notion.databases.query({ 
                database_id: database_id,
                start_cursor: cursor,
            })
            database.push(...data.results)
            
            let nextCursor = data.next_cursor
            console.log(`Próximo Cursor: ${nextCursor}`)
            if(!data.has_more){
                console.log(`## Finalizando Busca!`)
                break
            }

            await sleep(500)
            cursor = nextCursor
        }

        return clearJsonRes(database)
        
    } catch (err) {
        console.error(err)
        return []
    }
}

function clearJsonRes(data) {
    return data.map((d) => ({
        // Nome
        vidName: d.properties?.Name?.title?.[0]?.text.content || null,
        // Subs
        clientSubs: d.properties?.Subs?.number || null,
        // Links
        vidLinks: {
            youtube: d.properties?.['Video URL']?.url || null,
            iframe: d.properties?.iframeUrl?.url || null,
        },
        // Tags
        vidTags: d.properties?.Tags?.multi_select?.map(tag => ({
            name: tag.name || null,
            color: tag.color || 'default'
        })) || null,
        // Thumbnail
        vidImg: {
            alt: d.properties?.Thumbnail?.files?.[0]?.name || null,
            url: d.properties?.Thumbnail?.files?.[0]?.file?.url || null,
        },

    }))
}

export default handler
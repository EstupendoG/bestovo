import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const database = process.env.NOTION_DATABASE_ID

async function handler(req, res) {
    try{
        const data = await getNotionDatabase()
        res.status(200).json(data || [])
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error getting Notion database' })
    }
}
async function getNotionDatabase() {
  try {
    let data = await notion.databases.query({ database_id: database })
    return {
      database_id: database,
      total: data.results.length,
      results: data.results,
    }
  } catch (err) {
    console.error(err)
    return { error: err.message }
  }
}


function clearJsonRes(data) {
    return data.results.map((d) => ({
        // Nome
        vidName: d.properties?.Name?.title?.[0]?.text.content || null,
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
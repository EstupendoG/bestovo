import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

async function getNotionDatabase() {
    try{
        let database = process.env.NOTION_DATABASE_ID
        let res = await notion.databases.query({ database_id: database })

        let test = clearJsonRes(res)
        console.log(test)
        return test
    } catch (err) {
        console.error('Error getting notion data: ' + err)
    }
}

function clearJsonRes(data) {
    let res = []

    data.results.map((d) => {
        let newVideo = {
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
        }

        res.push(newVideo)
    })

    return res
}

export default getNotionDatabase
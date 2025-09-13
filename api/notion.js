import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const database = process.env.NOTION_DATABASE_ID

async function handler(req, res) {
    console.log('=== NOTION API CALL STARTED ===')
    
    try{
        // Debug das variáveis de ambiente (sem mostrar valores sensíveis)
        console.log('Environment check:', {
            hasApiKey: !!process.env.NOTION_API_KEY,
            hasDatabaseId: !!process.env.NOTION_DATABASE_ID,
            databaseIdLength: process.env.NOTION_DATABASE_ID ? process.env.NOTION_DATABASE_ID.length : 0
        })

        const data = await getNotionDatabase()
        console.log('Final data to return:', data)
        res.status(200).json(data || [])
    } catch (err) {
        console.error('Handler error:', err)
        res.status(500).json({ 
            error: 'Error getting Notion database',
            details: err.message 
        })
    }
}

async function getNotionDatabase() {
    try{
        console.log('Querying Notion database...')
        let response = await notion.databases.query({ 
            database_id: database,
            page_size: 10
        })
        
        console.log('Notion API response:', {
            resultCount: response.results.length,
            hasMore: response.has_more,
            firstPageId: response.results[0]?.id || 'none'
        })

        // Debug detalhado da primeira página (se existir)
        if (response.results.length > 0) {
            const firstPage = response.results[0]
            console.log('First page properties:', Object.keys(firstPage.properties))
            
            // Debug de propriedades específicas
            console.log('Name property:', firstPage.properties?.Name)
            console.log('Video URL property:', firstPage.properties?.['Video URL'])
            console.log('Tags property:', firstPage.properties?.Tags)
            console.log('Thumbnail property:', firstPage.properties?.Thumbnail)
        }

        return clearJsonRes(response) || []
        
    } catch (err) {
        console.error('Notion API error:', {
            message: err.message,
            code: err.code,
            status: err.status
        })
        return []
    }
}

function clearJsonRes(data) {
    let res = []

    console.log('Processing', data.results.length, 'results')

    data.results.map((d, index) => {
        console.log(`Processing page ${index + 1}:`, d.id)
        
        let newVideo = {
            // Nome
            vidName: d.properties?.Name?.title?.[0]?.text?.content || null,
            // Links
            vidLinks: {
                youtube: d.properties?.['Video URL']?.url || null,
                iframe: d.properties?.iframeUrl?.url || null,
            },
            // Tags
            vidTags: d.properties?.Tags?.multi_select?.map(tag => ({
                name: tag.name || null,
                color: tag.color || 'default'
            })) || [],
            // Thumbnail
            vidImg: {
                alt: d.properties?.Thumbnail?.files?.[0]?.name || null,
                url: d.properties?.Thumbnail?.files?.[0]?.file?.url || null,
            },
            // Debug info
            _pageId: d.id,
            _properties: Object.keys(d.properties || {})
        }

        console.log(`Page ${index + 1} processed:`, newVideo)
        res.push(newVideo)
    })

    console.log('Total processed items:', res.length)
    return res
}

export default handler
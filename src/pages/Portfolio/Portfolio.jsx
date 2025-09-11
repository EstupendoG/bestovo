import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const database = process.env.NOTION_DATABASE_ID

async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        console.log('Environment variables check:', {
            hasApiKey: !!process.env.NOTION_API_KEY,
            hasDatabaseId: !!process.env.NOTION_DATABASE_ID,
            databaseId: process.env.NOTION_DATABASE_ID ? 'Set' : 'Missing'
        })

        if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
            return res.status(500).json({ 
                error: 'Server configuration error',
                details: 'Missing environment variables'
            })
        }

        const data = await getNotionDatabase()
        
        console.log('Final data to return:', {
            itemCount: data.length,
            firstItem: data[0] || 'No items'
        })
        
        res.status(200).json(data)
    } catch (err) {
        console.error('Handler error:', err)
        res.status(500).json({ 
            error: 'Error getting Notion database',
            details: err.message 
        })
    }
}

async function getNotionDatabase() {
    try {
        console.log('Querying Notion database:', database)
        
        const response = await notion.databases.query({ 
            database_id: database,
            // Adicionar filtros para debug
            page_size: 5
        })
        
        console.log('Raw Notion API response:', JSON.stringify(response, null, 2))
        
        if (!response.results || response.results.length === 0) {
            console.warn('No results found in database')
            return []
        }

        // Debug: ver a estrutura da primeira página
        const firstPage = response.results[0]
        console.log('First page properties:', Object.keys(firstPage.properties))
        console.log('First page structure:', JSON.stringify(firstPage, null, 2))

        return clearJsonRes(response)
    } catch (err) {
        console.error('Notion API error details:', {
            message: err.message,
            code: err.code,
            status: err.status
        })
        throw err
    }
}

function clearJsonRes(data) {
    if (!data.results || data.results.length === 0) {
        return []
    }

    return data.results.map((d) => {
        // Debug das propriedades
        const properties = d.properties || {}
        console.log('Available properties:', Object.keys(properties))

        return {
            vidName: getTitleValue(properties.Name || properties.name),
            vidLinks: {
                youtube: getUrlValue(properties['Video URL'] || properties['video_url'] || properties.videoUrl),
                iframe: getUrlValue(properties.iframeUrl || properties.iframe_url || properties.iframe),
            },
            vidTags: getMultiSelectValue(properties.Tags || properties.tags),
            vidImg: getFileValue(properties.Thumbnail || properties.thumbnail || properties.image),
            // Informações de debug
            _debug: {
                pageId: d.id,
                properties: Object.keys(properties)
            }
        }
    })
}

// Funções auxiliares para extrair valores
function getTitleValue(property) {
    if (!property || !property.title) return null
    return property.title[0]?.text?.content || null
}

function getUrlValue(property) {
    if (!property || !property.url) return null
    return property.url
}

function getMultiSelectValue(property) {
    if (!property || !property.multi_select) return []
    return property.multi_select.map(tag => ({
        name: tag.name,
        color: tag.color
    }))
}

function getFileValue(property) {
    if (!property || !property.files || property.files.length === 0) {
        return { alt: null, url: null }
    }
    
    const file = property.files[0]
    return {
        alt: file.name || null,
        url: file.type === 'file' ? file.file.url : file.external.url
    }
}

export default handler
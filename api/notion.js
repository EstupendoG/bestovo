import { Client } from '@notionhq/client'

// Verifique se as variáveis de ambiente estão carregadas
console.log('Environment check:', {
  hasApiKey: !!process.env.NOTION_API_KEY,
  hasDatabaseId: !!process.env.NOTION_DATABASE_ID
})

// Crie o cliente Notion com verificação
let notion
try {
  notion = new Client({ 
    auth: process.env.NOTION_API_KEY 
  })
  console.log('Notion client created successfully')
} catch (error) {
  console.error('Failed to create Notion client:', error)
}

const databaseId = process.env.NOTION_DATABASE_ID

export default async function handler(req, res) {
  console.log('=== NOTION API CALL STARTED ===')
  
  // Verificar se o cliente foi criado corretamente
  if (!notion) {
    console.error('Notion client not initialized')
    return res.status(500).json({ 
      error: 'Server configuration error',
      details: 'Notion client failed to initialize'
    })
  }

  // Verificar se as variáveis de ambiente estão definidas
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
    console.error('Missing environment variables')
    return res.status(500).json({ 
      error: 'Server configuration error',
      details: 'Missing Notion API key or database ID'
    })
  }

  try {
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
  try {
    console.log('Querying Notion database with ID:', databaseId)
    
    // Verificar métodos disponíveis no cliente
    console.log('Notion client methods:', Object.keys(notion).filter(key => typeof notion[key] === 'function'))
    
    // Usar a sintaxe correta para a query
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 10
    })
    
    console.log('Notion API response received successfully')
    console.log('Results count:', response.results.length)
    
    return processResults(response)
  } catch (err) {
    console.error('Notion API error details:', {
      message: err.message,
      code: err.code,
      stack: err.stack
    })
    throw err
  }
}

function processResults(data) {
  if (!data.results || data.results.length === 0) {
    console.log('No results found in the database')
    return []
  }

  console.log('Processing', data.results.length, 'results')
  
  return data.results.map((page, index) => {
    console.log(`Processing page ${index + 1}:`, page.id)
    
    // Debug das propriedades disponíveis
    const properties = page.properties || {}
    console.log(`Page ${index + 1} properties:`, Object.keys(properties))
    
    const result = {
      // Nome
      vidName: getTitleValue(properties.Name),
      // Links
      vidLinks: {
        youtube: getUrlValue(properties['Video URL']),
        iframe: getUrlValue(properties.iframeUrl),
      },
      // Tags
      vidTags: getMultiSelectValue(properties.Tags),
      // Thumbnail
      vidImg: getFileValue(properties.Thumbnail),
      // Debug info
      _pageId: page.id,
      _properties: Object.keys(properties)
    }
    
    console.log(`Page ${index + 1} processed:`, result)
    return result
  })
}

// Funções auxiliares para extrair valores
function getTitleValue(property) {
  if (!property || property.type !== 'title') return null
  return property.title[0]?.text?.content || null
}

function getUrlValue(property) {
  if (!property || property.type !== 'url') return null
  return property.url
}

function getMultiSelectValue(property) {
  if (!property || property.type !== 'multi_select') return []
  return property.multi_select.map(tag => ({
    name: tag.name,
    color: tag.color
  }))
}

function getFileValue(property) {
  if (!property || property.type !== 'files') {
    return { alt: null, url: null }
  }
  
  if (!property.files || property.files.length === 0) {
    return { alt: null, url: null }
  }
  
  const file = property.files[0]
  return {
    alt: file.name || null,
    url: file.file?.url || file.external?.url || null
  }
}
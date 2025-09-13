import { Client } from '@notionhq/client'

export default async function handler(req, res) {
  try {
    console.log('Simple Notion test started')
    
    // Verificar variáveis de ambiente
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      return res.status(500).json({ error: 'Missing environment variables' })
    }
    
    // Criar cliente
    const notion = new Client({ auth: process.env.NOTION_API_KEY })
    
    // Testar método simples
    const databaseInfo = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID
    })
    
    console.log('Database info:', databaseInfo.title)
    
    res.status(200).json({ 
      success: true,
      database: databaseInfo.title[0]?.text?.content,
      properties: Object.keys(databaseInfo.properties)
    })
    
  } catch (error) {
    console.error('Simple test error:', error)
    res.status(500).json({ 
      error: error.message,
      code: error.code
    })
  }
}
import { Client } from '@notionhq/client'

export default async function handler(req, res) {
  try {
    console.log("Simple Notion test started");

    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      return res.status(500).json({ error: "Missing environment variables" });
    }

    const notion = new Client({ auth: process.env.NOTION_API_KEY });

    const databaseInfo = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    console.log("Database info full:", databaseInfo);

    res.status(200).json({
      success: true,
      raw: databaseInfo, // <-- manda bruto
      database: databaseInfo.title?.[0]?.text?.content || null,
      properties: databaseInfo.properties
        ? Object.keys(databaseInfo.properties)
        : [],
    });
  } catch (error) {
    console.error("Simple test error:", error);
    res.status(500).json({
      error: error.message,
      code: error.code,
    });
  }
}

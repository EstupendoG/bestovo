import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  try {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      return res.status(500).json({ error: "Missing environment variables" });
    }

    const notion = new Client({ auth: process.env.NOTION_API_KEY });

    // consulta os itens do database
    const query = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    const results = query.results.map((d) => ({
      id: d.id,
      name: d.properties?.Name?.title?.[0]?.text?.content || null,
      tags: d.properties?.Tags?.multi_select?.map((t) => t.name) || [],
      url: d.properties?.["Video URL"]?.url || null,
    }));

    res.status(200).json({ success: true, items: results });
  } catch (error) {
    console.error("Notion error:", error);
    res.status(500).json({ error: error.message, code: error.code });
  }
}

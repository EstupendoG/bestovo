import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    return res.status(500).json({ error: "Missing environment variables" });
  }

  try {
    const notion = new Client({ auth: NOTION_API_KEY });

    const response = await notion.query({
      database_id: NOTION_DATABASE_ID,
      page_size: 10,
    });

    const items = (response.results || []).map((d) => ({
      id: d.id,
      name: d.properties?.Name?.title?.[0]?.plain_text || null,
    }));

    return res.status(200).json({ success: true, count: items.length, items });
  } catch (err) {
    console.error("Notion error:", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

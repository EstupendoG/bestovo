import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });

    console.log("notion keys:", Object.keys(notion));

    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    res.status(200).json({ ok: true, results: response.results.length });
  } catch (err) {
    console.error("Notion error:", err);
    res.status(500).json({ error: err.message });
  }
}

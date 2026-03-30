import sql from "../db/db.js";

export const GetAll = async (req, res) => {
  const { filter, sort, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    // Basic implementation of filtering, sorting, and pagination
    // In a real scenario, you'd want more robust SQL construction or an ORM
    let query = sql`SELECT * FROM campaigns WHERE deleted_at IS NULL`;

    if (filter) {
      // Very basic filtering by name or status
      query = sql`SELECT * FROM campaigns WHERE deleted_at IS NULL AND (name ILIKE ${'%' + filter + '%'} OR status = ${filter})`;
    }

    // Add pagination
    const campaigns = await sql`
      ${query}
      ORDER BY ${sort === 'name' ? sql`name` : sql`created_at DESC`}
      LIMIT ${limit} OFFSET ${offset}
    `;

    res.json({
      data: campaigns,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const GetById = async (req, res) => {
  const { id } = req.params;
  try {
    const campaigns = await sql`
      SELECT c.*, 
             COALESCE(json_agg(m.*) FILTER (WHERE m.id IS NOT NULL), '[]') as metrics
      FROM campaigns c
      LEFT JOIN campaign_metrics m ON c.id = m.campaign_id
      WHERE c.id = ${id} AND c.deleted_at IS NULL
      GROUP BY c.id
    `;

    if (campaigns.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json(campaigns[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  const { name, client_id, budget, status, start_date, end_date } = req.body;

  try {
    const campaign = await sql`
      INSERT INTO campaigns (name, client_id, budget, status, start_date, end_date) 
      VALUES (${name}, ${client_id}, ${budget}, ${status}, ${start_date || null}, ${end_date || null})
      RETURNING *
    `;
    res.status(201).json(campaign[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { name, budget, status, start_date, end_date } = req.body;

  try {
    const campaign = await sql`
      UPDATE campaigns 
      SET name = COALESCE(${name}, name),
          budget = COALESCE(${budget}, budget),
          status = COALESCE(${status}, status),
          start_date = COALESCE(${start_date}, start_date),
          end_date = COALESCE(${end_date}, end_date),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} AND deleted_at IS NULL
      RETURNING *
    `;

    if (campaign.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json(campaign[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const softDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const campaign = await sql`
      UPDATE campaigns 
      SET deleted_at = CURRENT_TIMESTAMP 
      WHERE id = ${id} AND deleted_at IS NULL
      RETURNING *
    `;

    if (campaign.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json({ message: 'Campaign soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

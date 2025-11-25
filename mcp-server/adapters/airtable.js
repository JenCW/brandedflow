const Airtable = require('airtable');

function getBase() {
  const key = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!key || !baseId) throw new Error('AIRTABLE_API_KEY or AIRTABLE_BASE_ID not set');
  const base = new Airtable({ apiKey: key }).base(baseId);
  return base;
}

module.exports = {
  listRecords: async (tableName, opts = {}) => {
    const base = getBase();
    const records = [];
    await base(tableName).select(opts).eachPage((page, fetchNext) => {
      page.forEach(r => records.push({ id: r.id, fields: r.fields }));
      fetchNext();
    });
    return records;
  }
};

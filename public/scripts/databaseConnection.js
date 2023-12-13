async function getItems(container){
    const query = {
        query: 'SELECT TOP 50 * FROM c ORDER BY c._ts DESC'
    };

    const { resources } = await container.items.query(query).fetchAll();
    return resources;
}

async function getRoute(container){
    const queryMaxTimestamp = 'SELECT VALUE MAX(c.timestamp) FROM c';
    const { resources: maxTimestampResult } = await container.items.query(queryMaxTimestamp).fetchAll();
  
    if (maxTimestampResult.length > 0) {
      const maxTimestamp = maxTimestampResult[0];
  
      // Query to fetch all entries with the maximum timestamp value
      const queryLatestEntries = `SELECT * FROM c WHERE c.timestamp = '${maxTimestamp}'`;
      const { resources: latestEntriesResult } = await container.items.query(queryLatestEntries).fetchAll();
      
      return latestEntriesResult;
      }
      }

module.exports = {getItems, getRoute}
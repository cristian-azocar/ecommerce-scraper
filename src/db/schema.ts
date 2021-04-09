// TODO: complete the schema
const schema = {
  tables: {
    platform: {
      tableName: 'platform',
      columns: {
        id: 'id',
        name: 'name',
      },
    },
    product: {
      tableName: 'product',
      columns: {
        id: 'id',
        websiteId: 'website_id',
        platformId: 'platform_id',
      },
    },
    website: {
      tableName: 'website',
      columns: {
        id: 'id',
      },
    },
  },
};

export default schema;

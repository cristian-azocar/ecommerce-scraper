// TODO: complete the schema
const schema = {
  tables: {
    platform: {
      tableName: 'platform',
      columns: {
        id: 'id',
        name: 'name',
        lookup: 'lookup',
      },
    },
    availability: {
      tableName: 'availability',
      columns: {
        id: 'id',
        name: 'name',
        lookup: 'lookup',
      },
    },
    condition: {
      tableName: 'condition',
      columns: {
        id: 'id',
        name: 'name',
        lookup: 'lookup',
      },
    },
    website: {
      tableName: 'website',
      columns: {
        id: 'id',
      },
    },
    product: {
      tableName: 'product',
      columns: {
        id: 'id',
        websiteId: 'website_id',
        platformId: 'platform_id',
        availabilityId: 'availability_id',
        conditionId: 'condition_id',
      },
    },
  },
};

export default schema;

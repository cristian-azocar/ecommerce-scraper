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
    retail: {
      tableName: 'retail',
      columns: {
        id: 'id',
        name: 'name',
        baseUrl: 'base_url',
        urls: 'urls',
        isEnabled: 'is_enabled',
        httpMethod: 'http_method',
        pagination: 'pagination',
        selectors: 'selectors',
      },
    },
    product: {
      tableName: 'product',
      columns: {
        id: 'id',
        retailId: 'retail_id',
        sku: 'sku',
        name: 'name',
        platformId: 'platform_id',
        url: 'url',
        imageUrl: 'image_url',
        sourceUrl: 'source_url',
        price: 'price',
        listPrice: 'list_price',
        discount: 'discount',
        discountPercentage: 'discount_percentage',
        availabilityId: 'availability_id',
        estimatedArrivalDate: 'estimated_arrival_date',
        conditionId: 'condition_id',
      },
    },
  },
};

export default schema;

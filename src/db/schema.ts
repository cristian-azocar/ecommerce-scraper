// TODO: complete the schema
const schema = {
  tables: {
    platform: {
      tableName: 'platform',
      columns: {
        id: 'id',
        categoryId: 'category_id',
        name: 'name',
        codes: 'codes',
      },
    },
    availability: {
      tableName: 'availability',
      columns: {
        id: 'id',
        name: 'name',
        codes: 'codes',
      },
    },
    condition: {
      tableName: 'condition',
      columns: {
        id: 'id',
        name: 'name',
        codes: 'codes',
      },
    },
    retail: {
      tableName: 'retail',
      columns: {
        id: 'id',
        code: 'code',
        name: 'name',
        baseUrl: 'base_url',
        urls: 'urls',
        isActive: 'is_active',
        httpMethod: 'http_method',
        pagination: 'pagination',
        selectors: 'selectors',
      },
    },
    category: {
      tableName: 'category',
      columns: {
        id: 'id',
        parentId: 'parent_id',
        code: 'code',
        name: 'name',
        isActive: 'is_active',
      },
    },
    product: {
      tableName: 'product',
      columns: {
        id: 'id',
        retailId: 'retail_id',
        categoryId: 'category_id',
        sku: 'sku',
        name: 'name',
        url: 'url',
        imageUrl: 'image_url',
        sourceUrl: 'source_url',
        price: 'price',
        listPrice: 'list_price',
        discount: 'discount',
        discountPercentage: 'discount_percentage',
        availabilityId: 'availability_id',
        arrivalDate: 'arrival_date',
        conditionId: 'condition_id',
      },
    },
  },
};

export default schema;

const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({price: {$gt: 30}})
    .sort("price")
    .select("name price");

  res.status(200).json({products, nbHits: products.length});
};

const getAllProducts = async (req, res) => {
  const {featured, company, name, sort, fields, numericFilters} = req.query;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = {$regex: name, $options: "i"};
  }
  if (numericFilters) {
    const options = ["price", "rating"];
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<=": "$lte",
      "<": "$lt",
    };
    const regEx = /\b(<|<=|=|>=|>)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = {[operator]: Number(value)};
      }
    });
  }
  // console.log(queryObject);
  const products = await Product.find(queryObject)
    .sort(sort ? sort.split(",").join(" ") : "createdAt")
    .select(fields ? fields.split(",").join(" ") : "+_id")
    .skip(skip)
    .limit(limit);

  res.status(200).json({products, nbHits: products.length});
};

module.exports = {getAllProducts, getAllProductsStatic};

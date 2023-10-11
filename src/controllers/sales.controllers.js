import data from '../models/data.json' assert { type: "json" };

const sales = data.sales;

const getSales = async (req, res) => {
  res.json(sales)
}

export {
  getSales
}
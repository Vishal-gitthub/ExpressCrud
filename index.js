import express from "express";

const app = express();

app.use(express.json());
let fruit = [];
let fruitId = 1;

app.post("/", (req, res) => {
  const { name, price } = req.body;
  const newFruits = { id: fruitId++, name, price };
  fruit.push(newFruits);
  res.status(201).send(fruit);
});

app.put("/:id", (req, res) => {
  const item = fruit.find((item) => item.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).send("Data Not Found");
  }
  const { name, price } = req.body;
  item.name = name;
  item.price = price;
  return res.status(202).send(item);
});

app.delete("/:id", (req, res) => {
  const itemIndex = fruit.findIndex(
    (item) => item.id === parseInt(req.params.id)
  );
  if (!itemIndex === -1) {
    return res.status(404).send("id not found");
  }
  fruit.splice(itemIndex, 1);
  return res.status(200).send("Deleted Successfully")
});

app.get("/", (req, res) => {
  res.status(200).send(fruit);
});

app.listen(3000, () => console.log("server is listening"));

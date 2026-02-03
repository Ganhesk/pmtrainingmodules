const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store
let inventory = [
    { id: 1, name: "Arduino Kit", category: "Hardware", quantity: 5, status: "Available" },
    { id: 2, name: "Figma License", category: "Software", quantity: 20, status: "Available" },
    { id: 3, name: "Resistor Pack", category: "Hardware", quantity: 0, status: "Unavailable" },
    { id: 4, name: "Adobe Creative Cloud", category: "Software", quantity: 10, status: "Available" }
];

// GET /inventory - Returns the full inventory list
app.get('/inventory', (req, res) => {
    res.json(inventory);
});

// POST /inventory - Adds a new item to the inventory
app.post('/inventory', (req, res) => {
    const { name, category, quantity, status } = req.body;

    if (!name || !category || quantity === undefined || !status) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newItem = {
        id: inventory.length > 0 ? Math.max(...inventory.map(item => item.id)) + 1 : 1,
        name,
        category,
        quantity,
        status
    };

    inventory.push(newItem);
    res.status(201).json({ message: "Item added successfully", item: newItem });
});

app.listen(port, () => {
    console.log(`Inventory server listening at http://localhost:${port}`);
});

import React, { useState, useEffect } from 'react';

const App = () => {
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({ name: '', category: '', quantity: 0, status: 'Available' });

  // 1. Fetch data from backend on load
  const fetchInventory = async () => {
    try {
      const response = await fetch('https://pmtrainingmodulesback.onrender.com');
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // 2. Handle Form Submission (POST to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3001/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    // 3. Refresh list automatically after POST
    fetchInventory(); 
    setFormData({ name: '', category: '', quantity: 0, status: 'Available' }); 
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Inventory Dashboard</h1>

      {/* React Form */}
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            style={styles.input}
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            placeholder="Item Name" 
            required 
          />
          <input 
            style={styles.input}
            value={formData.category} 
            onChange={(e) => setFormData({...formData, category: e.target.value})} 
            placeholder="Category" 
            required 
          />
          <input 
            style={styles.input}
            type="number"
            value={formData.quantity} 
            onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})} 
            placeholder="Quantity" 
            required 
          />
          <select 
            style={styles.input}
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
          <button type="submit" style={styles.button}>Add Item</button>
        </form>
      </div>

      {/* Render the list */}
      <div style={styles.grid}>
        {inventory.map(item => (
          <div key={item.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.itemName}>{item.name}</h2>
              <span style={{
                ...styles.badge, 
                backgroundColor: item.status === "Available" ? "#dcfce7" : "#fee2e2",
                color: item.status === "Available" ? "#166534" : "#991b1b"
              }}>
                {item.status}
              </span>
            </div>
            <p style={styles.details}><strong>Category:</strong> {item.category}</p>
            <p style={styles.details}><strong>Quantity:</strong> {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Required Styles object
const styles = {
  container: { padding: '40px', backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' },
  header: { textAlign: 'center', marginBottom: '30px', color: '#111827' },
  formContainer: { maxWidth: '1000px', margin: '0 auto 40px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' },
  form: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  input: { padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', flex: '1 1 150px' },
  button: { padding: '8px 16px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', maxWidth: '1000px', margin: '0 auto' },
  card: { backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' },
  itemName: { fontSize: '1.25rem', margin: 0, color: '#1f2937' },
  badge: { padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' },
  details: { margin: '5px 0', color: '#4b5563', fontSize: '0.95rem' }
};

// 4. THE EXPORT (Fixes the index.js error)
export default App;
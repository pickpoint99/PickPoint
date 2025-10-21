import React, {useState} from 'react';
import { SAMPLE_PRODUCTS } from '../data/products';

export default function Admin() {
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [newProduct, setNewProduct] = useState({title:'', price:0, category:'', color:'#FFFFFF', desc:''});

  const addProduct = () => {
    if(!newProduct.title) return;
    setProducts([...products, {...newProduct, id:Date.now()}]);
    setNewProduct({title:'', price:0, category:'', color:'#FFFFFF', desc:''});
  };

  const removeProduct = (id) => {
    setProducts(products.filter(p=>p.id!==id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-pink-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4 flex gap-2 flex-wrap">
        <input className="border p-1 rounded" placeholder="Title" value={newProduct.title} onChange={e=>setNewProduct({...newProduct,title:e.target.value})}/>
        <input type="number" className="border p-1 rounded w-24" placeholder="Price" value={newProduct.price} onChange={e=>setNewProduct({...newProduct,price:Number(e.target.value)})}/>
        <input className="border p-1 rounded w-32" placeholder="Category" value={newProduct.category} onChange={e=>setNewProduct({...newProduct,category:e.target.value})}/>
        <input type="color" className="border rounded" value={newProduct.color} onChange={e=>setNewProduct({...newProduct,color:e.target.value})}/>
        <input className="border p-1 rounded w-48" placeholder="Description" value={newProduct.desc} onChange={e=>setNewProduct({...newProduct,desc:e.target.value})}/>
        <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={addProduct}>Add</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(p=>(
          <div key={p.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <div className="font-bold">{p.title}</div>
              <div className="text-sm">৳{p.price} — {p.category}</div>
            </div>
            <button className="text-red-600 font-semibold" onClick={()=>removeProduct(p.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

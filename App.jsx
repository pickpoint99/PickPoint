/* 
Colorful E‑Commerce React Single-File App (Tailwind)
File: App.jsx (replace src/App.jsx in a Vite + React + Tailwind project)
*/
import React, {useEffect, useState} from 'react';

const SAMPLE_PRODUCTS = [
  {id:1, title:'Stylish T‑Shirt', price:499, category:'Clothing', img:'', color:'#FF6B6B', desc:'Soft cotton tee, unisex.'},
  {id:2, title:'Wireless Earbuds', price:2499, category:'Electronics', img:'', color:'#4D96FF', desc:'Clear sound, long battery.'},
  {id:3, title:'Handmade Mug', price:699, category:'Home', img:'', color:'#F7C948', desc:'Stoneware, unique glaze.'},
  {id:4, title:'Gift Box — Surprise', price:1299, category:'Gifts', img:'', color:'#9B5DE5', desc:'Curated items for special occasions.'},
  {id:5, title:'Power Bank 10000mAh', price:899, category:'Electronics', img:'', color:'#00C2A8', desc:'Slim and fast charging.'},
  {id:6, title:'Kids Toy Car', price:399, category:'Toys', img:'', color:'#FF8FAB', desc:'Safe and fun.'},
];

function useLocalStorage(key, initial) {
  const [state, setState] = useState(()=>{
    try{ const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : initial;}catch(e){return initial}
  });
  useEffect(()=>{ try{ localStorage.setItem(key, JSON.stringify(state)); }catch(e){} },[key,state]);
  return [state, setState];
}

export default function App(){
  const [products] = useState(SAMPLE_PRODUCTS);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useLocalStorage('cart_v1', []);
  const [selected, setSelected] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [message, setMessage] = useState('');

  function addToCart(prod, qty=1){
    setCart(prev=>{
      const found = prev.find(p=>p.id===prod.id);
      if(found){
        return prev.map(p=> p.id===prod.id ? {...p, qty: p.qty+qty} : p);
      }
      return [...prev, {...prod, qty}];
    });
    setMessage('Added to cart');
    setTimeout(()=>setMessage(''),1200);
  }

  function updateQty(id, qty){
    setCart(prev=> prev.map(p=> p.id===id?{...p, qty: Math.max(0, qty)}:p).filter(p=>p.qty>0));
  }
  function removeItem(id){ setCart(prev=> prev.filter(p=>p.id!==id)); }
  function clearCart(){ setCart([]); }

  const totals = cart.reduce((s,i)=> s + i.price * i.qty, 0);

  function checkoutCOD(){
    if(cart.length===0){ alert('Cart is empty'); return; }
    const order = {id: 'ORD'+Date.now(), items: cart, total: totals, payment: 'Cash on Delivery', date: new Date().toISOString()};
    clearCart();
    setShowCart(false);
    alert('Order placed (Cash on Delivery) — Order ID: '+order.id);
  }

  const categories = ['All', ...Array.from(new Set(products.map(p=>p.category)))];

  const filtered = products.filter(p=> (category==='All'||p.category===category) && p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-blue-50">
      <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl" style={{background:'linear-gradient(135deg,#FF6B6B,#FF8FAB)'}}>MH</div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight">MH Tech Store</h1>
              <p className="text-sm text-gray-600">Colorful · Unique · All categories</p>
            </div>
          </div>

          <div className="flex-1 mx-6">
            <div className="flex bg-white rounded-full shadow-sm overflow-hidden">
              <input value={query} onChange={e=>setQuery(e.target.value)} className="flex-1 px-4 py-2 outline-none" placeholder="Search products, e.g. shirt, earbuds" />
              <button className="px-4" onClick={()=>{}}>🔎</button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex gap-2 items-center">
              {categories.map(cat=> (
                <button key={cat} onClick={()=>setCategory(cat)} className={`px-3 py-1 rounded-full text-sm ${category===cat? 'bg-black text-white':'bg-white text-gray-700'}`}>{cat}</button>
              ))}
            </div>

            <button onClick={()=>setShowCart(true)} className="relative bg-black text-white px-4 py-2 rounded-lg">🛒 Cart <span className="ml-2 bg-white text-black px-2 rounded-full text-xs">{cart.length}</span></button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured products</h2>
            <div className="text-sm text-gray-600">Cash on Delivery available nationwide</div>
          </div>
          <p className="text-sm text-gray-500 mt-2">All kinds of products — filter, search and add to cart.</p>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(p=> (
              <div key={p.id} className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:scale-[1.01] transition">
                <div className="h-44 flex items-center justify-center" style={{background:`linear-gradient(135deg, ${p.color}33, #ffffff)`}}>
                  <div className="w-28 h-28 rounded-lg flex items-center justify-center text-xl font-bold" style={{background:p.color,color:'#fff'}}>{p.title.split(' ')[0]}</div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{p.desc}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-lg font-bold">৳{p.price}</div>
                    <div className="flex gap-2">
                      <button onClick={()=>setSelected(p)} className="px-3 py-1 rounded-full border">View</button>
                      <button onClick={()=>addToCart(p,1)} className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white">Add</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h3 className="text-lg font-semibold mb-3">How it works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow"> <div className="text-2xl">🛍️</div><div className="font-semibold mt-2">Browse & Add</div><div className="text-sm text-gray-500 mt-1">Search or filter any product and add to cart.</div></div>
            <div className="bg-white p-4 rounded-lg shadow"> <div className="text-2xl">📦</div><div className="font-semibold mt-2">Checkout</div><div className="text-sm text-gray-500 mt-1">Choose Cash on Delivery at checkout.</div></div>
            <div className="bg-white p-4 rounded-lg shadow"> <div className="text-2xl">🚚</div><div className="font-semibold mt-2">Delivered</div><div className="text-sm text-gray-500 mt-1">Delivery to your address — pay on delivery.</div></div>
          </div>
        </section>

      </main>

      {/* cart drawer */}
      <div className={`fixed inset-0 z-50 pointer-events-auto ${showCart? '':'hidden'}`}>
        <div className="absolute inset-0 bg-black/40" onClick={()=>setShowCart(false)}></div>
        <aside className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl p-6 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button onClick={()=>setShowCart(false)} className="text-gray-600">✕</button>
          </div>

          {cart.length===0 ? (
            <div className="text-center text-gray-500 mt-10">Your cart is empty — add products to get started.</div>
          ) : (
            <div className="space-y-4">
              {cart.map(item=> (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{background:item.color}}>
                    <span className="text-white font-bold">{item.title.split(' ')[0]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-gray-500">৳{item.price} × {item.qty} = ৳{item.price*item.qty}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={()=>updateQty(item.id, item.qty-1)} className="px-2 py-1 border rounded">-</button>
                      <div className="px-3 py-1 border rounded">{item.qty}</div>
                      <button onClick={()=>updateQty(item.id, item.qty+1)} className="px-2 py-1 border rounded">+</button>
                      <button onClick={()=>removeItem(item.id)} className="ml-2 text-sm text-red-600">Remove</button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex items-center justify-between"><div className="text-gray-600">Subtotal</div><div className="font-bold">৳{totals}</div></div>
                <div className="text-sm text-gray-500 mt-2">Shipping & taxes calculated on delivery.</div>

                <div className="mt-4 flex gap-2">
                  <button onClick={checkoutCOD} className="flex-1 py-2 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold">Checkout — Cash on Delivery</button>
                  <button onClick={clearCart} className="px-4 py-2 rounded-lg border">Clear</button>
                </div>
              </div>

            </div>
          )}
        </aside>
      </div>

      {/* product modal */}
      {selected && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setSelected(null)}></div>
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl w-full z-50">
            <div className="flex gap-6">
              <div className="w-36 h-36 rounded-lg flex items-center justify-center" style={{background: selected.color}}>
                <div className="text-white font-bold">{selected.title.split(' ')[0]}</div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">{selected.title}</h3>
                <div className="text-sm text-gray-500">{selected.desc}</div>
                <div className="mt-4 font-bold text-2xl">৳{selected.price}</div>

                <div className="mt-6 flex items-center gap-3">
                  <label className="text-sm">Quantity</label>
                  <input type="number" defaultValue={1} min={1} id="qtyinput" className="w-20 border rounded px-2 py-1" />
                  <button onClick={()=>{ const q = Number(document.getElementById('qtyinput').value)||1; addToCart(selected,q); setSelected(null); }} className="ml-auto px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-400 text-white">Add to cart</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* small toast */}
      {message && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-6 bg-black text-white px-4 py-2 rounded-full shadow">{message}</div>
      )}

      <footer className="mt-12 py-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} MH Tech Store — Cash on Delivery enabled • Built with React + Tailwind</footer>
    </div>
  );
}

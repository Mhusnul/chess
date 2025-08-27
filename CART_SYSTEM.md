# Chess Cart System with Zustand

Sistem cart untuk toko buku catur menggunakan Zustand sebagai global state management.

## 🚀 Fitur Cart

### ✅ **Fungsi Utama**

- ✅ **Add to Cart**: Menambahkan buku ke keranjang
- ✅ **Update Quantity**: Mengubah jumlah item di keranjang
- ✅ **Remove Item**: Menghapus item dari keranjang
- ✅ **Clear Cart**: Mengosongkan seluruh keranjang
- ✅ **Persistent Storage**: Cart tersimpan di localStorage
- ✅ **Real-time Counter**: Badge counter di navbar
- ✅ **Toast Notifications**: Notifikasi saat menambah item

### 🎯 **Komponen yang Dibuat**

#### 1. **Cart Store** (`src/store/cartStore.js`)

```javascript
// Global state management menggunakan Zustand
const useCartStore = create(persist(...))
```

#### 2. **Cart Component** (`src/components/common/Cart.jsx`)

- Side panel cart dengan overlay
- List item dengan thumbnail dan controls
- Quantity controls (+/- buttons)
- Total price calculation
- Checkout dan clear cart buttons

#### 3. **CartIcon Component** (`src/components/common/CartIcon.jsx`)

- Icon cart di navbar
- Badge counter real-time
- Toggle cart panel

#### 4. **Toast Notifications** (`src/hooks/useToast.js`)

- Notifikasi success saat add to cart
- Auto-dismiss dalam 3 detik
- Custom hook untuk reusability

### 📦 **Data Structure**

#### Book Data Structure:

```javascript
{
  id: 1,
  title: "Be a Game Changer",
  desc: "Deskripsi buku...",
  img: "/path/to/image.jpg",
  price: 150000,
  author: "Muhammad Husnul",
  category: "Motivasi"
}
```

#### Cart Item Structure:

```javascript
{
  id: 1,
  title: "Be a Game Changer",
  desc: "Deskripsi buku...",
  img: "/path/to/image.jpg",
  price: 150000,
  author: "Muhammad Husnul",
  category: "Motivasi",
  quantity: 2  // Ditambahkan saat di cart
}
```

## 🛠 **Cara Menggunakan**

### 1. **Menambah Item ke Cart**

```javascript
const { addToCart } = useCartStore();
addToCart(bookData);
```

### 2. **Mengupdate Quantity**

```javascript
const { updateQuantity } = useCartStore();
updateQuantity(bookId, newQuantity);
```

### 3. **Menghapus Item**

```javascript
const { removeFromCart } = useCartStore();
removeFromCart(bookId);
```

### 4. **Mengosongkan Cart**

```javascript
const { clearCart } = useCartStore();
clearCart();
```

### 5. **Mendapatkan Data Cart**

```javascript
const {
  items, // Array item di cart
  getTotalItems, // Total jumlah item
  getTotalPrice, // Total harga
  getItemQuantity, // Quantity item tertentu
} = useCartStore();
```

## 🎨 **UI/UX Features**

### **Cart Panel**

- **Slide-in animation** dari kanan
- **Backdrop blur** untuk overlay
- **Responsive design** untuk mobile
- **Empty state** dengan ilustrasi

### **Book Cards**

- **Dynamic button text** berdasarkan quantity
- **Hover effects** untuk interaktivity
- **Price formatting** dalam Rupiah
- **Quick add** dengan tombol "+"

### **Toast Notifications**

- **Success animations** saat add to cart
- **Auto-positioning** di top-right
- **Dismiss button** manual

## 🔧 **Technical Implementation**

### **Zustand Store**

```javascript
// State
items: [],
isCartOpen: false,

// Actions
addToCart: (book) => { /* logic */ },
updateQuantity: (id, qty) => { /* logic */ },
removeFromCart: (id) => { /* logic */ },
clearCart: () => { /* logic */ },

// Computed Values
getTotalItems: () => { /* calculation */ },
getTotalPrice: () => { /* calculation */ }
```

### **Persistent Storage**

```javascript
persist(
  // store logic
  {
    name: "chess-cart-storage",
    partialize: (state) => ({ items: state.items }),
  }
);
```

## 📱 **Responsive Design**

- ✅ **Mobile First**: Cart panel responsif di semua device
- ✅ **Touch Friendly**: Button size optimal untuk mobile
- ✅ **Backdrop Handling**: Proper overlay untuk mobile
- ✅ **Grid Layout**: Book cards adaptif

## 🔄 **State Management Flow**

```
User Action → Zustand Store → Component Re-render → UI Update
     ↓
LocalStorage ← Persist Middleware ← State Change
```

## 🧪 **Testing Cart**

1. **Buka aplikasi** di http://localhost:5174
2. **Scroll ke section Book**
3. **Klik tombol "Beli Sekarang"** pada buku
4. **Lihat badge counter** di icon cart (navbar)
5. **Klik icon cart** untuk membuka panel
6. **Test quantity controls** (+/- buttons)
7. **Test remove item** (trash icon)
8. **Test clear cart** button

## 🎯 **Next Steps**

- [ ] Checkout functionality
- [ ] Payment integration
- [ ] Order history
- [ ] Wishlist feature
- [ ] Product search & filter
- [ ] User authentication
- [ ] Email notifications

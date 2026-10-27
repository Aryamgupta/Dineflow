'use client';

import { useState } from 'react';
import { Icon } from '../landing/Icon';

type MenuItem = {
  id: string;
  name: string;
  category: 'Starters' | 'Mains' | 'Desserts' | 'Beverages';
  price: number;
  description: string;
  inStock: boolean;
  isVegetarian: boolean;
  isGlutenFree: boolean;
  rating: number;
  orderCount: number;
};

const initialMenu: MenuItem[] = [
  {
    id: 'DISH-01',
    name: 'Truffle Tagliatelle',
    category: 'Mains',
    price: 28.0,
    description: 'Fresh egg pasta tossed with winter black truffle cream, parmigiano reggiano 24-month, and shaved truffles.',
    inStock: true,
    isVegetarian: true,
    isGlutenFree: false,
    rating: 4.94,
    orderCount: 412,
  },
  {
    id: 'DISH-02',
    name: 'Dry-Aged Prime Ribeye (14oz)',
    category: 'Mains',
    price: 58.0,
    description: '45-day dry-aged bone-in ribeye char-grilled over white oak, served with roasted bone marrow butter.',
    inStock: true,
    isVegetarian: false,
    isGlutenFree: true,
    rating: 4.88,
    orderCount: 286,
  },
  {
    id: 'DISH-03',
    name: 'Burrata Caprese Artigiana',
    category: 'Starters',
    price: 18.0,
    description: 'Pugliese burrata, heirloom vine tomatoes, aged balsamic glaze, and torn basil from our garden.',
    inStock: true,
    isVegetarian: true,
    isGlutenFree: true,
    rating: 4.91,
    orderCount: 340,
  },
  {
    id: 'DISH-04',
    name: 'Crispy Calamari Fritti',
    category: 'Starters',
    price: 19.5,
    description: 'Lightly floured point judith squid, cherry peppers, lemon garlic aioli, and marinara dip.',
    inStock: true,
    isVegetarian: false,
    isGlutenFree: false,
    rating: 4.76,
    orderCount: 215,
  },
  {
    id: 'DISH-05',
    name: 'Classic Espresso Tiramisu',
    category: 'Desserts',
    price: 12.0,
    description: 'House-baked savoiardi dipped in illy espresso and dark rum, whipped mascarpone, and valrhona cocoa.',
    inStock: true,
    isVegetarian: true,
    isGlutenFree: false,
    rating: 4.95,
    orderCount: 390,
  },
  {
    id: 'DISH-06',
    name: 'Barolo Reserve 2018 (Glass)',
    category: 'Beverages',
    price: 24.0,
    description: 'Piedmont DOCG. Garnet red with rose petal and violet notes, full-bodied with structured tannins.',
    inStock: true,
    isVegetarian: true,
    isGlutenFree: true,
    rating: 4.92,
    orderCount: 168,
  },
];

export function MenuManagementModule() {
  const [items, setItems] = useState<MenuItem[]>(initialMenu);
  const [selectedCat, setSelectedCat] = useState<'All' | 'Starters' | 'Mains' | 'Desserts' | 'Beverages'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<MenuItem['category']>('Mains');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [isVeg, setIsVeg] = useState(false);
  const [isGF, setIsGF] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredItems = items.filter((i) => {
    if (selectedCat !== 'All' && i.category !== selectedCat) return false;
    return true;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setName('');
    setCategory('Mains');
    setPrice('');
    setDesc('');
    setIsVeg(false);
    setIsGF(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item);
    setName(item.name);
    setCategory(item.category);
    setPrice(String(item.price));
    setDesc(item.description);
    setIsVeg(item.isVegetarian);
    setIsGF(item.isGlutenFree);
    setIsModalOpen(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    if (editingItem) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === editingItem.id
            ? {
                ...i,
                name,
                category,
                price: parseFloat(price) || 0,
                description: desc,
                isVegetarian: isVeg,
                isGlutenFree: isGF,
              }
            : i
        )
      );
      showToast(`Updated "${name}" in menu.`);
    } else {
      const created: MenuItem = {
        id: `DISH-0${items.length + 1}`,
        name,
        category,
        price: parseFloat(price) || 0,
        description: desc,
        inStock: true,
        isVegetarian: isVeg,
        isGlutenFree: isGF,
        rating: 5.0,
        orderCount: 0,
      };
      setItems((prev) => [created, ...prev]);
      showToast(`Added "${name}" to ${category}.`);
    }

    setIsModalOpen(false);
  };

  const handleToggleStock = (item: MenuItem) => {
    const updated = !item.inStock;
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, inStock: updated } : i))
    );
    showToast(`"${item.name}" marked ${updated ? 'In Stock' : '86ed / Out of Stock'}`);
  };

  const handleDeleteItem = () => {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    showToast(`Removed "${deleteTarget.name}" from restaurant menu.`);
    setDeleteTarget(null);
  };

  return (
    <div className="owner-page-container">
      {/* Header */}
      <div className="owner-page-header">
        <div className="owner-page-title-wrap">
          <p className="owner-eyebrow">Culinary Offerings</p>
          <h1>Menu Catalog &amp; Dish Inventory</h1>
          <p className="owner-page-subtitle">
            Configure dish descriptions, pricing, dietary indicators, allergens, and live table 86 / availability toggles.
          </p>
        </div>

        <div className="owner-header-actions">
          <button className="owner-btn owner-btn-primary" onClick={handleOpenAdd} type="button">
            <Icon name="restaurant_menu" />
            <span>Add Menu Item</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="owner-tabs-bar">
        <div className="owner-tabs-group" role="tablist">
          {(['All', 'Starters', 'Mains', 'Desserts', 'Beverages'] as const).map((cat) => {
            const count = cat === 'All' ? items.length : items.filter((i) => i.category === cat).length;
            return (
              <button
                key={cat}
                className={`owner-tab-btn ${selectedCat === cat ? 'is-active' : ''}`}
                onClick={() => setSelectedCat(cat)}
                type="button"
              >
                <span>{cat}</span>
                <span className="owner-tab-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Table */}
      <div className="owner-table-wrapper">
        <table className="owner-table">
          <thead>
            <tr>
              <th>Dish Name &amp; Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Dietary Attributes</th>
              <th>Guest Rating</th>
              <th>Availability</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td style={{ maxWidth: '20rem' }}>
                  <strong>{item.name}</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.6875rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                    {item.description}
                  </p>
                </td>
                <td>
                  <span className="owner-badge owner-badge-neutral">{item.category}</span>
                </td>
                <td>
                  <strong style={{ fontSize: '0.875rem' }}>${item.price.toFixed(2)}</strong>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                    {item.isVegetarian && (
                      <span className="owner-badge owner-badge-success" style={{ fontSize: '0.625rem' }}>
                        Vegetarian
                      </span>
                    )}
                    {item.isGlutenFree && (
                      <span className="owner-badge owner-badge-primary" style={{ fontSize: '0.625rem' }}>
                        Gluten-Free
                      </span>
                    )}
                    {!item.isVegetarian && !item.isGlutenFree && (
                      <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>Standard</span>
                    )}
                  </div>
                </td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600 }}>
                    <Icon name="star" className="text-warning" />
                    {item.rating.toFixed(2)}
                    <small style={{ color: 'var(--color-text-muted)' }}>({item.orderCount} orders)</small>
                  </span>
                </td>
                <td>
                  <button
                    className={`owner-btn owner-btn-sm ${item.inStock ? 'owner-btn-secondary' : 'owner-btn-danger'}`}
                    onClick={() => handleToggleStock(item)}
                    type="button"
                    title="Click to toggle availability on customer QR menu"
                  >
                    {item.inStock ? 'In Stock (Available)' : '86ed (Out of Stock)'}
                  </button>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                    <button
                      className="owner-btn owner-btn-sm owner-btn-secondary"
                      onClick={() => handleOpenEdit(item)}
                      type="button"
                    >
                      Edit
                    </button>
                    <button
                      className="owner-btn owner-btn-sm owner-btn-danger"
                      onClick={() => setDeleteTarget(item)}
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT DISH MODAL */}
      {isModalOpen && (
        <div className="owner-modal-backdrop" role="dialog" aria-modal="true">
          <div className="owner-modal owner-modal-lg">
            <div className="owner-modal-header">
              <h3>{editingItem ? `Edit: ${editingItem.name}` : 'Add New Culinary Dish'}</h3>
              <button
                className="owner-modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                type="button"
              >
                <Icon name="close" />
              </button>
            </div>

            <form onSubmit={handleSaveItem}>
              <div className="owner-modal-body">
                <div className="owner-form-grid">
                  <div className="owner-form-group">
                    <label htmlFor="dish-name">Dish Title *</label>
                    <input
                      id="dish-name"
                      className="owner-form-input"
                      placeholder="e.g. Wild Mushroom Risotto"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="owner-form-group">
                    <label htmlFor="dish-cat">Menu Category *</label>
                    <select
                      id="dish-cat"
                      className="owner-form-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                    >
                      <option value="Starters">Starters &amp; Antipasti</option>
                      <option value="Mains">Main Entrées &amp; Steaks</option>
                      <option value="Desserts">Dolci &amp; Desserts</option>
                      <option value="Beverages">Beverages &amp; Wine</option>
                    </select>
                  </div>

                  <div className="owner-form-group">
                    <label htmlFor="dish-price">Price ($ USD) *</label>
                    <input
                      id="dish-price"
                      type="number"
                      step="0.50"
                      className="owner-form-input"
                      placeholder="28.00"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="owner-form-group" style={{ justifyContent: 'center' }}>
                    <label style={{ marginBottom: '0.25rem' }}>Dietary Declarations</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={isVeg}
                          onChange={(e) => setIsVeg(e.target.checked)}
                        />
                        <span>Vegetarian</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={isGF}
                          onChange={(e) => setIsGF(e.target.checked)}
                        />
                        <span>Gluten-Free</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="owner-form-group">
                  <label htmlFor="dish-desc">Customer Menu Description</label>
                  <textarea
                    id="dish-desc"
                    className="owner-form-textarea"
                    placeholder="Flavor notes, preparation method, and sourcing details..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
              </div>

              <div className="owner-modal-footer">
                <button
                  type="button"
                  className="owner-btn owner-btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="owner-btn owner-btn-primary">
                  {editingItem ? 'Save Modifications' : 'Create Dish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE DISH DIALOG */}
      {deleteTarget && (
        <div className="owner-modal-backdrop" role="dialog" aria-modal="true">
          <div className="owner-modal" style={{ maxWidth: '30rem' }}>
            <div className="owner-modal-header">
              <h3>Remove Dish from Catalog</h3>
              <button
                className="owner-modal-close-btn"
                onClick={() => setDeleteTarget(null)}
                type="button"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="owner-modal-body">
              <p style={{ margin: 0, fontSize: '0.8125rem' }}>
                Are you sure you want to remove <strong>{deleteTarget.name}</strong> from the restaurant catalog?
              </p>
              <div className="owner-banner owner-banner-warning">
                <Icon name="warning" />
                <div>
                  <strong>Tip:</strong> If you only temporarily ran out of ingredients, consider toggling &ldquo;86ed&rdquo; instead of permanently deleting the dish.
                </div>
              </div>
            </div>

            <div className="owner-modal-footer">
              <button
                className="owner-btn owner-btn-secondary"
                onClick={() => setDeleteTarget(null)}
                type="button"
              >
                Keep Dish
              </button>
              <button
                className="owner-btn owner-btn-danger"
                onClick={handleDeleteItem}
                type="button"
              >
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="owner-toast" role="status">
          <Icon name="check_circle" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}


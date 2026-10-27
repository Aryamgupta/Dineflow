'use client';

import { useState } from 'react';
import { Icon } from './Icon';

const menuItems = [
  {
    name: 'Seared King Scallops',
    description: 'Crisp pancetta, pea purée, garden mint',
    price: '$24.00',
    tag: 'GF',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKXrF26b7lZpXV1wIRtpNF8STqG12K5W8tFsD8WTMLPyDssBIEsJX4XQlm-ml74fylWjhiusjgHD1S_EdYWJYVQHFRrGudj-8aues3TBmE0fV6fPCA1qH2_VhbRRMoaNbPvOl-VrhHpUxtyl9IH7m9FJYTOXIQs9jH_rEXvXPtYsnwzffQZLq-jPHw51prJYD0C8vwscpBwUbuTYG1y6nCj2OHwBPNfBSd3ER01hQkaF-GZzNJJUGv',
  },
  {
    name: 'Truffle Tagliolini',
    description: 'Umbrian summer truffle, shaved parmigiano',
    price: '$32.00',
    tag: 'Chef Pick',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRcMipfsby7-ctecx7g4WrymJTLTeakuX3qO5Vce4rvHfwcCMB297WFDSPmET37o_wAKbDkQquoKh_yu5wSJFhGPntgnqrIZy5bUQaM4G_Dijmm6zG7Yi9keLqFO9Z5qCJzAGoVCY0BM7OjHgC-JglrBIa89dqM2aOni3FRMJWcKyVc_Mi_rZxw0YzycFFPmQKP7e8_3SO7fcDIzY-Ohp0EpeaNdpAOL5x-zAnaflfOePl4Fo2PDSW',
  },
];

const categories = ['Starters', 'Mains', 'Seasonal', 'Pairings'];

export function DemoPreview() {
  const [cartCount, setCartCount] = useState(2);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  function addItem(name: string) {
    setCartCount((count) => count + 1);
    setAddedItem(name);
    window.setTimeout(() => setAddedItem(null), 1500);
  }

  return (
    <div className="preview-frame" id="demo-preview">
      <div className="preview-restaurant-bar">
        <div className="preview-restaurant-heading">
          <span aria-hidden="true" className="table-number">14</span>
          <div className="preview-restaurant-copy">
            <strong>The Copper &amp; Fig Bistro</strong>
            <span>Table 14 • Floor 1</span>
          </div>
        </div>
        <div aria-label="Connected and cart contains items" className="preview-quick-status">
          <Icon name="wifi" />
          <span className="cart-indicator"><Icon name="local_mall" /><span aria-live="polite" className="cart-badge">{cartCount}</span></span>
        </div>
      </div>

      <div className="order-progress">
        <div className="order-progress-topline">
          <span><Icon name="skillet" />Order #248 • In Kitchen</span>
          <strong>~8m remaining</strong>
        </div>
        <div aria-label="Order preparation is two thirds complete" className="progress-track" role="img">
          <span />
        </div>
      </div>

      <div aria-label="Menu categories" className="preview-categories">
        {categories.map((category, index) => (
          <span className={index === 0 ? 'preview-category active' : 'preview-category'} key={category}>{category}</span>
        ))}
      </div>

      <div className="preview-menu-items">
        {menuItems.map((item) => (
          <article className="preview-menu-item" key={item.name}>
            <div
              aria-label={item.name}
              className="preview-food-image"
              role="img"
              style={{ backgroundImage: `url("${item.image}")` }}
            >
              <span>{item.tag}</span>
            </div>
            <div className="preview-food-copy">
              <strong>{item.name}</strong>
              <span>{item.description}</span>
              <b>{item.price}</b>
            </div>
            <button aria-label={`Add ${item.name} to order`} className="add-menu-item" onClick={() => addItem(item.name)} type="button">
              <Icon name={addedItem === item.name ? 'check_circle' : 'add'} />
              <span>{addedItem === item.name ? 'Added!' : 'Add'}</span>
            </button>
          </article>
        ))}
      </div>

      <div className="preview-live-status">
        <span><Icon name="sync_alt" />KDS &amp; Floor Rail: 18 active orders synced</span>
        <strong><span />Live</strong>
      </div>
      <p aria-live="polite" className="visually-hidden">{addedItem ? `${addedItem} added to sample order. Cart has ${cartCount} items.` : ''}</p>
    </div>
  );
}

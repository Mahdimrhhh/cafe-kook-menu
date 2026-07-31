const API_URL = 'http://localhost:5000/api';

// -------------------- لاگین --------------------
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorEl = document.getElementById('loginError');
    errorEl.textContent = '';

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        errorEl.textContent = data.message || 'خطا در ورود';
        return;
      }

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUsername', data.username);
      window.location.href = 'dashboard.html';
    } catch (err) {
      errorEl.textContent = 'خطا در ارتباط با سرور';
    }
  });
}

// -------------------- توابع کمکی --------------------
function getToken() {
  return localStorage.getItem('adminToken');
}

function checkAuth() {
  if (!getToken()) {
    window.location.href = 'index.html';
  }
}

function logout() {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUsername');
  window.location.href = 'index.html';
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  };
}

// -------------------- تغییر بخش --------------------
function showSection(section, btn) {
  document.getElementById('products-section').style.display = section === 'products' ? 'block' : 'none';
  document.getElementById('categories-section').style.display = section === 'categories' ? 'block' : 'none';
  document.getElementById('reviews-section').style.display = section === 'reviews' ? 'block' : 'none';

  document.querySelectorAll('.bottom-nav button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  if (section === 'products') loadProducts();
  if (section === 'categories') loadCategories();
  if (section === 'reviews') loadReviews();
}

// -------------------- محصولات (کارت) --------------------
async function loadProducts() {
  try {
    const res = await fetch(`${API_URL}/products`);
    const products = await res.json();
    const container = document.getElementById('productsList');
    container.innerHTML = '';

    if (products.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:#888;padding:40px 0">هیچ محصولی وجود ندارد</p>';
      return;
    }

    products.forEach(p => {
      const imgSrc = p.image 
        ? `http://localhost:5000${p.image}` 
        : '';

      container.innerHTML += `
        <div class="product-card">
          ${imgSrc 
            ? `<img src="${imgSrc}" alt="${p.name}">` 
            : `<div style="width:64px;height:64px;background:#eee;border-radius:10px;flex-shrink:0"></div>`
          }
          <div class="info">
            <h3>${p.name}</h3>
            <div class="price">${Number(p.price).toLocaleString()} تومان</div>
            <div class="meta">
              ${p.available ? 'موجود' : 'ناموجود'}
              ${p.featured ? ' · ⭐ پیشنهاد روز' : ''}
            </div>
          </div>
          <div class="actions">
            <button class="btn-secondary" onclick="editProduct('${p.id}')">ویرایش</button>
            <button class="btn-danger" onclick="deleteProduct('${p.id}')">حذف</button>
          </div>
        </div>
      `;
    });
  } catch (err) {
    console.error(err);
    alert('خطا در بارگذاری محصولات');
  }
}

// -------------------- دسته‌ها --------------------
async function loadCategories() {
  try {
    const res = await fetch(`${API_URL}/categories`);
    const categories = await res.json();
    const container = document.getElementById('categoriesList');
    container.innerHTML = '';

    if (categories.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:#888;padding:40px 0">هیچ دسته‌ای وجود ندارد</p>';
      return;
    }

    categories.forEach(c => {
      container.innerHTML += `
        <div class="product-card">
          <div style="width:48px;height:48px;background:#f0f0f0;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">
            ${c.icon || '📂'}
          </div>
          <div class="info">
            <h3>${c.name}</h3>
            <div class="meta">ترتیب: ${c.order || 0}</div>
          </div>
          <div class="actions">
            <button class="btn-danger" onclick="deleteCategory('${c.id}')">حذف</button>
          </div>
        </div>
      `;
    });
  } catch (err) {
    console.error(err);
  }
}

async function deleteCategory(id) {
  if (!confirm('این دسته حذف شود؟')) return;
  await fetch(`${API_URL}/categories/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  loadCategories();
}

function openCategoryModal() {
  const name = prompt('نام دسته‌بندی را وارد کنید:');
  if (!name) return;

  fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ name, icon: '☕', order: 0 })
  }).then(() => loadCategories());
}

// -------------------- مودال محصول --------------------
async function loadCategoriesIntoSelect() {
  try {
    const res = await fetch(`${API_URL}/categories`);
    const categories = await res.json();
    const select = document.getElementById('productCategory');
    if (!select) return;

    select.innerHTML = '<option value="">-- انتخاب دسته --</option>';
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.id;
      option.textContent = cat.name;
      select.appendChild(option);
    });
  } catch (err) {
    console.error(err);
  }
}

async function openProductModal(product = null) {
  document.getElementById('productModal').classList.add('active');
  document.getElementById('modalTitle').textContent = product ? 'ویرایش محصول' : 'افزودن محصول';

  await loadCategoriesIntoSelect();

  document.getElementById('productId').value = product ? product.id : '';
  document.getElementById('productName').value = product ? product.name : '';
  document.getElementById('productDescription').value = product ? (product.description || '') : '';
  document.getElementById('productPrice').value = product ? product.price : '';
  document.getElementById('productAvailable').checked = product ? product.available !== false : true;
  document.getElementById('productFeatured').checked = product ? !!product.featured : false;
  document.getElementById('productCategory').value = product && product.categoryId ? product.categoryId : '';

  document.getElementById('imagePreview').innerHTML = product && product.image
    ? `<img src="http://localhost:5000${product.image}" style="max-width:100px;border-radius:8px;margin-top:8px">`
    : '';
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
  document.getElementById('productForm').reset();
  document.getElementById('imagePreview').innerHTML = '';
}

async function editProduct(id) {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    const product = await res.json();
    openProductModal(product);
  } catch (err) {
    alert('خطا در دریافت محصول');
  }
}

async function deleteProduct(id) {
  if (!confirm('این محصول حذف شود؟')) return;

  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    if (res.ok) loadProducts();
    else alert('خطا در حذف');
  } catch (err) {
    alert('خطا در ارتباط با سرور');
  }
}

// فرم ذخیره محصول
const productForm = document.getElementById('productForm');
if (productForm) {
  productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const price = document.getElementById('productPrice').value;
    const available = document.getElementById('productAvailable').checked;
    const featured = document.getElementById('productFeatured').checked;
    const categoryId = document.getElementById('productCategory').value || null;
    const imageFile = document.getElementById('productImage').files[0];

    let imageUrl = '';

    // آپلود عکس
    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);

      try {
        const uploadRes = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${getToken()}` },
          body: formData
        });
        const uploadData = await uploadRes.json();
        if (uploadRes.ok) imageUrl = uploadData.imageUrl;
      } catch (err) {
        alert('خطا در آپلود عکس');
        return;
      }
    }

    const productData = {
      name,
      description,
      price: Number(price),
      available,
      featured,
      categoryId
    };

    if (imageUrl) productData.image = imageUrl;

    try {
      // اگر ویرایش است و عکس جدید نداده، عکس قبلی را نگه دار
      if (id && !imageUrl) {
        const oldRes = await fetch(`${API_URL}/products/${id}`);
        const oldProduct = await oldRes.json();
        productData.image = oldProduct.image || '';
      }

      const url = id ? `${API_URL}/products/${id}` : `${API_URL}/products`;
      const method = id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(productData)
      });

      if (res.ok) {
        closeProductModal();
        loadProducts();
      } else {
        const err = await res.json();
        alert(err.message || 'خطا در ذخیره');
      }
    } catch (err) {
      alert('خطا در ارتباط با سرور');
    }
  });
}

// -------------------- مدیریت نظرات --------------------
async function loadReviews() {
  try {
    const res = await fetch(`${API_URL}/reviews`, {
      headers: authHeaders()
    });
    const reviews = await res.json();
    const container = document.getElementById('reviewsList');
    container.innerHTML = '';

    if (!reviews.length) {
      container.innerHTML = '<p style="text-align:center;color:#888;padding:40px 0">هیچ نظری وجود ندارد</p>';
      return;
    }

    // جدیدترین‌ها اول
    reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    reviews.forEach(r => {
      const statusText = {
        pending: 'در انتظار تایید',
        approved: 'تایید شده',
        rejected: 'رد شده'
      }[r.status] || r.status;

      const statusColor = {
        pending: '#f39c12',
        approved: '#27ae60',
        rejected: '#e74c3c'
      }[r.status] || '#888';

      container.innerHTML += `
        <div class="product-card" style="flex-direction:column;align-items:stretch;gap:10px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong>${r.name || 'کاربر'}</strong>
            <span style="font-size:12px;color:${statusColor};font-weight:600">${statusText}</span>
          </div>
          <div style="font-size:13px;color:#555">${r.text}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#888">
            <span>${'⭐'.repeat(r.rating || 0)}</span>
            <span>${r.phone || ''}</span>
          </div>
          <div class="actions" style="flex-direction:row;gap:8px;margin-top:6px">
            ${r.status !== 'approved' ? `<button class="btn-success" onclick="setReviewStatus('${r.id}','approved')">تایید</button>` : ''}
            ${r.status !== 'rejected' ? `<button class="btn-secondary" onclick="setReviewStatus('${r.id}','rejected')">رد</button>` : ''}
            <button class="btn-danger" onclick="deleteReview('${r.id}')">حذف</button>
          </div>
        </div>
      `;
    });
  } catch (err) {
    console.error(err);
    alert('خطا در بارگذاری نظرات');
  }
}

async function setReviewStatus(id, status) {
  try {
    const res = await fetch(`${API_URL}/reviews/${id}/status`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ status })
    });

    if (res.ok) {
      loadReviews();
    } else {
      alert('خطا در تغییر وضعیت');
    }
  } catch (err) {
    alert('خطا در ارتباط با سرور');
  }
}

async function deleteReview(id) {
  if (!confirm('این نظر حذف شود؟')) return;

  try {
    const res = await fetch(`${API_URL}/reviews/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    if (res.ok) loadReviews();
    else alert('خطا در حذف');
  } catch (err) {
    alert('خطا در ارتباط با سرور');
  }
}

// -------------------- شروع --------------------
if (window.location.pathname.includes('dashboard.html')) {
  checkAuth();
  loadProducts();
}
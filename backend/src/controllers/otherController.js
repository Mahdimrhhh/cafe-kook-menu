const { db, uuidv4 } = require('../database/db');

async function getKnowledge(req, res) {
  try {
    await db.read();
    res.json(db.data.knowledge || []);
  } catch (error) {
    res.status(500).json({ message: 'خطا' });
  }
}

async function createKnowledge(req, res) {
  try {
    const { title, shortDescription, fullDescription, image, category, icon, fact } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'عنوان مقاله الزامی است' });
    }

    await db.read();
    const article = {
      id: uuidv4(),
      title,
      shortDescription: shortDescription || '',
      fullDescription: fullDescription || '',
      image: image || '',
      category: category || '',
      icon: icon || 'default',
      fact: fact || '',
      createdAt: new Date().toISOString()
    };

    db.data.knowledge.push(article);
    await db.write();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: 'خطا در ساخت مقاله' });
  }
}

async function updateKnowledge(req, res) {
  try {
    await db.read();
    const idx = db.data.knowledge.findIndex(k => k.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ message: 'مقاله پیدا نشد' });
    }

    db.data.knowledge[idx] = {
      ...db.data.knowledge[idx],
      ...req.body,
      id: req.params.id
    };
    await db.write();
    res.json(db.data.knowledge[idx]);
  } catch (error) {
    res.status(500).json({ message: 'خطا در ویرایش مقاله' });
  }
}

async function deleteKnowledge(req, res) {
  try {
    await db.read();
    const idx = db.data.knowledge.findIndex(k => k.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ message: 'مقاله پیدا نشد' });
    }
    db.data.knowledge.splice(idx, 1);
    await db.write();
    res.json({ message: 'مقاله حذف شد' });
  } catch (error) {
    res.status(500).json({ message: 'خطا در حذف مقاله' });
  }
}

module.exports = { getKnowledge, createKnowledge, updateKnowledge, deleteKnowledge };
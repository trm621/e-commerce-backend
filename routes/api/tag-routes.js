const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: ProductTag,
        attributes: ['product_id'],
        include: 
        {
          model: Product,
          attributes: ['product_name']
        } 
      } 
    ]
  })
  .then(dbProductData => res.json(dbProductData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: ProductTag,
        attributes: ['product_id'],
        include: {
          model: Product, 
          attributes: ['product_name']
        }
      }
    ]
  })
  .then(dbProductData => {
    if (!dbProductData) {
      res.status(404).json({message: 'No tags with this id.'});
      return;
    }
    res.json(dbProductData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbProductData => res.json(dbProductData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    individualHooks: true,
    where: { id: req.params.id}
  })
  .then(dbProductData => {
    if (!dbProductData[0]) {
      res.status(404)({message: 'No tag with this id.'});
      return;
    }
    res.json(dbProductData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: { id: req.params.id}
  })
  .then(dbProductData => {
    if (!dbProductData) {
      res.status(404).json({message: 'No tag with this id.'});
      return;
    }
    res.json(dbProductData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // delete on tag by its `id` value
});

module.exports = router;

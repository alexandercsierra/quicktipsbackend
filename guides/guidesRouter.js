const router = require('express').Router();
const Guides = require('./guidesModel')


router.get('/', (req, res)=>{
    Guides.getAll()
        .then(guides=>res.status(200).json(guides))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'server error'})
        })
})

router.post('/', (req, res)=>{
    console.log(req.body)
    Guides.add(req.body)
        .then(guide=>res.status(201).json(guide))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'server error'})
        })
})

router.put('/:id', (req, res)=>{
    Guides.update(req.params.id, req.body)
        .then(guide=>res.status(200).json(guide))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'server error'})
        })
})

router.delete('/:id', (req, res)=>{
    Guides.remove(req.params.id)
        .then(guide=>res.status(200).json(guide))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'server error'})
        })
})

module.exports=router;
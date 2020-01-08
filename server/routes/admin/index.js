
module.exports = app=>{
    const express = require('express')
    const router = express.Router({
        mergeParams:true
    })
    router.post('/',async (req,res)=>{
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    router.put('/:id',async (req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    router.get('/',async (req,res)=>{
        let options = {}
        if(req.Model.modelName==='Category'){
            options.populate = 'parent'
        }
        const model = await req.Model.find().setOptions(options).limit(10)
        res.send(model)
    })
    router.get('/:id',async (req,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    router.delete('/:id',async (req,res)=>{
        await req.Model.findByIdAndRemove(req.params.id)
        res.send({
            success:true
        })
    })
    app.use('/admin/api/rest/:resource',async (req,res,next) =>{
        const ModelName = require('inflection').classify(req.params.resource);
        req.Model = require(`../../models/${ModelName}`)
        next()
    },router)

    const multer = require('multer')
    const upload = multer({dest:__dirname + '/../../uploads'})
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}

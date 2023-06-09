const express=require('express')
const router=express.Router()
const cors=require('cors')
const mongoose=require('mongoose')
const PODCASTS=mongoose.model('PODCASTS')
const VerifyLogin = require('../middlewares/VerifyLogin')
router.use(cors())
router.get('/podcasts',VerifyLogin,(req,res)=>{
    PODCASTS.find()
    .sort({_id:-1})
    .then(data=>
        {
            return res.status(200).json(data)
        })
        .catch(err=>console.log(err))
})



router.post('/createpodcasts',VerifyLogin,(req,res)=>{
const{title,description,category,type,speaker,audioFile,videoFile}=req.body
if(!title || !description || !category || !type || !speaker){
    return res.status(422).json({error:'Insufficient data'})
}
if(!audioFile && !videoFile){
    return res.status(422).json({error:"No file attached"})
}
if(audioFile && !videoFile){
    const podcasts=new PODCASTS({
        title,
        description,
        category,
        type,
        speaker,
        audioFile
    })
    podcasts.save().then(data=>{
        return res.status(200).json({message:"Podcast added successfully"})
    })
    .catch(err=>console.log(err))
}
if(!audioFile && videoFile){
    const podcasts=new PODCASTS({
        title,
        description,
        category,
        type,
        speaker,
        videoFile
    })
    podcasts.save().then(data=>{
        return res.status(200).json({message:"Podcast added successfully"})
    })
    .catch(err=>console.log(err))
}
})

router.put('/like',VerifyLogin,(req,res)=>{
    PODCASTS.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).then((result)=>{
        return res.json(result)
    })
    .catch(err=>{return res.json(err)})
})


router.put('/unlike',VerifyLogin,(req,res)=>{
    PODCASTS.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).then((result)=>{
            return res.json(result)
        })
        .catch(err=>{return res.json(err)})
    })

router.get('/podcasts/:podcastId',VerifyLogin,(req,res)=>{
   PODCASTS.findById({_id:req.params.podcastId})
   .then(result=>{
    return res.status(200).json(result)
   })
   .catch(err=>{
    return res.status(404).json({error:'Podcast not found'})
   })
})
router.get('/likedpodcasts',VerifyLogin,(req,res)=>{
    PODCASTS.find({likes:{$in:req.user._id}})
    .sort({_id:-1})
    .then(result=>{
        return res.json(result)
    })
    .catch(err=>console.log(err))
})
module.exports=router
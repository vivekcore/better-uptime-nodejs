import express from "express"
import cors from "cors"
import {db} from "@repo/db"
const app = express()
app.use(express.json())
app.use(cors());

app.post("/website", async(req,res) => {
    const url = req.body.url;
    if(!url || url !== typeof String){
        return res.json({
            msessage:"Url is required"
        })
    }
    const website = await db.orm.public.Website.create({
        url
    })
    if(!website){
        return res.json({
            message:"Something went wrong"
        })
    }
    return res.status(200).json({
        data: website
    })
})
app.get("/website:id", async(req,res) => {
    const id = req.params.id
    if(!id || id !== typeof String){
        return res.json({
            msessage:"Id is required"
        })
    }
    const website = db.orm.public.Website.where({id});
    if(!website){
        return res.json({
            message: "Website isn't added"
        })
    }
    return res.status(200).json({
        message: website
    })
})

app.listen(3000,() => {
    console.log("Listning at 3000...")
})
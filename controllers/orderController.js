//post orders controller
module.exports = async(req,res)=>{
    try{
        res.json(true)
    }
    catch(err){
        console.error(err.message)
        res.status(500).send('server Error')
    }
}
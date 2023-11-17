const express = require("express")
const verificarToken = require("../middleware/jwt_verify")
const router = express.Router();

router.post("/api/cliente/add", verificarToken, (req, res)=> {
    //es.status(201).send({output:"DAdos enviados", payload: req.body})

    bcrypt.hash(req.body.senha, config.bcrypt_salt, (err, crypto)=> {
        if(err){
            return res.status(500).send({output: "Erro ao processar o cadastro"})
        }

        req.body.senha = crypto
    
        const dados = new Cliente(req.body)
        dados.save().then((result)=>{
            res.status(201).send({output: "Insert ok", payload: result})
        }).catch((error)=> res.status(400).send({output: "Não foi possível cadastrar", err: error}))
    })
})

router.put("api/cliente/update/:id", verificarToken, (req, res)=> {
    //res.status(200).send({output:"Atualizado", codigo:req.params.id, payload: req.body})
    Cliente.findByIdAndUpdate(req.params.id, req.body, {new:true}).then((result)=> {
        if(!result){
            res.status(400).send({output: "Não foi possivel localizar"})
        }
        res.status(200).send({output: "Atualziado", payload: result})
    }).catch((error)=> res.status(500).send({output: "Erro ao atualizar", err: error}))
})

router.delete("api/cliente/delete/:id", (req, res)=> {
    //res.status(204)
    Cliente.findByIdAndDelete(req.params.id).then((result)=> {
        res.status(204).send({output: "Apagado"})
    }).catch((error)=> res.status(500).send({output: "Erro ao excluir", err: error}))
})
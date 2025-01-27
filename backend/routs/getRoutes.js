
const router = express.Router()


router.get('/sing_in', (req, res) => {
    //res.sendFile(path.join(__dirname + 'paginadecadastro.html')) for example
})


router.get('/', (req, res) => {
    res.send("Hello world")
    
})

module.exports = router
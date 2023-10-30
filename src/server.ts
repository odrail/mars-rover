import app from './app'
const port = parseInt(process.env.PORT || "3000")

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

export default app
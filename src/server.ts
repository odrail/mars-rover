import app from './app'
const port = parseInt(process.env.PORT || "3000")

app.listen(port, () => {
    console.log(`Rover listening on port ${port}`)
})

export default app
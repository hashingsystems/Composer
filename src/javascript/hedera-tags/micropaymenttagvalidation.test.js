import micropaymenttag from './micropaymenttagvalidation'

import express from 'express'
import path from 'path'
import fs from 'fs'
import supertest from 'supertest'

// using express to render our html for tests
const app = express()
const port = 9999
const htmlFileDirectory = path.join(__dirname, 'testdata')
let routes = []

let server
let request

beforeEach(done => {
    const files = fs.readdirSync(htmlFileDirectory)
    files.forEach(file => {
        const pathName = file.substring(0, file.length - 5)
        routes.push(pathName)
    })
    const handler = htmlFilePath => {
        const routeHandler = (req, res) => {
            res.sendFile(htmlFilePath)
        }
        return routeHandler
    }
    for (let i = 0; i < routes.length; i++) {
        app.get(routes[i], handler(files[i]))
    }
    server = app.listen(port, done)
    request = supertest.agent(server)
})

afterEach(done => {
    server.close(done)
})

test('Verify that we can reach all the routes defined for our test express app', () => {
    routes.forEach(route => {
        request.get(route).expect(200)
    })
})

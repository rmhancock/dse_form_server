const request = require('supertest')
const app = require('../router.js')
describe('Get test', () => {
    it('should get response', async () => {
        const res = await request(app)
            .get('/test')
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('OK')
        done()
    })
})
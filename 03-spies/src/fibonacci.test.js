const sinon = require('sinon')
const assert = require('node:assert')
const Fibonacci = require('./fibonacci')

// Fibonacci: O príximo valor é correspondente a soma do dois valores anteriores
    ; (async () => {
        {
            const fibo = new Fibonacci()
            const spy = sinon.spy(fibo, fibo.execute.name)
            // generators retornam um iterator, (.next)
            // Existem 3 formas de ler os dados
            // 1 - usando funcao.next
            // 2 - for await 
            // 3 rest/spread

            for await (const i of fibo.execute(3)) {}
            

            const expectedExecute = 4

            assert.deepStrictEqual(spy.callCount,expectedExecute)
        }
        {
            const fibo = new Fibonacci()
            const spy = sinon.spy(fibo, fibo.execute.name)
            const [...result] = fibo.execute(5)

            // [0] input = 5, current = 0, next = 1
            // [1] input = 4, current = 1, next = 1
            // [2] input = 3, current = 1, next = 2
            // [3] input = 2, current = 2, next = 3
            // [4] input = 1, current = 3, next = 5
            // [5] input = 0, PARA

            const { args } = spy.getCall(2)

            const expectedResults = [0, 1, 1, 2, 3]
            const expectedParams = Object.values({
                input: 3,
                current: 1,
                next: 2
            })
             
            assert.deepStrictEqual(args, expectedParams)
            assert.deepStrictEqual(result, expectedResults)
        }
    })()
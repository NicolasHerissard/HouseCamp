'use client'

import { AIConfig } from "@/lib/ia"

export default function Assistant() {

    async function testAI() {
        const res = await AIConfig.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt: "Salut, comment vas tu?",
            max_tokens: 10,
        })

        console.log(res.choices[0].text)
    }

    return (
        <div>
            <h1>Assistant</h1>

            <button onClick={testAI}>Test</button>
        </div>
    )
}
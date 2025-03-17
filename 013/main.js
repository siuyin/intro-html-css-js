import { serveDir } from "@std/http/file-server"
import { EnvString } from "dflt"
function main() {
    function mainHandler(req) {
        const path = new URL(req.url).pathname;

        if (path === "/md") {
            return mdHandler(req)
        }

        return serveDir(req, {
            fsRoot: "html",
            urlRoot: "",
        });
    }
    const port = EnvString("PORT", "8080")
    console.log(`Starting streaming markdown endpoint /md on port: ${port}.`)
    Deno.serve({ port: port }, mainHandler)
}
main()


function mdHandler(req) {

    const txt = `# This is markdown on \`Deno\`
The quick brown fox jumps over the lazy dog.  
The rain in spain falls mainly on the plain.  
A stitch in time saves nine.  
The cat sat on the mat.

Next we have an ordered list:
1. a
1. b
1. c

## Next header
And a bullet list:
* apples
* bananas
* cranberries
`
    const hdrs = new Headers()
    hdrs.set("Transfer-Encoding", "chunked")
    hdrs.set("Access-Control-Allow-Origin", "*")

    const res = new Response(mdStream(txt), { headers: hdrs })
    return res
}

import { delay } from "./delay.js"
function mdStream(txt) {
    const p = txt.split(" ")
    const en = new TextEncoder()
    let n = 0

    return new ReadableStream({
        async pull(ctrl) {
            const wd = p[n] + " "
            if (n == p.length) { ctrl.close(); return }

            ctrl.enqueue(en.encode(wd))
            await delay(150)
            n++
        }
    })
}
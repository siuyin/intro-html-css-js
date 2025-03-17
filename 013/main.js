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
    const hdrs = new Headers()
    hdrs.set("Transfer-Encoding", "chunked")
    hdrs.set("Access-Control-Allow-Origin", "*")

    const res = new Response("markdown here", {headers:hdrs})
    return res
}
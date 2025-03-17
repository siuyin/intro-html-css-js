import { serveDir } from "jsr:@std/http/file-server"

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
    Deno.serve({ port: 8080 }, mainHandler)
}
main()


function mdHandler(req) {
    const hdrs = new Headers()
    hdrs.set("Transfer-Encoding", "chunked")
    hdrs.set("Access-Control-Allow-Origin", "*")
    return new Response("markdown here", { headers: hdrs })
}
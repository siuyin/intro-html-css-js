console.log("defining markdown handler")
async function mdHandler() {
    const res = await fetch("http://localhost:8080/md")
    const txt = new TextDecoder()
    const mdSect=document.querySelector("section#md")
    let md = ""
    mdSect.append(document.createElement("pre"))
    const pre = document.querySelector("section pre")
    for await (const chunk of res.body) {
        const dtxt = txt.decode(chunk)
        pre.append(txt.decode(chunk))
        md += txt.decode(chunk)
    }
    mdSect.innerHTML = marked.parse(md)
}

console.log("markdown handler starting")
await mdHandler()
console.log("markdown handler done")
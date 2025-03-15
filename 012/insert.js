export async function insTemplate(filename, id) {
    const f = await fetch(filename)
    const t = await f.text()
    const host = document.getElementById(id)
    const d = document.createElement("div")
    d.innerHTML = t
    const tpl = d.querySelector("template")
    host.append(tpl)
}
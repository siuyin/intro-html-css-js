let cart = {
    n: 0,
    items: []
}

function shoppingCartHandler() {
    const sc = document.querySelector("section#cart p")
    window.addEventListener("cartupdated", () => {
        if (cart.n == 0) {
            sc.textContent = "Shopping Cart: empty"
            return
        }
        const items = []
        cart.items.forEach((item) => {
            items.push(item.name)
        })
        sc.textContent = `Shopping Cart: ${cart.n} item | ${items}`
    })
    window.dispatchEvent(new Event("cartupdated"))
}
shoppingCartHandler()

function createLink(lnk, txt) {
    const a = document.createElement("a")
    a.setAttribute("href", lnk)
    a.textContent = txt
    return a
}

function buildCatalogWith(items) {
    const ct = document.querySelector("section#catalog")
    items.forEach((item) => {
        const p = document.createElement("p")

        const add = createLink("", "add")
        add.addEventListener("click", (ev) => {
            ev.preventDefault()
            cart.n++
            cart.items.push(item)
            window.dispatchEvent(new Event("cartupdated"))
        })

        const rem = createLink("", "remove")
        rem.addEventListener("click", (ev) => {
            ev.preventDefault()
            let n = cart.items.findIndex((x) => x.id == item.id)
            if (n < 0) {
                return
            }
            cart.n--
            cart.items.splice(n, 1)
            window.dispatchEvent(new Event("cartupdated"))
        })

        p.append(item.name, " | ", add, " | ", rem)
        ct.append(p)
    })
}

async function buildCatalog() {
    const dat = await fetch("/catalog.json")
    const items = await dat.json()
    buildCatalogWith(items)
}
await buildCatalog()
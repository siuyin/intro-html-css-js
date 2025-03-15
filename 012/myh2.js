import { insTemplate } from "./insert.js"
await insTemplate("myh2.html","tpl")

customElements.define("my-h2",
    class extends HTMLElement {
        constructor() {
            super()
            const tpl = document.getElementById("myh2")
            const shadowRoot = this.attachShadow({ mode: "open" })
            const n = tpl.content.cloneNode(true)
            shadowRoot.append(n)
            this.style.display="block"
        }
    }
)
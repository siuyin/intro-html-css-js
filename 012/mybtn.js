import { insTemplate } from "./insert.js"
await insTemplate("mybtn.html","tpl")

customElements.define("my-btn",
    class extends HTMLElement {
        constructor() {
            super()
            const tpl = document.getElementById("mybtn")
            const shadowRoot = this.attachShadow({ mode: "open" })
            const n = tpl.content.cloneNode(true)
            shadowRoot.append(n)
            this.style.display="block"
        }
    }
)

function myBtnHandler() {
    const b = document.querySelector("my-btn")
    const btn = b.shadowRoot.querySelector("button")
    btn.addEventListener("click", () => console.log("MyBtn clicked"))
}
myBtnHandler()

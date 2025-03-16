        console.log("defining lorem handler")
        async function loremHandler() {
            const res = await fetch("http://localhost:8080/lorem")
            const txt = new TextDecoder()
            for await (const chunk of res.body) {
                document.body.append(txt.decode(chunk))
            }
        }

        console.log("lorem handler starting")
        await loremHandler()
        console.log("lorem handler done")

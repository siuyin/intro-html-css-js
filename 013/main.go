package main

import (
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/siuyin/dflt"
)

const txt = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus, felis nec vestibulum scelerisque, lectus justo gravida sem, quis gravida dolor mi at quam. Duis libero neque, venenatis id quam suscipit, facilisis ultrices purus. Suspendisse lacus nisl, commodo at fringilla et, gravida ut ante. Mauris vehicula, nibh at luctus suscipit, nulla nisi tempus nibh, quis pulvinar lacus magna porta dolor. Duis mattis eu dui sodales feugiat. Maecenas scelerisque condimentum urna, vitae venenatis tortor imperdiet nec. Praesent euismod, mi vestibulum lacinia maximus, massa mi elementum augue, ut pretium massa diam ornare purus. In hac habitasse platea dictumst.`

func main() {
	http.Handle("/", http.FileServer(http.Dir("./html")))
	http.HandleFunc("/lorem", loremStreamHandler)

	port := dflt.EnvString("PORT", "8080")
	log.Printf("Starting streaming endpoint /lorem on port %s.\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func loremStreamHandler(w http.ResponseWriter, r *http.Request) {
	p := strings.Split(txt, " ")
	w.Header().Set("Transfer-Encoding", "chunked")
	f, _ := w.(http.Flusher)
	for _, wd := range p {
		io.WriteString(w, wd+" ")
		time.Sleep(100 * time.Millisecond)
		f.Flush()
	}
}

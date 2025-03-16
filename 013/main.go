package main

import (
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/siuyin/dflt"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("./html")))
	http.HandleFunc("/md", mdHandler)

	port := dflt.EnvString("PORT", "8080")
	log.Printf("Starting streaming markdown endpoint /md on port %s.\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func mdHandler(w http.ResponseWriter, r *http.Request) {
	txt := `# This is markdown
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
	p := strings.Split(txt, " ")
	w.Header().Set("Transfer-Encoding", "chunked")
	f, _ := w.(http.Flusher)
	for _, wd := range p {
		io.WriteString(w, wd+" ")
		time.Sleep(150 * time.Millisecond)
		f.Flush()
	}
}

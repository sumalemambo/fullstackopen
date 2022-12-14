# 0.4: New note diagram
```mermaid
sequenceDiagram
Note over Browser: User writes note and press submit
Note over Browser: Send note text
Browser->>Server: HTTP POST [note_text] https://studies.cs.helsinki.fi/exampleapp/new_note
Server-->>Browser: HTTP 302
Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
Server-->>Browser: HTML-code
Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
Server-->Browser: main.css
Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
Server-->Browser: main.js
Note over Browser: Browser starts executing js-code <br/> that requests JSON data from server
Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
Server-->Browser:  [{ content: "tst", date: "2022-12-13T14:04:40.888Z" },...]
Note over Browser: Browser executes the event handler <br/> that renders notes on display
```
# 0.5: Single page app diagram
```mermaid
sequenceDiagram
Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
Server-->>Browser: HTML-code
Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
Server-->Browser: main.css
Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
Server-->Browser: spa.js
Note over Browser: Browser starts executing js-code <br/> that requests JSON data from server
Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
Server-->Browser:  [{ content: "tst", date: "2022-12-13T14:04:40.888Z" },...]
Note over Browser: Browser executes the event handler <br/> that renders notes on display
```
# 0.6: New note in Single page app diagram
```mermaid
sequenceDiagram
Note over Browser: User writes note and press submit
Note over Browser: Send note text
Browser->>Server: HTTP POST [note_text] https://studies.cs.helsinki.fi/exampleapp/new_note_spa
Server-->>Browser: HTTP 201
Note over Browser: Browser executes js-code <br/> to redraw notes
```

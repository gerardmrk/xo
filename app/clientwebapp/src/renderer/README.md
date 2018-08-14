# Renderer component

## Reasons

1.  You're not gonna directly expose a Node.js server on the internet, for performance and security reasons. There should always be a proxy sitting in front of it, whether it be an Envoy sidecar or NginX reverse-proxy or even a [Go HTTP server](https://blog.cloudflare.com/exposing-go-on-the-internet/).

2.  Since we've established that the Node.js server is never directly interfacing with the web, we're able to use UDS, which is more efficient for local IPC than HTTP. NginX supports upstream UDS connections, so does Envoy.

3.  Protobufs - jesus where do I start. Okay I'll get back to this it's 9.30, and I haven't had dinner. I'm not saying it's 100% necessary or essential, and if I can't get this up within the week,I'll YAGNI this and resort to JSON. This is not boiling the ocean or nor is it micro-optimization (and Knuth quotes ad nauseum). I'll come back with the reasons tomorrow. In case I forget -- TTFB, TTLB, caching downstream (you're not gonna freaking dump a rendered React string into memory indefinitely).

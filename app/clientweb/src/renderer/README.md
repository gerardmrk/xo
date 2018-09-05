# Renderer component

## Reasons

1.  You're not gonna directly expose a Node.js server on the internet, for performance and security reasons. There should always be a proxy sitting in front of it, whether it be an Envoy sidecar or NginX reverse-proxy or even a [Go HTTP server](https://blog.cloudflare.com/exposing-go-on-the-internet/).

2.  Since we've established that the Node.js server is never directly interfacing with the web, we're able to use UDS, which is more efficient for local IPC than HTTP. NginX supports upstream UDS connections, so does Envoy.

3.  Protobufs - see this https://60devs.com/performance-of-inter-process-communications-in-nodejs.html

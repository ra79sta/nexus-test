import { IncomingMessage, ServerResponse } from "http"

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const targetUrl = `https://rateengine.ship.cars${req.url}`

  const sanitizedHeaders: Record<string, string> = {}
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === "string") {
      sanitizedHeaders[key] = value
    }
  }

  delete sanitizedHeaders.host

  let body = ""
  if (req.method !== "GET" && req.method !== "HEAD") {
    req.on("data", (chunk) => {
      body += chunk
    })

    req.on("end", async () => {
      try {
        const response = await fetch(targetUrl, {
          method: req.method,
          headers: sanitizedHeaders,
          body: body ? body : undefined, // Ako postoji telo, prosleđujemo ga
        })

        const data = await response.text()
        res.statusCode = response.status
        res.end(data)
      } catch (error) {
        res.statusCode = 500
        res.end(
          JSON.stringify({
            error: "Error connecting to API",
            details: (error as Error).message,
          }),
        )
      }
    })
  } else {
    try {
      const response = await fetch(targetUrl, {
        method: req.method,
        headers: sanitizedHeaders,
      })

      const data = await response.text()
      res.statusCode = response.status
      res.end(data)
    } catch (error) {
      res.statusCode = 500
      res.end(
        JSON.stringify({
          error: "Error connecting to API",
          details: (error as Error).message,
        }),
      )
    }
  }
}

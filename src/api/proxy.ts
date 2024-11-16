import type { VercelRequest } from "@vercel/node"
import type { VercelResponse } from "@vercel/node"

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    req.on("data", (chunk: Buffer) => {
      body += chunk.toString()
    })

    req.on("end", async () => {
      try {
        const response = await fetch(targetUrl, {
          method: req.method,
          headers: sanitizedHeaders,
          body: body ? body : undefined,
        })

        const data = await response.text()
        res.status(response.status).send(data)
      } catch (error) {
        res.status(500).send(
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
      res.status(response.status).send(data)
    } catch (error) {
      res.status(500).send(
        JSON.stringify({
          error: "Error connecting to API",
          details: (error as Error).message,
        }),
      )
    }
  }
}

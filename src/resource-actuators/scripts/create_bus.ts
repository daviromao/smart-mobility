/* import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

import { join } from "path";

const prisma = new PrismaClient();

const baseUrl = "http://10.10.10.1:3000";

async function main() {
  const rawdata = fs.readFileSync(join(__dirname, "./bus.json"), "utf8");
  const resources = JSON.parse(rawdata);

  for (const resource of resources) {
    const response = await fetch("http://10.10.10.104:8000/adaptor/resources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: resource }),
    });

    const data = (await response.json()).data;

    const subscription = await fetch(
      "http://10.10.10.104:8000/adaptor/subscriptions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription: {
            uuid: data.uuid,
            capabilities: data.capabilities,
            url: `${baseUrl}/resource-webhook/${data.uuid}`,
          },
        }),
      }
    );

    console.log(
      await prisma.bus.create({
        data: {
          created_at: data.created_at,
          updated_at: data.updated_at,
          description: data.description,
          id: data.id,
          lat: data.lat,
          lon: data.lon,
          status: data.status,
          uuid: data.uuid,
          air_activated: false,
          capabilities: data.capabilities,
          city: data.city,
          collect_interval: data.collect_interval,
          country: data.country,
          neighborhood: data.neighborhood,
          postal_code: data.postal_code,
          state: data.state,
          uri: data.uri,
        },
      })
    );
  }
}

main(); */

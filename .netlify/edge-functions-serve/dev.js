import { boot } from "https://v2-5-1--edge.netlify.com/bootstrap/index-combined.ts";

const functions = {}; const metadata = { functions: {} };


      try {
        const { default: func } = await import("file:///Users/husseindowi/Dev/ChromoLiteBitee/.netlify/edge-functions/next-dev/index.js");

        if (typeof func === "function") {
          functions["next-dev"] = func;
          metadata.functions["next-dev"] = {"url":"file:///Users/husseindowi/Dev/ChromoLiteBitee/.netlify/edge-functions/next-dev/index.js"}
        } else {
          console.log("\u001b[91m◈\u001b[39m \u001b[31mFailed\u001b[39m to load Edge Function \u001b[33mnext-dev\u001b[39m. The file does not seem to have a function as the default export.");
        }
      } catch (error) {
        console.log("\u001b[91m◈\u001b[39m \u001b[31mFailed\u001b[39m to run Edge Function \u001b[33mnext-dev\u001b[39m:");
        console.error(error);
      }
      

boot(functions, metadata);
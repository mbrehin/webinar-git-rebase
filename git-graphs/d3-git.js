/*!
 * Build Git graph/logs with D3.js
 * Inspired from "Interactive D3.js tree diagram":
 *  - http://jsfiddle.net/Lm4Qx/
 *  - http://bl.ocks.org/d3noob/8375092
 */

import { GitGraph } from "./d3-git/git-graph";

export function initializeD3GitGraph({
  containerId = mandatory("containerId is missing"),
  data: { legend, comments, branches, steps, headless },
  width = 1024,
  height = 500,
  viewBox,
}) {
  // Skip drawing if already loaded
  if (document.querySelector(`#${containerId} svg`)) {
    return;
  }

  const graph = new GitGraph({
    containerId,
    width,
    height,
    viewBox,
    legend,
    comments,
    branches,
    steps,
    headless,
  });

  graph.draw();

  return graph;
}

function mandatory(msg) {
  throw new Error(msg);
}

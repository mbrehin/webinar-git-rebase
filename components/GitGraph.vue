<script setup>
import { onMounted, ref } from "vue";
import { initializeD3GitGraph } from "../git-graphs/d3-git";

const { graph, height, viewBox, width } = defineProps([
  "graph",
  "height",
  "viewBox",
  "width",
]);
const svg = ref(null);

function nextStep() {
  svg.value?.nextStep();
}

function resetGraph() {
  svg.value?.reset();
}

onMounted(async () => {
  console.log(`Loading git-${graph} graph…`);
  const data = await import(`../git-graphs/graphs/git-${graph}.json`);

  const container = document.getElementById(graph).parentElement;

  if (container.getBoundingClientRect().width === 0) {
    const observer = new MutationObserver(() => {
      if (container.style.display === "") {
        init();
        observer.disconnect();
      }
    });

    observer.observe(container, {
      attributes: true,
      attributeFilter: ["style"],
    });
    return;
  }

  init();

  function init() {
    svg.value = initializeD3GitGraph({
      data: data.default,
      containerId: graph,
      height: height ? Number(height) : undefined,
      width: width ? Number(width) : undefined,
      viewBox: viewBox || undefined,
    });
  }
});
</script>

<template>
  <div :id="graph" @click="nextStep" @dblclick="resetGraph"></div>
</template>

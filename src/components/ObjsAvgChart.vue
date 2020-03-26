<template>
  <div class="has-background-white">
    <canvas height="150" id="objs-avg-chart" width="300"></canvas>
  </div>
</template>

<script lang="ts">
import { Chart } from "chart.js";
import { Component, Prop, Vue } from "vue-property-decorator";
import { OptProblemResults } from "@/mop_bindings";

@Component
export default class ObjsAvgChart extends Vue {
  @Prop()
  results?: OptProblemResults;

  mounted() {
    if (typeof this.results === "undefined") {
      return;
    }

    new Chart(document.getElementById("objs-avg-chart"), {
      type: "bar",
      data: this.objsAvgChartData(this.results),
      options: {
        layout: { padding: { left: 15, right: 15, top: 15, bottom: 15 } },
        scales: { yAxes: [{ ticks: { beginAtZero: true } }] }
      }
    });
  }

  objsAvgChartData(results: OptProblemResults): GenericChart {
    const chart: GenericChart = {
      datasets: [{ borderWidth: 1, data: [], label: "Objectives avg" }],
      labels: []
    };
    for (let idx = 0; idx < results.len(); idx++) {
      chart.datasets[0].data.push(results.get(idx).objs_avg());
      chart.labels.push(idx + 1);
    }
    return chart;
  }
}
</script>

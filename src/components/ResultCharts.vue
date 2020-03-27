<template>
  <div class="has-background-white">
    <canvas height="150" id="solution-chart" width="300"></canvas>
    <hr />
    <canvas height="150" id="objs-chart" width="300"></canvas>
    <hr />
    <canvas height="150" id="hard-cstrs-chart" width="300"></canvas>
  </div>
</template>

<script lang="ts">
import { Chart } from "chart.js";
import { Component, Prop, Vue } from "vue-property-decorator";
import { OptProblemResult } from "@/mop_bindings";

@Component
export default class ResultCharts extends Vue {
  @Prop()
  result?: OptProblemResult;

  mounted() {
    if (typeof this.result === "undefined") {
      return;
    }

    new Chart(document.getElementById("solution-chart"), {
      type: "bar",
      data: this.solutionChartData(this.result),
      options: {
        layout: { padding: { left: 15, right: 15, top: 15, bottom: 15 } },
        scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
      },
    });
    new Chart(document.getElementById("objs-chart"), {
      type: "bar",
      data: this.objsChartData(this.result),
      options: {
        layout: { padding: { left: 15, right: 15, top: 15, bottom: 15 } },
        scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
      },
    });
    new Chart(document.getElementById("hard-cstrs-chart"), {
      type: "bar",
      data: this.hardCstrsChartData(this.result),
      options: {
        layout: { padding: { left: 15, right: 15, top: 15, bottom: 15 } },
        scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
      },
    });
  }

  hardCstrsChartData(result: OptProblemResult): GenericChart {
    const chart: GenericChart = {
      datasets: [{ borderWidth: 1, data: [], label: "Hard constraints" }],
      labels: [],
    };
    result.hard_cstrs().forEach((hcr: number, idx: number) => {
      chart.datasets[0].data.push(hcr);
      chart.labels.push(idx + 1);
    });
    return chart;
  }

  objsChartData(result: OptProblemResult): GenericChart {
    const chart: GenericChart = {
      datasets: [{ borderWidth: 1, data: [], label: "Objectives" }],
      labels: [],
    };
    result.objs().forEach((obj: number, idx: number) => {
      chart.datasets[0].data.push(obj);
      chart.labels.push(idx + 1);
    });
    return chart;
  }

  solutionChartData(result: OptProblemResult): GenericChart {
    const chart: GenericChart = {
      datasets: [{ borderWidth: 1, data: [], label: "Solution" }],
      labels: [],
    };
    result
      .solution()
      .array()
      .forEach((solution: number, idx: number) => {
        chart.datasets[0].data.push(solution);
        chart.labels.push(idx + 1);
      });
    return chart;
  }
}
</script>

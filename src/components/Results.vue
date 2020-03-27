<template>
  <div id="results">
    <h3 class="has-text-centered is-3 mb-5 title">Results</h3>

    <div v-if="results == null">
      <p>No results yet.</p>
      <p>
        Create your own or click in "Problem" to select one of the examples.
      </p>
    </div>

    <div v-else>
      <p class="has-text-centered">
        <a @click="showResultModal(results.best())" href="#">Best result</a>
        <span class="mx-3">-</span>
        <a @click="showLog(results)" href="#">Log</a>
        <span class="mx-3">-</span>
        <a @click="showObjsAvgModal(results)" href="#">Objectives AVG</a>
      </p>

      <hr />

      <ul>
        <div class="columns is-gapless is-mobile is-multiline">
          <div
            :key="idx"
            v-for="idx in results.len()"
            class="column is-4-mobile is-3-tablet"
          >
            <li>
              <a @click="showResultModal(results.get(idx - 1))" href="#"
                >Result #{{ idx }}</a
              >
            </li>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { OptProblemResult, OptProblemResults } from "@/mop_bindings";
import ObjsAvgChart from "@/components/ObjsAvgChart.vue";
import ResultCharts from "@/components/ResultCharts.vue";

enum ResultsModalType {
  Log,
  ObjsAvg,
  Result,
}

@Component
export default class Result extends Vue {
  @Prop()
  results: OptProblemResults | null = null;

  ResultsModalType = ResultsModalType;
  isResultsModalActivated = false;

  resultToString(result: OptProblemResult) {
    let str = "";
    const solution = result.solution().array();
    const objs = result.objs();
    const hcr = result.hard_cstrs();

    str += `Solution | x0: ${solution[0]}`;
    solution.slice(1).forEach((x: number, idx: number) => {
      str += `, x${idx + 1}: ${x}`;
    });
    str += "\n";

    str += `Objectives | AVG: ${result.objs_avg()}, f0: ${objs[0]}`;
    objs.slice(1).forEach((x: number, idx: number) => {
      str += `, f${idx + 1}: ${x}`;
    });
    str += "\n";

    if (hcr.length > 0) {
      str += `Hard constraints | g0: ${hcr[0]}`;
      hcr.slice(1).forEach((x: number, idx: number) => {
        str += `, g${idx + 1}: ${x}`;
      });
      str += "\n";
    }

    return str;
  }

  showLog(results: OptProblemResults) {
    let log = "";
    const best = results.best();
    if (best !== undefined) {
      log += "***** Best result *****\n";
      log += this.resultToString(best);
      log += "\n";
    }
    for (let idx = 0; idx < results.len(); idx++) {
      log += `***** Result ${idx + 1} *****\n`;
      log += this.resultToString(results.get(idx));
    }
    this.$buefy.modal.open("<pre>" + log + "</pre>");
  }

  showObjsAvgModal(results: OptProblemResults) {
    this.$buefy.modal.open({
      component: ObjsAvgChart,
      parent: this,
      props: { results },
    });
  }

  showResultModal(result: OptProblemResult) {
    this.$buefy.modal.open({
      component: ResultCharts,
      parent: this,
      props: { result },
    });
  }
}
</script>

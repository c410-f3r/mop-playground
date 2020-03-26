<template>
  <div id="app">
    <main>
      <div class="container">
        <div class="columns">
          <div class="column">
            <Problem @hasResults="hasResults" />
          </div>
          <div class="column">
            <Results :results="results" />
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <div class="columns">
          <div class="column is-4">
            This prayground is a
            <a href="https://webassembly.org/" target="_blank">WASM</a> compiled
            version of
            <a href="https://github.com/c410-f3r/mop" target="_blank">MOP</a>, a
            framework written in
            <a href="https://www.rust-lang.org" target="_blank">Rust</a> to
            solve NP-Problems.
          </div>
          <div class="column is-offset-4">
            Made by
            <a href="https://github.com/c410-f3r" target="_blank">Caio</a>.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { OptProblemResults } from "./mop_bindings";
import Problem from "./components/Problem.vue";
import Results from "./components/Results.vue";

@Component({
  components: {
    Problem,
    Results
  }
})
export default class App extends Vue {
  results: OptProblemResults | null = null;
  hasResults(results: OptProblemResults) {
    this.results = results;
  }
}
</script>

<style lang="scss">
.is-family-secondary {
  font-family: Georgia, "Times New Roman", Times, serif;
}

main {
  padding: 0.25rem 0.25rem 3rem 0.25rem;
}

.mb-4 {
  margin-bottom: 2rem !important;
}

.mb-5 {
  margin-bottom: 3rem !important;
}

.mx-3 {
  margin-left: 1rem;
  margin-right: 1rem;
}

.pt-0 {
  padding-top: 0;
}
</style>

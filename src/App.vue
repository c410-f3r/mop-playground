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
            The solver,
            <a href="https://gitlab.com/c410-f3r/mop" target="_blank">MOP</a>,
            was written in
            <a href="https://www.rust-lang.org" target="_blank">Rust</a> and
            compiled to
            <a href="https://webassembly.org/" target="_blank">WASM</a>.<br />
            Beware of potential issues as the solver and this website are both
            experimental.
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
import { OptProblemResultsJs } from "./mop_bindings";
import Problem from "./components/Problem.vue";
import Results from "./components/Results.vue";

@Component({
  components: {
    Problem,
    Results
  }
})
export default class App extends Vue {
  results: OptProblemResultsJs | null = null;
  hasResults(results: OptProblemResultsJs) {
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

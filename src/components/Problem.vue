<template>
  <div id="problem">
    <div class="columns is-mobile is-vcentered mb-5">
      <div class="column">
        <h3 class="is-3 title">
          <b-tooltip label="Examples" position="is-bottom" type="is-info">
            <a @click="showExamplesModal" href="#">Problem</a>
          </b-tooltip>
        </h3>
      </div>
      <div class="column has-text-right">
        <input
          @click="clearProblem"
          class="button"
          type="button"
          value="Clear"
        />&nbsp;
        <input
          class="button is-primary"
          form="problem_form"
          type="submit"
          value="Solve"
        />
      </div>
    </div>

    <b-modal
      :active.sync="isExamplesModalActivated"
      :height="500"
      :width="500"
      scroll="keep"
    >
      <b-table
        @select="fillInputsWithProblem"
        :data="editableProblems"
        detailed
        detail-key="name"
        focusable
        narrowed
      >
        <template slot-scope="props">
          <b-table-column
            field="name"
            label="Problem (click to select)"
            sortable
            >{{ props.row.name }}</b-table-column
          >

          <b-table-column
            field="domain.length"
            label="# of vars"
            sortable
            numeric
            >{{ props.row.domain.length }}</b-table-column
          >

          <b-table-column
            field="objs.length"
            label="# of objs"
            sortable
            numeric
            >{{ props.row.objs.length }}</b-table-column
          >

          <b-table-column
            field="hardCstrs.length"
            label="# of hard cstrs"
            sortable
            numeric
            >{{
              typeof props.row.hardCstrs === "undefined"
                ? 0
                : props.row.hardCstrs.length
            }}</b-table-column
          >
        </template>

        <template slot="detail" slot-scope="props">{{
          props.row.source
        }}</template>
      </b-table>
    </b-modal>

    <form action="#results" @submit="solve" id="problem_form">
      <b-tooltip
        class="mb-4"
        label="Common parameters to define and guide the optimization"
        multilined
        position="is-right"
        type="is-info"
      >
        <h5 class="is-family-secondary is-5 mop-tooltip title">Parameters</h5>
      </b-tooltip>

      <div class="columns is-mobile is-multiline">
        <div class="column is-12-mobile is-6-tablet is-4-widescreen">
          <b-field
            :addons="false"
            :type="hasValidDomainInput ? 'is-light' : 'is-danger'"
          >
            <label class="label">
              <b-tooltip
                label="Inclusive range domain of each variable in ascending order"
                multilined
                position="is-right"
                type="is-info"
              >
                <span class="mop-tooltip">Domain</span>
              </b-tooltip>
            </label>
            <b-taginput
              @add="hasValidDomainInput = true"
              :before-adding="beforeAddingDomain"
              allow-duplicates
              ellipsis
              maxtags="16"
              placeholder="Add domain"
              v-model="domain"
            ></b-taginput>
          </b-field>
        </div>
        <div class="column is-12-mobile is-6-tablet is-4-widescreen">
          <b-field :addons="false">
            <label class="label">
              <b-tooltip
                label="The maximum number of times the solver will process the solution"
                multilined
                type="is-info"
              >
                <span class="mop-tooltip">Maximum iterations</span>
              </b-tooltip>
            </label>
            <b-input
              min="1"
              type="number"
              required
              v-model.number="maxIterations"
            ></b-input>
          </b-field>
        </div>
        <div class="column is-12-mobile is-6-tablet is-4-widescreen">
          <b-field :addons="false">
            <label class="label">
              <b-tooltip
                label="The number of results in a multi-objective context"
                multilined
                type="is-info"
              >
                <span class="mop-tooltip">Number of results</span>
              </b-tooltip>
            </label>
            <b-input
              min="2"
              type="number"
              required
              v-model.number="resultsNum"
            ></b-input>
          </b-field>
        </div>
        <div class="column is-12-mobile is-6-tablet is-4-widescreen">
          <b-field :addons="false">
            <label class="label">
              <b-tooltip
                label="The percentage variation (for more or less) that tells that the current solution is not converging"
                multilined
                type="is-info"
              >
                <span class="mop-tooltip">Stagnation percentage</span>
              </b-tooltip>
            </label>
            <b-input
              min="0"
              type="number"
              required
              v-model.number="stagnationPercentage"
            ></b-input>
          </b-field>
        </div>
        <div class="column is-12-mobile is-6-tablet is-4-widescreen">
          <b-field :addons="false">
            <label class="label">
              <b-tooltip
                label="Will stop processing if the solution is not converging for N consecutive times"
                multilined
                type="is-info"
              >
                <span class="mop-tooltip">Stagnation threshold</span>
              </b-tooltip>
            </label>
            <b-input
              min="1"
              type="number"
              required
              v-model.number="stagnationThreshold"
            ></b-input>
          </b-field>
        </div>
      </div>

      <hr />

      <div class="columns is-mobile is-vcentered">
        <div class="column is-7">
          <b-tooltip
            label="Each objective is a function that returns a value and receives a single parameter, the `solution` array"
            multilined
            position="is-right"
            type="is-info"
          >
            <h5 class="is-family-secondary is-5 mop-tooltip title">
              Objectives
            </h5>
          </b-tooltip>
        </div>
        <div class="column has-text-right">
          <b-tooltip
            :active="!hasValidObjsInput"
            always
            position="is-left"
            label="Provide at least one objective"
            type="is-danger"
          >
            <button @click="addObj()" class="button" type="button">+</button>
          </b-tooltip>
        </div>
      </div>

      <div
        :key="idx"
        class="columns is-mobile is-multiline is-vcentered"
        v-for="(obj, idx) in objs"
      >
        <div class="column is-5">
          <h6 class="is-6 title">Objective #{{ idx + 1 }}</h6>
        </div>
        <div class="column has-text-centered is-4">
          <b-select
            placeholder="Direction"
            required
            v-model="objs[idx].direction"
          >
            <option :value="ObjDirection.Max" numeric>Maximize</option>
            <option :value="ObjDirection.Min" numeric>Minimize</option>
          </b-select>
        </div>
        <div class="column has-text-right is-3">
          <button @click="removeObj(idx)" class="button" type="button">
            x
          </button>
        </div>
        <div class="column is-12 pt-0">
          <textarea class="textarea" required v-model="objs[idx].fn"></textarea>
        </div>
      </div>

      <hr />

      <div class="columns is-mobile is-vcentered">
        <div class="column is-9">
          <b-tooltip
            label="Each hard constraint is a function that returns the number of violations and receives a single parameter, the `solution` array"
            multilined
            position="is-right"
            type="is-info"
          >
            <h5 class="is-family-secondary is-5 mop-tooltip title">
              Hard constraints
            </h5>
          </b-tooltip>
        </div>
        <div class="column has-text-right">
          <button @click="addHardCstr()" class="button" type="button">+</button>
        </div>
      </div>

      <div
        :key="hardCstr.id"
        class="columns is-mobile is-multiline is-vcentered"
        v-for="(hardCstr, idx) in hardCstrs"
      >
        <div class="column is-6">
          <h6 class="title is-6">Hard constraint #{{ idx + 1 }}</h6>
        </div>
        <div class="column has-text-right is-6">
          <button @click="removeHardCstr(idx)" class="button" type="button">
            x
          </button>
        </div>
        <div class="column is-12 pt-0">
          <textarea
            class="textarea"
            required
            v-model="hardCstrs[idx]"
          ></textarea>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import {
  ObjDirection,
  OptProblemDefinitionsBuilder,
  OptFacadeBuilder,
  OptProblem,
  OptProblemResults,
  HardCstr,
  Obj,
  Pct,
  SolutionDomain
} from "@/mop_bindings";
import { Component, Vue } from "vue-property-decorator";
import BinhandKorn from "@/problems/BinhandKorn";
import Constr from "@/problems/Constr";
import Rastrigin from "@/problems/Rastrigin";
import SchafferFunction2 from "@/problems/SchafferFunction2";
import { dom } from "@fortawesome/fontawesome-svg-core";

const problems = [BinhandKorn, Constr, Rastrigin, SchafferFunction2];

interface ProblemDefinitions {
  domain: string[];
  hardCstrs: string[];
  maxIterations?: number;
  name: string;
  objs: { direction: ObjDirection; fn: string }[];
  resultsNum?: number;
  source: string;
  stagnationPercentage?: number;
  stagnationThreshold?: number;
}

@Component
export default class Problem extends Vue {
  domain: string[] = [];
  editableProblems: ProblemDefinitions[] = [];
  hardCstrs: string[] = [];
  hasValidDomainInput = true;
  hasValidObjsInput = true;
  isExamplesModalActivated = false;
  maxIterations = 500;
  ObjDirection = ObjDirection;
  objs: ProblemDefinitions["objs"] = [];
  results?: OptProblemResults;
  resultsNum = 100;
  stagnationPercentage = 1;
  stagnationThreshold = 50;

  addHardCstr() {
    this.hardCstrs.push("");
  }

  addObj() {
    this.hasValidObjsInput = true;
    this.objs.push({ direction: ObjDirection.Min, fn: "" });
  }

  beforeAddingDomain(domain: string) {
    const parts = domain.split("=");
    if (parts.length !== 2) {
      return false;
    }
    return this.isNumber(parts[0]) && this.isNumber(parts[1]);
  }

  clearProblem() {
    this.domain = [];
    this.objs = [];
    this.hardCstrs = [];
    this.$emit("hasResults", null);
  }

  doSolve() {
    let opdbj = new OptProblemDefinitionsBuilder()
      .domain(new SolutionDomain(this.domain))
      .name("Problem");

    this.hardCstrs.forEach(x => {
      const hc = new HardCstr(this.evalToFunction(x));
      opdbj = opdbj.push_hard_cstr(hc);
    });

    this.objs.forEach(x => {
      const obj = new Obj(x.direction, this.evalToFunction(x.fn));
      opdbj = opdbj.push_obj(obj);
    });

    const problem = OptProblem.with_capacity(opdbj.build(), this.resultsNum);

    const facade = new OptFacadeBuilder()
      .max_iterations(this.maxIterations)
      .stagnation_percentage(Pct.from_percent(this.stagnationPercentage))
      .stagnation_threshold(this.stagnationThreshold)
      .build(problem);

    facade.solve(problem);

    this.results = problem.results();
  }

  evalToFunction(fn: string) {
    return (() => new Function("solution", `"use strict"; ${fn}`))();
  }

  fillInputsWithProblem(problem: ProblemDefinitions) {
    this.domain = problem.domain;
    this.hardCstrs = problem.hardCstrs || [];
    this.isExamplesModalActivated = false;
    this.maxIterations = problem.maxIterations || this.maxIterations;
    this.objs = problem.objs;
    this.resultsNum = problem.resultsNum || this.resultsNum;
    this.stagnationPercentage =
      problem.stagnationPercentage || this.stagnationPercentage;
    this.stagnationThreshold =
      problem.stagnationThreshold || this.stagnationThreshold;
    this.validateInputs();
    this.$emit("hasResults", null);
  }

  hasValidInputs(): boolean {
    return this.hasValidDomainInput && this.hasValidDomainInput;
  }

  isNumber(str: string) {
    return str.length !== 0 && isNaN(parseFloat(str)) === false;
  }

  mounted() {
    dom.watch();
  }

  removeHardCstr(idx: number) {
    this.hardCstrs.splice(idx, 1);
  }

  removeObj(idx: number) {
    this.objs.splice(idx, 1);
  }

  showExamplesModal() {
    this.editableProblems = JSON.parse(JSON.stringify(problems));
    this.isExamplesModalActivated = true;
  }

  solve(e: Event) {
    e.preventDefault();
    this.validateInputs();
    if (this.hasValidInputs()) {
      window.location.hash = "results";
      this.$emit("hasResults", null);
      this.doSolve();
      this.$emit("hasResults", this.results);
    }
  }

  validateInputs() {
    this.hasValidDomainInput = this.domain.length > 0;
    this.hasValidObjsInput = this.objs.length > 0;
  }
}
</script>

<style scoped lang="scss">
.b-table {
  cursor: pointer;
}

.mop-tooltip {
  cursor: help;
  text-decoration: underline #ccc dashed;
}
</style>

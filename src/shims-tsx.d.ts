import Vue, { VNode } from "vue";

declare global {
  interface GenericChart {
    datasets: {
      label: string;
      data: number[];
      borderWidth: number;
    }[];
    labels: number[];
  }
  interface Window {
    mop: typeof import("./mop_bindings");
  }

  namespace JSX {
    // eslint:disable no-empty-interface
    interface Element extends VNode {}
    // eslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

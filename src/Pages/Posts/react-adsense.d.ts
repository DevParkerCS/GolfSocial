declare module "react-adsense" {
  import { Component } from "react";

  interface AdSenseProps {
    client: string;
    slot: string;
    style?: React.CSSProperties;
    format?: string;
    responsive?: string | boolean;
  }

  class Google extends Component<AdSenseProps> {}
  export { Google };
}

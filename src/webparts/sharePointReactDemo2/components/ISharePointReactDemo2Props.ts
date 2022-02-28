import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISharePointReactDemo2Props {
  // description: string;
  documentTitle: string;
  currentUserDisplayName: string;
  storageList: string;
  acknowledgementLabel: string;
  acknowledgementMessage: string;
  readMessage: string;
  themeVariant: IReadonlyTheme | undefined;
  configured: boolean;
  context: WebPartContext;
}

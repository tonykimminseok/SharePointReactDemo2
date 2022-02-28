import * as React from "react";
import styles from "./SharePointReactDemo2.module.scss";
import { ISharePointReactDemo2Props } from "./ISharePointReactDemo2Props";
import { escape } from "@microsoft/sp-lodash-subset";

import { getSP } from "./../pnpjs-presets";
import { SPFI } from "@pnp/sp";

import { FunctionComponent, useEffect, useState } from "react";
import {
  Checkbox,
  Text,
  IStackTokens,
  ITheme,
  Stack,
} from "office-ui-fabric-react";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

// private _sp: SPFI;

// constructor(props: ISharePointReactDemo2Props) {
//   super(props);

//   //set initial state
//   this.state = {
//     items: [],
//     errors: [],
//   };
//   this._sp = getSP();
// }

const SharePointReactDemo2: FunctionComponent<ISharePointReactDemo2Props> = (
  props
) => {
  const _sp = getSP();

  const [showMessage, setShowMessage] = useState<boolean>(true);

  const { semanticColors }: IReadonlyTheme = props.themeVariant;

  const fetchData = async () => {
    const items: any[] = await _sp.web.lists
      .getById(props.storageList)
      .items.select("Author/ID", "Author/Title", "Author/Name", "Title")
      .expand("Author")
      .top(1)
      .filter(
        `Author/Title eq '${props.currentUserDisplayName}' and Title eq '${props.documentTitle}'`
      )();

    if (items.length === 0) {
      setShowMessage(true);
    }
  };

  useEffect(() => {
    if (props.storageList && props.storageList != "") {
      fetchData();
    }
  }, [props]);

  const _onConfigure = () => {
    props.context.propertyPane.open();
  };

  function _onChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean) {
    // window.alert(props.documentTitle);
    _sp.web.lists.getById(props.storageList).items.add({
      Title: props.documentTitle,
    });

    setShowMessage(false);
  }

  const mainStackTokens: IStackTokens = {
    childrenGap: 5,
    padding: 10,
  };

  return props.configured ? (
    <Stack style={{ backgroundColor: semanticColors.bodyBackground }}>
      {showMessage ? (
        <Stack
          style={{ color: semanticColors.bodyText }}
          tokens={mainStackTokens}
        >
          <Text>{props.acknowledgementMessage}</Text>
          <Text variant="large">{props.documentTitle}</Text>
          <Checkbox
            // checked
            theme={props.themeVariant as ITheme}
            label={props.acknowledgementLabel}
            onChange={_onChange}
          />
        </Stack>
      ) : (
        <Stack style={{ color: semanticColors.bodyText }}>
          <Text variant="large">{props.documentTitle}</Text>
          <Text>{props.readMessage}</Text>
        </Stack>
      )}
    </Stack>
  ) : (
    <Placeholder
      iconName="Edit"
      iconText="Configure Read Receipt"
      description="Please configure the web part by choosing a list."
      buttonLabel="Configure"
      onConfigure={_onConfigure}
    />
  );
};

export default SharePointReactDemo2;

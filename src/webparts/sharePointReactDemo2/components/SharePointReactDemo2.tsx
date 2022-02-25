import * as React from 'react';
import styles from './SharePointReactDemo2.module.scss';
import { ISharePointReactDemo2Props } from './ISharePointReactDemo2Props';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SharePointReactDemo2 extends React.Component<ISharePointReactDemo2Props, {}> {
  public render(): React.ReactElement<ISharePointReactDemo2Props> {
    return (
      <div className={ styles.sharePointReactDemo2 }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import { AxiosInstance } from 'axios';
import { UseStore } from './pinia';
import { GlobalState } from './globalState';
import { APIService } from './api';

declare module '@uvue/core' {
  export interface ContextCustomProperties {
    $axios: AxiosInstance;
    $api: APIService;
    $useStore: UseStore;
    $globalState: GlobalState;
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: APIService;
    $useStore: UseStore;
    $globalState: GlobalState;
  }
}

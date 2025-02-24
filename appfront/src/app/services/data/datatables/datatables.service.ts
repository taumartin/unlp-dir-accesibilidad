import {Injectable} from '@angular/core';
import {ApiPageRequest} from '../../network/api/api-page-request';
import {Config, ConfigColumns, InternalSettings} from 'datatables.net';
import datatables_lang_ES from '../../../config/datatables/lang_ES.json';
import {ApiResponsePage} from '../../network/api/api-response-page';
import {DatatablesServersideResponse} from './datatables-serverside-response';
import {DatatablesServersideRequest} from './datatables-serverside-request';
import {map, Observable} from 'rxjs';
import {ToastService} from '../../ui/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class DatatablesService {
  constructor(
    private readonly toastService: ToastService,
  ) {
  }

  private getOptions(columns: ConfigColumns[], ajax: (params: any, callback: (data: any) => void) => void,
                     rowCallback?: (data: any, index: number) => void): Config {
    const config: Config = {
      serverSide: true,
      ajax,
      language: datatables_lang_ES,
      headerCallback: (tr: HTMLTableRowElement) => {
        tr.classList.add('table-primary');
      },
      columns,
      initComplete: (settings: InternalSettings): void => {
        settings['nTable'].parentElement.classList.add('table-responsive');
      },
    };
    if (rowCallback) {
      config.rowCallback = (row: Node, data: any, index: number): Node => {
        $('td', row).off('click');
        $('td', row).on('click', (): void => {
          rowCallback(data, index);
        });
        return row;
      };
    }
    return config;
  }

  private getPageFromDatatablesParams(params: DatatablesServersideRequest): ApiPageRequest {
    return {
      page: Math.floor(params.start / params.length) + 1,
      pageSize: params.length,
      search: params.search.value,
      orderBy: (params.order.length > 0) ? params.order[0].name : '',
      orderDirection: (params.order.length > 0) ? params.order[0].dir : '',
    };
  }

  private getPageFromApiResponse<T>(params: DatatablesServersideRequest,
                                    page: ApiResponsePage<T>): DatatablesServersideResponse<T> {
    return {
      draw: params.draw,
      recordsTotal: page.totalRecords,
      recordsFiltered: page.filteredRecords,
      data: page.data
    };
  }

  public getOptionsServerSide<T>(columns: ConfigColumns[],
                                 getSource: (pagReq: ApiPageRequest) => Observable<ApiResponsePage<T>>,
                                 rowCallback?: (data: any, index: number) => void): Config {
    return this.getOptions(columns, (params: DatatablesServersideRequest, callback: (data: any) => void): void => {
      getSource(this.getPageFromDatatablesParams(params))
        .pipe(
          map((apiResponse: ApiResponsePage<T>): DatatablesServersideResponse<T> => this.getPageFromApiResponse(params, apiResponse))
        )
        .subscribe({
          next: (data: DatatablesServersideResponse<T>): void => {
            callback(data);
          },
          error: err => {
            this.toastService.showErrorToast({body: err.message});
            callback({
              draw: params.draw,
              recordsTotal: 0,
              recordsFiltered: 0,
              data: [],
            });
          }
        });
    }, rowCallback);
  }
}

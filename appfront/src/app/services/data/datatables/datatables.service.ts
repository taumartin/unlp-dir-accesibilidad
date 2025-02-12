import {Injectable} from '@angular/core';
import {ApiPageRequest} from '../../network/api/api-page-request';
import {Config, ConfigColumns} from 'datatables.net';
import datatables_lang_ES from '../../../config/datatables/lang_ES.json';
import {ApiResponsePage} from '../../network/api/api-response-page';
import {DatatablesServersideResponse} from './datatables-serverside-response';
import {DatatablesServersideRequest} from './datatables-serverside-request';

@Injectable({
  providedIn: 'root'
})
export class DatatablesService {
  constructor() {
  }

  public getOptions(columns: ConfigColumns[],
                    ajax: (params: any, callback: (data: any) => void) => void): Config {
    return {
      serverSide: true,
      ajax,
      language: datatables_lang_ES,
      headerCallback: tr => {
        tr.classList.add('table-primary');
      },
      columns,
    };
  }

  public getPageFromDatatablesParams(params: DatatablesServersideRequest): ApiPageRequest {
    return {
      page: Math.floor(params.start / params.length) + 1,
      pageSize: params.length,
      search: params.search.value,
      orderBy: (params.order.length > 0) ? params.order[0].name : '',
      orderDirection: (params.order.length > 0) ? params.order[0].dir : '',
    };
  }

  public getPageFromApiResponse<T>(params: DatatablesServersideRequest,
                                   page: ApiResponsePage<T>): DatatablesServersideResponse<T> {
    return {
      draw: params.draw,
      recordsTotal: page.totalRecords,
      recordsFiltered: page.filteredRecords,
      data: page.data
    };
  }
}

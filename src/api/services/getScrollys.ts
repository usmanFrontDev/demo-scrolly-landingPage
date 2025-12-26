import type { ScrollyParams, ScrollyResponse } from "../../types/types";
import { apiRequest } from "../API-core";
import { SUB_URL } from "../APIEndpoints";


export const getScrollys = (params?: ScrollyParams) =>
  apiRequest<ScrollyResponse>({
    url: SUB_URL.SCROLLYS,
    method: 'GET',
    params,
  });

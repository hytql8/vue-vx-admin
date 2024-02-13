type getUseTableListParams = {
  page: number
  pageSize: number
}

type getUseTableListReturns = {
  result: {
    items: any[]
    total: number
  }
}

export type { getUseTableListParams, getUseTableListReturns }

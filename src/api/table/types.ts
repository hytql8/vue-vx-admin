type getUseTableListParams = {
  page: number
  pageSize: number
}

type getUseTableListReturns = {
  result: {
    items: any[]
    total: number
  }
  [key: string]: any
}

export type { getUseTableListParams, getUseTableListReturns }

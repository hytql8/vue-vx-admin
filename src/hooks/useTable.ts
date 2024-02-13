import { ref, onMounted, unref, nextTick, watch } from "vue"
import { Table } from "@/components/Table"
import type { TableParameterTypes, TableColumnParameterTypes, TableSetProps, TableExpose } from "@/components/Table/src/types"
import { ElTable, ElMessageBox, ElMessage } from "element-plus"
import { t } from "@/hooks/useLocale"

/**
 * @param immediate 是否初始化的时候请求一次
 * @param getDataApi 请求数据的Api
 * @param delDataApi 删除数据的Api
 */
interface UseTableConfig {
  immediate?: boolean
  getDataApi: () => Promise<{
    list: any[]
    total?: number
  }>
  delDataApi?: () => Promise<boolean>
}

export const useTable = (config: UseTableConfig) => {
  const { immediate = true } = config

  const loading = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const dataList = ref<any[]>([])

  onMounted(() => {
    if (immediate) {
      methods.getList()
    }
  })

  const tableRef = ref<InstanceType<typeof Table> & TableExpose>()
  const elTableRef = ref<InstanceType<typeof ElTable>>()

  //   注册方法实例
  const register = (ref: InstanceType<typeof Table> & TableExpose, elRef: InstanceType<typeof ElTable>) => {
    tableRef.value = ref
    elTableRef.value = unref(elRef)
  }
  //   获取tableRef
  const getTable = async () => {
    await nextTick()
    const table = unref(tableRef)
    // if (!table) {
    //   console.warn("table注册失败")
    // }
    return table
  }
  //监听变化的pageSize和currentPage
  watch(
    () => unref(pageSize),
    (val: number) => {
      pageSize.value = val
      methods.getList()
    }
  )

  watch(
    () => unref(currentPage),
    (val: number) => {
      currentPage.value = val
      methods.getList()
    }
  )

  const methods = {
    // 请求table数据
    getList: async () => {
      loading.value = true
      try {
        const res = await config?.getDataApi()
        console.log("获取数据成功！", res)
        if (res) {
          dataList.value = res.list
          total.value = res.total || 0
        }
      } catch (err) {
        console.log("获取数据失败！")
      } finally {
        loading.value = false
      }
    },
    /**
     * @description 设置table组件的props
     * @param props table组件的props
     */
    setProps: async (props: TableParameterTypes = {}) => {
      const table = await getTable()
      table?.setProps(props)
    },

    /**
     * @description 设置column
     * @param columnProps 需要设置的列
     */
    setColumn: async (columnProps: TableSetProps[]) => {
      const table = await getTable()
      table?.setColumn(columnProps)
    },

    /**
     * @description 新增column
     * @param tableColumn 需要新增数据
     * @param index 在哪里新增
     */
    addColumn: async (tableColumn: TableColumnParameterTypes, index?: number) => {
      const table = await getTable()
      table?.addColumn(tableColumn, index)
    },

    /**
     * @description 删除column
     * @param field 删除哪个数据
     */
    delColumn: async (field: string) => {
      const table = await getTable()
      table?.delColumn(field)
    },

    /**
     * @description 获取ElTable组件的实例
     * @returns ElTable instance
     */
    getElTableExpose: async () => {
      await getTable()
      return unref(elTableRef)
    },

    refresh: () => {
      methods.getList()
    },

    // 删除数据
    delList: async (idsLength: number) => {
      const { delDataApi } = config
      if (!delDataApi) {
        console.warn("delDataApi is undefined")
        return
      }
      ElMessageBox.confirm(t("layout.test"), t("layout.test"), {
        confirmButtonText: t("layout.test"),
        cancelButtonText: t("layout.test"),
        type: "warning"
      }).then(async () => {
        const res = await delDataApi()
        if (res) {
          ElMessage.success(t("layout.test"))

          // 计算出临界点
          const current =
            unref(total) % unref(pageSize) === idsLength || unref(pageSize) === 1
              ? unref(currentPage) > 1
                ? unref(currentPage) - 1
                : unref(currentPage)
              : unref(currentPage)

          currentPage.value = current
          methods.getList()
        }
      })
    }
  }

  return {
    tableRegister: register,
    tableMethods: methods,
    tableState: {
      currentPage,
      pageSize,
      total,
      dataList,
      loading
    }
  }
}

<script setup lang="tsx">
import { Form, FormSchema } from "@/components/Form"
import { VxContainer } from "@/components/VxContainer"
import { useI18n } from "vue-i18n"
import { useForm } from "@/hooks/useForm"
import { reactive, unref, ref } from "vue"
import { ElInput, FormItemProp, ComponentSize, ElMessage, ElMessageBox, ElButton, ElTabs, ElTabPane } from "element-plus"
import { useValidator } from "@/hooks/useValidator"

const { required } = useValidator()

const { t } = useI18n()

const treeSelectData = [
  {
    value: "1",
    label: "Level one 1",
    children: [
      {
        value: "1-1",
        label: "Level two 1-1",
        children: [
          {
            value: "1-1-1",
            label: "Level three 1-1-1"
          }
        ]
      }
    ]
  },
  {
    value: "2",
    label: "Level one 2",
    children: [
      {
        value: "2-1",
        label: "Level two 2-1",
        children: [
          {
            value: "2-1-1",
            label: "Level three 2-1-1"
          }
        ]
      },
      {
        value: "2-2",
        label: "Level two 2-2",
        children: [
          {
            value: "2-2-1",
            label: "Level three 2-2-1"
          }
        ]
      }
    ]
  },
  {
    value: "3",
    label: "Level one 3",
    children: [
      {
        value: "3-1",
        label: "Level two 3-1",
        children: [
          {
            value: "3-1-1",
            label: "Level three 3-1-1"
          }
        ]
      },
      {
        value: "3-2",
        label: "Level two 3-2",
        children: [
          {
            value: "3-2-1",
            label: "Level three 3-2-1"
          }
        ]
      }
    ]
  }
]

// 模拟远程加载
const getTreeSelectData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(treeSelectData)
    }, 3000)
  })
}

const schema = reactive<FormSchema[]>([
  {
    field: "field1",
    label: t("formDemo.input"),
    component: "Input",
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: "field2",
    label: t("formDemo.select"),
    component: "Select",
    componentProps: {
      options: [
        {
          label: "option1",
          value: "1"
        },
        {
          label: "option2",
          value: "2"
        }
      ]
    },
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: "field3",
    label: t("formDemo.radio"),
    component: "RadioGroup",
    hidden: true,
    value: "1",
    componentProps: {
      options: [
        {
          label: "option-1",
          value: "1"
        },
        {
          label: "option-2",
          value: "2"
        }
      ]
    }
  },
  {
    field: "field4",
    label: t("formDemo.checkbox"),
    component: "CheckboxGroup",
    value: ["1"],
    remove: true,
    componentProps: {
      options: [
        {
          label: "option-1",
          value: "1"
        },
        {
          label: "option-2",
          value: "2"
        },
        {
          label: "option-3",
          value: "3"
        }
      ]
    }
  },
  {
    field: "field5",
    component: "DatePicker",
    label: t("formDemo.datePicker"),
    componentProps: {
      type: "date"
    }
  },
  {
    field: "field6",
    component: "TimeSelect",
    label: t("formDemo.timeSelect")
  },
  {
    field: "field7",
    label: `${t("formDemo.treeSelect")}`,
    component: "TreeSelect",
    // 远程加载option
    optionApi: async () => {
      const res = await getTreeSelectData()
      return res
    }
  },
  {
    field: "field8",
    component: "Upload",
    label: `${t("formDemo.default")}`,
    componentProps: {
      limit: 3,
      action: "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",
      // fileList: ,
      multiple: true,
      onPreview: uploadFile => {
        console.log(uploadFile)
      },
      onRemove: file => {
        console.log(file)
      },
      beforeRemove: uploadFile => {
        return ElMessageBox.confirm(`Cancel the transfer of ${uploadFile.name} ?`).then(
          () => true,
          () => false
        )
      },
      onExceed: (files, uploadFiles) => {
        ElMessage.warning(
          `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length} totally`
        )
      },
      slots: {
        default: () => <ElButton type="primary">Click to upload</ElButton>,
        tip: () => <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
      }
    }
  }
])

const { formRegister, formMethods } = useForm()
const {
  setProps,
  delSchema,
  addSchema,
  setValues,
  setSchema,
  getComponentExpose,
  getFormItemExpose,
  getElFormExpose,
  getFormData
} = formMethods

const changeLabelWidth = (width: number | string) => {
  setProps({
    labelWidth: width
  })
}

const changeSize = (size: ComponentSize) => {
  setProps({
    size
  })
}

const changeDisabled = (bool: boolean) => {
  setProps({
    disabled: bool
  })
}

const changeSchema = (del: boolean) => {
  if (del) {
    delSchema("field2")
  } else if (!del && schema[1].field !== "field2") {
    addSchema(
      {
        field: "field2",
        label: t("formDemo.select"),
        component: "Select",
        componentProps: {
          options: [
            {
              label: "option1",
              value: "1"
            },
            {
              label: "option2",
              value: "2"
            }
          ]
        }
      },
      1
    )
  }
}

const setValue = async (reset: boolean) => {
  const elFormExpose = await getElFormExpose()
  if (reset) {
    elFormExpose?.resetFields()
  } else {
    setValues({
      field1: "field1",
      field2: "2",
      field3: "2",
      field4: ["1", "3"],
      field5: "2022-01-27",
      field6: "17:00",
      field8: [
        {
          name: "element-plus-logo.svg",
          url: "https://element-plus.org/images/element-plus-logo.svg"
        },
        {
          name: "element-plus-logo2.svg",
          url: "https://element-plus.org/images/element-plus-logo.svg"
        }
      ]
    })
    const formData = await getFormData()
    console.log(formData)
  }
}

const index = ref(7)

const setLabel = () => {
  setSchema([
    {
      field: "field2",
      path: "label",
      value: `${t("formDemo.select")} ${index.value}`
    },
    {
      field: "field2",
      path: "componentProps.options",
      value: [
        {
          label: "option-1",
          value: "1"
        },
        {
          label: "option-2",
          value: "2"
        },
        {
          label: "option-3",
          value: "3"
        }
      ]
    }
  ])
  index.value++
}

const addItem = () => {
  if (unref(index) % 2 === 0) {
    addSchema({
      field: `field${unref(index)}`,
      label: `${t("formDemo.input")}${unref(index)}`,
      component: "Input"
    })
  } else {
    addSchema(
      {
        field: `field${unref(index)}`,
        label: `${t("formDemo.input")}${unref(index)}`,
        component: "Input"
      },
      unref(index)
    )
  }
  index.value++
}

const formValidation = async () => {
  const elFormExpose = await getElFormExpose()
  elFormExpose?.validate(isValid => {
    console.log(isValid)
  })
}

const verifyReset = async () => {
  const elFormExpose = await getElFormExpose()
  elFormExpose?.resetFields()
}

const inoutFocus = async () => {
  const inputEl: InstanceType<typeof ElInput> = await getComponentExpose("field1")
  inputEl?.focus()
}

const inoutValidation = async () => {
  const formItem = await getFormItemExpose("field1")
  const inputEl: InstanceType<typeof ElInput> = await getComponentExpose("field1")
  inputEl?.focus()
  formItem?.validate("focus", (val: boolean) => {
    console.log(val)
  })
}

const formValidate = (prop: FormItemProp, isValid: boolean, message: string) => {
  console.log(prop, isValid, message)
}

setTimeout(async () => {
  const formData = await getFormData()
  console.log(formData)
}, 2000)

const activeTab = ref("0")
</script>

<template>
  <div>
    <VxContainer>
      <ElTabs v-model="activeTab">
        <ElTabPane class="tab-pane" label="labelWidth" name="0">
          <ElButton type="primary" @click="changeLabelWidth(150)">{{ t("formDemo.change") }}labelWidth</ElButton>
          <ElButton type="primary" @click="changeLabelWidth('auto')">{{ t("formDemo.restore") }} labelWidth</ElButton>
        </ElTabPane>
        <ElTabPane class="tab-pane" label="size" name="1">
          <ElButton type="primary" @click="changeSize('large')">{{ t("formDemo.change") }} size</ElButton>
          <ElButton type="primary" @click="changeSize('default')">{{ t("formDemo.restore") }} size</ElButton>
        </ElTabPane>
        <ElTabPane class="tab-pane" :label="t('formDemo.disabled')" name="2">
          <ElButton type="primary" @click="changeDisabled(true)">{{ t("formDemo.disabled") }}</ElButton>
          <ElButton type="primary" @click="changeDisabled(false)">{{ t("formDemo.disablement") }}</ElButton>
        </ElTabPane>
        <ElTabPane class="tab-pane" :label="t('formDemo.select')" name="3">
          <ElButton type="primary" @click="changeSchema(true)"> {{ t("formDemo.delete") }} {{ t("formDemo.select") }} </ElButton>
          <ElButton type="primary" @click="changeSchema(false)"> {{ t("formDemo.add") }} {{ t("formDemo.select") }} </ElButton>
          <ElButton type="primary" @click="setLabel"> {{ t("formDemo.set") }} {{ t("formDemo.select") }} label </ElButton>
        </ElTabPane>
        <ElTabPane class="tab-pane" :label="t('formDemo.setValue')" name="4">
          <ElButton type="primary" @click="setValue(false)">{{ t("formDemo.setValue") }}</ElButton>
          <ElButton type="primary" @click="setValue(true)">{{ t("formDemo.resetValue") }}</ElButton>
        </ElTabPane>
        <ElTabPane class="tab-pane" :label="t('formDemo.formValidation')" name="5">
          <ElButton type="primary" @click="formValidation"> {{ t("formDemo.formValidation") }} </ElButton>
          <ElButton type="primary" @click="verifyReset"> {{ t("formDemo.verifyReset") }} </ElButton>
        </ElTabPane>
        <ElTabPane class="tab-pane" :label="t('formDemo.subitem')" name="6">
          <ElButton type="primary" @click="addItem"> {{ t("formDemo.add") }} {{ t("formDemo.subitem") }} </ElButton>
        </ElTabPane>

        <ElTabPane class="tab-pane" :label="t('formDemo.focus')" name="7">
          <ElButton type="primary" @click="inoutFocus">
            {{ `${t("formDemo.input")} ${t("formDemo.focus")}` }}
          </ElButton>
        </ElTabPane>
        <ElTabPane class="tab-pane" :label="t('formDemo.formValidation')" name="8">
          <ElButton type="primary" @click="inoutValidation">
            {{ `${t("formDemo.input")} ${t("formDemo.formValidation")}` }}
          </ElButton>
        </ElTabPane>
      </ElTabs>
    </VxContainer>
    <VxContainer style="margin-top: 20px">
      <Form :schema="schema" @register="formRegister" @validate="formValidate" />
    </VxContainer>
  </div>
</template>

<style lang="scss" scoped>
.el-button {
  margin-top: 10px;
}
</style>

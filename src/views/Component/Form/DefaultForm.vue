<script setup lang="ts">
import { Form } from "@/components/Form"
import { useForm } from "@/hooks/useForm"
import type { FormSchema } from "@/components/Form"
import { VxContainer } from "@/components/VxContainer"
import { reactive } from "vue"

const schema = reactive<FormSchema[]>([
  {
    field: "field1",
    label: "input组件",
    component: "Input"
  },
  {
    field: "field2",
    label: "select组件",
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
    formItemProps: {}
  },
  {
    field: "field3",
    label: "radio组件",
    component: "RadioGroup",
    hidden: false,
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
    label: "checkbox组件",
    component: "CheckboxGroup",
    value: ["1"],
    remove: false,
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
    label: "datePicker组件",
    componentProps: {
      type: "date"
    }
  },
  {
    field: "field6",
    component: "TimeSelect",
    label: "timeSelect组件"
  }
])

const { formRegister, formMethods } = useForm()
const { getElFormExpose } = formMethods

const getElForm = async () => {
  const formRef = await getElFormExpose()
  console.log(formRef)
}

getElForm()
</script>
<template>
  <VxContainer>
    <Form :schema="schema" @register="formRegister" />
  </VxContainer>
</template>

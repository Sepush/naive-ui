import type { ValidateError } from 'async-validator'
import type { ThemeProps } from '../../_mixins'
import type { FormTheme } from '../styles'
import type {
  FormInst,
  FormItemInst,
  FormItemInternalValidateResult,
  FormRules,
  FormValidateCallback,
  FormValidateMessages,
  LabelAlign,
  LabelPlacement,
  ShouldRuleBeApplied,
  Size
} from './interface'
import {
  defineComponent,
  type ExtractPropTypes,
  h,
  type PropType,
  provide,
  ref
} from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import { type ExtractPublicPropTypes, keysOf } from '../../_utils'
import { formLight } from '../styles'
import { formInjectionKey, formItemInstsInjectionKey } from './context'
import style from './styles/form.cssr'

export const formProps = {
  ...(useTheme.props as ThemeProps<FormTheme>),
  inline: Boolean,
  labelWidth: [Number, String] as PropType<number | string>,
  labelAlign: String as PropType<LabelAlign>,
  labelPlacement: {
    type: String as PropType<LabelPlacement>,
    default: 'top'
  },
  model: {
    type: Object as PropType<Record<string, any>>,
    default: () => {}
  },
  rules: Object as PropType<FormRules>,
  disabled: Boolean,
  size: String as PropType<Size>,
  showRequireMark: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  requireMarkPlacement: String as PropType<'left' | 'right' | 'right-hanging'>,
  showFeedback: {
    type: Boolean,
    default: true
  },
  onSubmit: {
    type: Function as PropType<(e: Event) => void>,
    default: (e: Event) => {
      e.preventDefault()
    }
  },
  showLabel: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  validateMessages: Object as PropType<Partial<FormValidateMessages>>
} as const

export type FormSetupProps = ExtractPropTypes<typeof formProps>
export type FormProps = ExtractPublicPropTypes<typeof formProps>

export default defineComponent({
  name: 'Form',
  props: formProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props)
    useTheme('Form', '-form', style, formLight, props, mergedClsPrefixRef)
    // from path to form-item
    const formItems: Record<string, FormItemInst[]> = {}
    // for label-width = 'auto'
    const maxChildLabelWidthRef = ref<number | undefined>(undefined)
    const deriveMaxChildLabelWidth = (currentWidth: number): void => {
      const currentMaxChildLabelWidth = maxChildLabelWidthRef.value
      if (
        currentMaxChildLabelWidth === undefined
        || currentWidth >= currentMaxChildLabelWidth
      ) {
        maxChildLabelWidthRef.value = currentWidth
      }
    }
    async function validate(
      validateCallback?: FormValidateCallback,
      shouldRuleBeApplied: ShouldRuleBeApplied = () => true
    ): Promise<{ warnings: ValidateError[][] | undefined }> {
      return await new Promise<{ warnings: ValidateError[][] | undefined }>(
        (resolve, reject) => {
          const formItemValidationPromises: Array<
            Promise<FormItemInternalValidateResult>
          > = []
          for (const key of keysOf(formItems)) {
            const formItemInstances = formItems[key]
            for (const formItemInstance of formItemInstances) {
              if (formItemInstance.path) {
                formItemValidationPromises.push(
                  formItemInstance.internalValidate(null, shouldRuleBeApplied)
                )
              }
            }
          }
          void Promise.all(formItemValidationPromises).then((results) => {
            const formInvalid = results.some(result => !result.valid)
            const errors: ValidateError[][] = []
            const warnings: ValidateError[][] = []
            results.forEach((result) => {
              if (result.errors?.length) {
                errors.push(result.errors)
              }
              if (result.warnings?.length) {
                warnings.push(result.warnings)
              }
            })
            if (validateCallback) {
              validateCallback(errors.length ? errors : undefined, {
                warnings: warnings.length ? warnings : undefined
              })
            }
            if (formInvalid) {
              reject(errors.length ? errors : undefined)
            }
            else {
              resolve({
                warnings: warnings.length ? warnings : undefined
              })
            }
          })
        }
      )
    }
    function restoreValidation(): void {
      for (const key of keysOf(formItems)) {
        const formItemInstances = formItems[key]
        for (const formItemInstance of formItemInstances) {
          formItemInstance.restoreValidation()
        }
      }
    }
    provide(formInjectionKey, {
      props,
      maxChildLabelWidthRef,
      deriveMaxChildLabelWidth
    })
    provide(formItemInstsInjectionKey, { formItems })
    const formExposedMethod: FormInst = {
      validate,
      restoreValidation
    }
    return Object.assign(formExposedMethod, {
      mergedClsPrefix: mergedClsPrefixRef
    })
  },
  render() {
    const { mergedClsPrefix } = this
    return (
      <form
        class={[
          `${mergedClsPrefix}-form`,
          this.inline && `${mergedClsPrefix}-form--inline`
        ]}
        onSubmit={this.onSubmit}
      >
        {this.$slots}
      </form>
    )
  }
})

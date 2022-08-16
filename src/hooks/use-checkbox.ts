import { ChangeEvent } from 'react'

const useCheckboxHandler = () => {
  return (actions: {
      onChecked?: (e?: ChangeEvent<HTMLInputElement>) => void
      onUnchecked?: (e?: ChangeEvent<HTMLInputElement>) => void
    }) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const { onChecked, onUnchecked } = actions
      if (e.target.checked) if (onChecked) onChecked(e)
      if (!e.target.checked) if (onUnchecked) onUnchecked(e)
    }
}

export default useCheckboxHandler

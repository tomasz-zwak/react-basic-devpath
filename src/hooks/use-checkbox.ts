import { ChangeEvent } from 'react'

const useCheckboxHandler = () => {
  return (actions: { onChecked?: () => void; onUnchecked?: () => void }) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const { onChecked, onUnchecked } = actions
      if (e.target.checked) if (onChecked) onChecked()
      if (!e.target.checked) if (onUnchecked) onUnchecked()
    }
}

export default useCheckboxHandler

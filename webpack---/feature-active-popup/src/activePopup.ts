import { withDependencies, optional } from '@wix/thunderbolt-ioc'
import { IPropsStore, Props } from '@wix/thunderbolt-symbols'
import { PopupsSymbol, IPopups } from 'feature-popups'
import { updateCurrentPopup } from './activePopupUtils'
import { ComponentWillMount, ViewerComponent } from 'feature-components'
import { ACTIVE_POPUP_OBSERVERS_TYPES } from './relevantComponentTypes'

const addPopupListeners = (activePopupObservers: Array<string>, propsStore: IPropsStore, popupsAPI?: IPopups) => {
	if (popupsAPI) {
		popupsAPI.registerToPopupEvent('popupOpen', (popupPageId: string) => {
			propsStore.update(updateCurrentPopup(activePopupObservers, popupPageId))
		})
		popupsAPI.registerToPopupEvent('popupClose', () => {
			propsStore.update(updateCurrentPopup(activePopupObservers))
		})
	}
}

const activePopupComponentFactory = (
	propsStore: IPropsStore,
	popupsAPI?: IPopups
): ComponentWillMount<ViewerComponent> => {
	const activePopupObservers: Array<string> = []
	addPopupListeners(activePopupObservers, propsStore, popupsAPI)

	return {
		componentTypes: ACTIVE_POPUP_OBSERVERS_TYPES,
		componentWillMount(comp) {
			activePopupObservers.push(comp.id)

			// cleanup function
			return () => {
				const index = activePopupObservers.indexOf(comp.id)

				if (index > -1) {
					activePopupObservers.splice(index, 1)
				}
			}
		},
	}
}

export const ActivePopupHandler = withDependencies([Props, optional(PopupsSymbol)], activePopupComponentFactory)

export function swapOrderForDragAndDrop<T extends { id?: number; order?: number }>(
	contentData: T[],
	content: T,
	currentContent: T | undefined,
): IReturnAfterSwap<T> {
	console.log(currentContent)
	if (currentContent) {
		if (content.order === currentContent.order) {
			return { status: false, changedContent: [], changedItems: [] }
		}

		const changedItems: IChangedItems[] = []
		const changedContent: T[] = contentData.map((oldContent) => {
			if (oldContent?.id === content?.id) {
				currentContent.id &&
					currentContent.order &&
					changedItems.push({ id: currentContent.id, order: currentContent.order })
				return { ...oldContent, order: currentContent.order }
			}
			if (oldContent.id === currentContent.id) {
				content.id && content.order && changedItems.push({ id: content.id, order: content.order })
				return { ...oldContent, order: content.order }
			}

			return oldContent
		})
		console.log('step5', changedContent)
		return { changedContent: changedContent, changedItems: changedItems, status: true }
	} else {
		return { status: false, changedContent: [], changedItems: [] }
	}
}

interface IReturnAfterSwap<T> {
	status: boolean
	changedContent: T[]
	changedItems: IChangedItems[]
}

interface IChangedItems {
	id: number
	order: number
}

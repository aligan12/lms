import { BaseSyntheticEvent, Dispatch, SetStateAction, useState } from 'react'

import classes from './useDragAndDropOrdering.module.scss'

export function useDragAndDropOrdering<T>({
	start,
	end,
	leave,
	over,
	drop,
	currentId,

	setIsVisible,
}: IUseDragAndDropOrdering<T>) {
	function startHandler(e: BaseSyntheticEvent, content: T): void {
		setIsVisible && setIsVisible(true)
		start && start(e, content)
	}
	function endHandler(e: BaseSyntheticEvent): void {
		setIsVisible && setIsVisible(false)
		end && end(e)
	}
	function leaveHandler(e: BaseSyntheticEvent): void {
		if (e.target.id === currentId) {
			e.target.classList.remove(classes.primary)
			leave && leave(e)
		}
	}
	function overHandler(e: BaseSyntheticEvent): void {
		e.preventDefault()
		if (e.target.id === currentId) {
			e.target.classList.add(classes.primary)
			over && over(e)
		}
	}

	function dropHandler(e: BaseSyntheticEvent, content: T): void {
		e.preventDefault()
		setIsVisible && setIsVisible(false)
		if (e.target.id === currentId) {
			e.target.classList.remove(classes.primary)
			console.log('step1')
			drop && drop(e, content)
		}
	}

	return { startHandler, endHandler, leaveHandler, overHandler, dropHandler }
}

interface IUseDragAndDropOrdering<T> {
	start?: (e: BaseSyntheticEvent, content: T) => void
	end?: (e: BaseSyntheticEvent) => void
	leave?: (e: BaseSyntheticEvent) => void
	over?: (e: BaseSyntheticEvent) => void
	drop?: (e: BaseSyntheticEvent, content: T) => void
	currentId: string | undefined

	setIsVisible?: Dispatch<SetStateAction<boolean>>
}

export const getRightLinkForYouTube = (link: string) => {
	if (link) {
		const id = link.split('/').pop()
		const rightLink = 'https://www.youtube.com/embed/' + id
		return rightLink
	}
	return null
}

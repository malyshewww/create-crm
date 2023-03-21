document.addEventListener('click', tabsAction);
function tabsAction(event) {
	const target = event.target;
	if (target.closest('[data-tab]')) {
		const tabId = target.dataset.tab ? target.dataset.tab : null;
		const tabContent = document.querySelector(`[data-tab-content="${tabId}"]`)
		if (tabContent) {
			const tabActive = document.querySelector('.tabs-claim__item--active');
			const tabContentActive = document.querySelector('.tabs-claim__data--open');
			if (tabActive && tabActive != target) {
				tabActive.classList.remove('tabs-claim__item--active')
				tabContentActive.classList.remove('tabs-claim__data--open')
			}
			target.classList.add('tabs-claim__item--active')
			tabContent.classList.add('tabs-claim__data--open')
		}
	}
}
document.querySelector('[data-tab]').click();

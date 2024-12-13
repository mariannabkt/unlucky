function switchTab(tab, tabId) {

  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.classList.remove('selected');
  });

  const selectedTab = document.getElementById(tab);
  selectedTab.classList.add('selected');

  // Hide all tab panes
  const panes = document.querySelectorAll('.tab-pane');
  panes.forEach(pane => {
    pane.style.display = 'none';
  });

  // Show the selected tab pane
  const selectedPane = document.getElementById(tabId);
  selectedPane.style.display = 'flex';
}
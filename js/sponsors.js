function switchTab(tabId) {
    // Hide all tab panes
    const panes = document.querySelectorAll('.tab-pane');
    panes.forEach(pane => (pane.style.display = 'none'));
  
    // Show the selected tab pane
    const selectedPane = document.getElementById(tabId);
    selectedPane.style.display = 'flex';
  }
  